const { User } = require('../database/model');

const { queryBuilder } = require('../helper');

module.exports = {
    createUser: (userObject) => User.create(userObject),

    findAllUsers: async (query) => {
        const {
            filters, keys, limit, page, sort, skip
        } = queryBuilder(query);

        const filterObject = {};

        keys.forEach(key => {
            switch (key) {
                case 'ageGte':
                    filterObject.age = { ...filterObject.age, $gte: +filters.ageGte };
                    break;
                case 'ageLte':
                    filterObject.age = { ...filterObject.age, $lte: +filters.ageLte };
                    break;
                case 'email':
                    filterObject.email = { $regex: filters.email, $options: 'i' };
                    break;
                case 'name':
                    filterObject.name = { $regex: filters.name, $options: 'i' };
                    break;
                default:
                    filterObject[key] = filters[key];
            }
        });

        const users = await User.find(filterObject).limit(+limit).skip(skip).sort(sort);

        const count = await User.countDocuments(filterObject);

        return {
            data: users,
            count,
            limit,
            page,
            pages: Math.ceil(count / limit)
        };
    },

    findOneUser: (userObject) => User.findOne(userObject),

    findUserById: (userId) => User.findById(userId),

    updateUserById: (userId, userObject) => User.updateOne({ _id: userId }, userObject, { upsert: true }),

    deleteUserById: (userId) => User.findByIdAndDelete(userId),
};
