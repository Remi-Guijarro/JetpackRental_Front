const DateTimeValidator = require('./DateTimeValidator');
describe('Test validate method',  () => {
    test('Test validation with start_date > end_date => should return false',() => {
        const validator = new DateTimeValidator();
        expect(validator).not.toBe(null);
        expect(validator).not.toBe(undefined);
        const start = new Date('12/10/19 12:30').toISOString();
        const end = new Date('11/10/19 12:30').toISOString();
        expect(validator.validate(start,end)).toBeFalsy();
    });

    test('Test validation with start_date < end_date => should return true',() => {
        const validator = new DateTimeValidator();
        expect(validator).not.toBe(null);
        expect(validator).not.toBe(undefined);
        const start = new Date('11/10/19 12:30').toISOString();
        const end = new Date('12/10/19 12:30').toISOString();
        expect(validator.validate(start,end)).toBeTruthy();
    });
});


