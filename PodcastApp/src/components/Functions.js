export const sortByTitleAZ = (list) => {
    return [...list].sort((a, b) => a.title.localeCompare(b.title));
};

export const sortByTitleZA = (list) => {
    return [...list].sort((a, b) => b.title.localeCompare(a.title));
};

export const sortByMostRecentUpdate = (list) => {
    return [...list].sort((a, b) => new Date(b.updated) - new Date(a.updated));
};

export const sortByLeastRecentUpdate = (list) => {
    return [...list].sort((a, b) => new Date(a.updated) - new Date(b.updated));
};
