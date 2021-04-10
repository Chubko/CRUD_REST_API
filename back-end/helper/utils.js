module.exports = {
    nameNormalizer: (name = '') => {
        if (!name) {
            return '';
        }

        name = name.normalize('NFD').replace(/[\u0300-\u036f]/g, ''); // Crème Brulée -> Creme Brulee
        name = name.replace(/[.,{}<>&$@%+&'"^*:-]/g, ' '); // John. Doe -> John Doe
        name = name.split(' ').filter(char => !!char); // John       Doe -> [John, Doe]
        name = name.map(str => str.toLowerCase()); // [john,DOE] -> [john, doe]
        name = name.map(str => str.charAt(0).toUpperCase() + str.slice(1)); // [john,DOE] -> [John, Doe]
        name = name.join(' ').trim(); // [John, Doe] -> John Doe

        return name;
    }
};
