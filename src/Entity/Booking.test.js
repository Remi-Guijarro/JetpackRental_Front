const Booking = require('./Booking');
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
        booking.start_date_time = new Date('12/12/2019 19:30').toISOString();
        booking.end_date_time = new Date('12/13/2019 19:30').toISOString();
        booking.jetpackId = '123';
        expect(booking.id).toBe('0123456789');
        expect(booking.start_date_time).toBe('2019-12-12T18:30:00.000Z');
        expect(booking.end_date_time).toBe('2019-12-13T18:30:00.000Z');
        expect(booking.jetpackId).toBe('123');
    });
});
