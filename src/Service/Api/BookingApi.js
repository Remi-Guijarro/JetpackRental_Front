const Booking = require('../../Entity/Booking');

module.exports = class {
    constructor(httpClient) {
        this.httpClient = httpClient;
    }

    getBookingByDateTimeRange(start_date,end_date) {
        return this.httpClient.fetch('/booking?start='+JSON.stringify(start_date)+'&end='+JSON.stringify(end_date), {method:'GET'}).then(rows => {
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
