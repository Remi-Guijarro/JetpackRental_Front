const Booking = require('../../Entity/Booking');

module.exports = class {
    constructor(httpClient) {
        this.httpClient = httpClient;
    }

    getBookingByDateTimeRange(start_date,end_date) {
        return this.httpClient.fetch('/booking?start='+'12_12_19-19_30'+'&end='+'13_12_19-19_30', {
                method:'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(rows => {
            return rows.map(row => {
                const booking = new Booking();
                booking.id = row.id;
                booking.jetpackId = row.jetpackId;
                booking.start_date_time = row.start_date_time;
                booking.end_date_time = row.end_date_time;
                return booking;
            });
        });
    }
};
