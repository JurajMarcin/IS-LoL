import {
    Faculty, getDefaultFacultyImageUrl, getFacultyImageUrl, setFacultyImageUrl,
} from './faculty';

const showAlert = (type: 'success' | 'danger', message: string) => {
    const alertElement = document.getElementById('alert') as HTMLElement;
    alertElement.innerHTML = message;
    alertElement.classList.remove('alert-success', 'alert-danger');
    alertElement.classList.add(`alert-${type}`);
    alertElement.style.setProperty('display', 'block');
};

const setImageSrc = (faculty: Faculty, url: string) => {
    document.getElementById(`img-${faculty}`)?.setAttribute('src', url);
};

const loadImages = async () => {
    await Promise.all(Object.values(Faculty).map(async (faculty) => {
        const emoteUrl = (await getFacultyImageUrl(faculty))
            || (await getDefaultFacultyImageUrl(faculty));
        setImageSrc(faculty, emoteUrl);
    }));
};

const getInputValue = (
    faculty: Faculty,
) => (document.getElementById(faculty) as HTMLInputElement).value;

const setInputValue = (faculty: Faculty, url: string) => {
    (document.getElementById(faculty) as HTMLInputElement).value = url;
};

const saveOptions = async () => {
    await Promise.all(Object.values(Faculty).map(async (faculty) => {
        await setFacultyImageUrl(faculty, getInputValue(faculty));
    }));
    await loadImages();
};

const loadOptions = async () => {
    await Promise.all(Object.values(Faculty).map(async (faculty) => {
        setInputValue(faculty, (await getFacultyImageUrl(faculty)) || '');
    }));
    await loadImages();
};

window.addEventListener('load', () => {
    loadOptions()
        .then()
        .catch((error) => showAlert('danger', error));

    document.getElementById('save')?.addEventListener('click', () => {
        saveOptions()
            .then(() => showAlert('success', 'Saved'))
            .catch((error) => showAlert('danger', error));
    });
});
