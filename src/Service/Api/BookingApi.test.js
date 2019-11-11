const BookingApi = require('./BookingApi');
const BookingEntity = require('../../Entity/Booking');

const testBookingId = '123456789';
const testJetpackId = '123';
const testStartDate = '2019-11-05T09:15:00.000Z';
const testEndDate = '2019-11-10T16:00:00.000Z';

describe('bookJetpack function', () => {
    test('should return the booking with an id', () => {
        const httpClientMock = {
            fetch: jest.fn()
        };

        httpClientMock.fetch.mockResolvedValue(
            {
                id: testBookingId,
                jetpackId: testJetpackId,
                start_date_time: testStartDate,
                end_date_time: testEndDate
            }
        );

        const bookingApi = new BookingApi(httpClientMock);
        const booking = new BookingEntity();

        booking.jetpackId = testJetpackId;
        booking.start_date_time = testStartDate;
        booking.end_date_time = testEndDate;

        return bookingApi.bookJetpack(booking)
            .then(resp => {
                expect(resp.id).toBe(testBookingId);
                expect(resp.jetpackId).toBe(testJetpackId);
                expect(resp.start_date_time).toBe(testStartDate);
                expect(resp.end_date_time).toBe(testEndDate);
            });
    });
});
