const BookingApi = require('./BookingApi');
const Booking = require('../../Entity/Booking');
const DateTime = require('../../Entity/DateTime');

describe('getBookingByDateTimeRange method', () => {
    test('should return an array of size 1', () => {
        const httpClientMock = {
            fetch: jest.fn()
        };

        httpClientMock.fetch.mockResolvedValue([
            {
                id: 'a8019ec0-bffgdc-4140-9dbb-492-7-e579ef5ced8d',
                start_date_time: {
                    date: '12/12/19',
                    time: '12:30'
                },
                end_date_time: {
                    date: '13/12/19',
                    time: '12:30'
                },
                jetpackId: 'a8019ec0-bfdc-4140-9dbb-4927e5ef5c8d'
            }
        ]);

        const start_date = new DateTime('12/12/19','12:30');
        const end_date = new DateTime('13/12/19','12:30');
        const boookingApi = new BookingApi(httpClientMock);
        return boookingApi.getBookingByDateTimeRange(start_date,end_date)
            .then(resp => {
                expect(Array.isArray(resp)).toBe(true);
                expect(resp.length).toBe(1);
            });
    });

    test('should return non null or undefined objets', () => {
        const httpClientMock = {
            fetch: jest.fn()
        };

        httpClientMock.fetch.mockResolvedValue([
            {
                id: 'a8019ec0-bffgdc-4140-9dbb-492-7-e579ef5ced8d',
                start_date_time: {
                    date: '12/12/19',
                    time: '12:30'
                },
                end_date_time: {
                    date: '13/12/19',
                    time: '12:30'
                },
                jetpackId: 'a8019ec0-bfdc-4140-9dbb-4927e5ef5c8d'
            }
        ]);
        const start_date = new DateTime('12/12/19','12:30');
        const end_date = new DateTime('13/12/19','12:30');
        const jetpackApi = new BookingApi(httpClientMock);
        return jetpackApi.getBookingByDateTimeRange(start_date,end_date)
            .then(resp => {
                expect(resp[0]).not.toBe(null);
                expect(resp[0]).not.toBe(undefined);
                expect(resp[0]).toBeInstanceOf(Booking);
            });
    });
});
