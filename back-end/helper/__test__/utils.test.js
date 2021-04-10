const { nameNormalizer } = require('../utils');

const nameNormalizerData = [
    { input: 'John Doe', output: 'John Doe' },
    { input: 'John@Doe', output: 'John Doe' },
    { input: 'john doe', output: 'John Doe' },
    { input: 'JOHN DOE', output: 'John Doe' },
    { input: '   John-Doe   ', output: 'John Doe' },
    { input: 'John      Doe', output: 'John Doe' },
    { input: 'John Doé', output: 'John Doe' },
    { input: 'John  .Doè.', output: 'John Doe' },
    { input: null, output: '' },
    { input: '', output: '' },
    { input: undefined, output: '' },
    { input: 'email@gmail.com', output: 'Email Gmail Com' }, // This function will not work correctly to email
    { input: '+380678768778', output: '380678768778' }, // This function will not work for phones
];

describe('Test utils.js', () => {
    test('Should return normalized name', () => {
        nameNormalizerData.forEach(testObject => {
            const name = nameNormalizer(testObject.input);

            expect(name).toBe(testObject.output);
        });
    });
});
