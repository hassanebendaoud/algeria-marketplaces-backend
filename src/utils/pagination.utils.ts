const getPagingData = (count: number, page: number, limit: number) => {
    const totalItems = count;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);
    return { totalItems, totalPages, currentPage };
};

const getPagination = (page: number, size: number) => {
    const limit = size ? +size : 0;
    const skip = page ? page * limit : 0;
    return { limit, skip };
};

export default { getPagingData, getPagination };
