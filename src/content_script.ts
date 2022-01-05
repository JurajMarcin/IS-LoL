import { Faculty, getDefaultFacultyImageUrl, getFacultyImageUrl } from './faculty';

const main = async () => {
    const root = document.querySelector(':root') as HTMLElement;
    if (!root) {
        throw new Error('No root element found');
    }
    await Promise.all(Object.values(Faculty).map(async (faculty) => {
        const imageUrl = (await getFacultyImageUrl(faculty))
            || (await getDefaultFacultyImageUrl(faculty));
        root.style.setProperty(`--image-${faculty}`, `url(${imageUrl})`);
    }));
};

main()
    .then();
