const DateTimeValidator = require('./DateTimeValidator');
const DateTime = require('../../Entity/DateTime');

describe('Test validate method',  () => {
    test('Test validation with start_date > end_date => should return false',() => {
        const validator = new DateTimeValidator();
        expect(validator).not.toBe(null);
        expect(validator).not.toBe(undefined);
        const start = new DateTime('12/10/19','12:30');
        const end = new DateTime('11/10/19','12:30');
        expect(validator.validate(start,end)).toBeFalsy();
    });

    test('Test validation with start_date < end_date => should return true',() => {
        const validator = new DateTimeValidator();
        expect(validator).not.toBe(null);
        expect(validator).not.toBe(undefined);
        const start = new DateTime('11/10/19','12:30');
        const end = new DateTime('12/10/19','12:30');
        expect(validator.validate(start,end)).toBeTruthy();
    });
});


