const DateTime = require('./DateTime');
describe('DateTime entity constructor', function () {
    test('constructor should set the internal values date and time', () => {
        const dateTime = new DateTime('2019/11/15','18:15');
        expect(dateTime.date).not.toEqual(undefined);
        expect(dateTime.date).not.toEqual(null);
        expect(dateTime.time).not.toEqual(undefined);
        expect(dateTime.time).not.toEqual(null);
        expect(dateTime.date).toEqual('2019/11/15');
        expect(dateTime.time).toEqual('18:15');
    });
});

describe('DateTime entity setters', function () {
    test('setters should set the internal values date and time', () => {
        const dateTime = new DateTime();
        dateTime.date = '2019/11/15';
        dateTime.time = '18:15';
        expect(dateTime.date).not.toEqual(undefined);
        expect(dateTime.date).not.toEqual(null);
        expect(dateTime.time).not.toEqual(undefined);
        expect(dateTime.time).not.toEqual(null);
        expect(dateTime.date).toEqual('2019/11/15');
        expect(dateTime.time).toEqual('18:15');
    });
});
