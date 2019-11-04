const Booking = require('./Booking');
const DateTime = require('./DateTime');
describe('Booking constructor', function () {
    test('should return an empty Booking when null values set', () => {
        const booking = new Booking();
        expect(booking.id).toBeNull();
        expect(booking.start_date_time).toBeNull();
        expect(booking.end_date_time).toBeNull();
        expect(booking.jetpackId).toBeNull();
    });

    test('should set correct properties to jetpack', () => {
        const booking = new Booking();
        expect(booking.id).toBeNull();
        expect(booking.start_date_time).toBeNull();
        expect(booking.end_date_time).toBeNull();
        expect(booking.jetpackId).toBeNull();

        booking.id = '0123456789';
        booking.start_date_time = new DateTime('12/12/2019','19:30');
        booking.end_date_time = new DateTime('13/12/2019','19:30');
        booking.jetpackId = '123';
        expect(booking.id).toBe('0123456789');
        expect(booking.start_date_time).toStrictEqual(new DateTime('12/12/2019','19:30'));
        expect(booking.end_date_time).toStrictEqual(new DateTime('13/12/2019','19:30'));
        expect(booking.jetpackId).toBe('123');
    });
});
