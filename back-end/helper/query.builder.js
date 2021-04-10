module.exports = (query = {}) => {
    const {
        limit = 10, order = 'asc', page = 1, sortBy = 'createdAt', ...filters
    } = query;

    const keys = Object.keys(filters);
    const orderBy = order === 'asc' ? 1 : -1;
    const skip = (page - 1) * limit;
    const sort = { [sortBy]: orderBy };

    return {
        filters,
        keys,
        limit,
        page,
        skip,
        sort
    };
};
