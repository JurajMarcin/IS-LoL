import Browser from 'webextension-polyfill';

export enum Faculty {
    MUNI = 'muni',
    ESF = 'esf',
    FAF = 'faf',
    FF = 'ff',
    FI = 'fi',
    FSPS = 'fsps',
    FS = 'fss',
    LF = 'lf',
    PDF = 'pdf',
    PRF = 'prf',
    PZF = 'pzf',
}

export const getDefaultFacultyImageUrl = async (faculty: Faculty) => Browser.runtime.getURL(`assets/${faculty}.png`);

export const setFacultyImageUrl = async (faculty: Faculty, url: string) => {
    await Browser.storage.local.set({ [faculty]: url });
};

export const getFacultyImageUrl = async (
    faculty: Faculty,
) => (await Browser.storage.local.get(faculty.toString()))[faculty] as string;
