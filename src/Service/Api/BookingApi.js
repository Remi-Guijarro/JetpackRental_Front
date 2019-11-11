const JetpackEntity = require('../../Entity/Jetpack');
const BookingEntity = require('../../Entity/Booking');

module.exports = class {
    constructor(httpClient) {
        this.httpClient = httpClient;
    }

    bookJetpack(booking) {
        console.log(booking.toString());
        return this.httpClient.fetch('/bookings',
            {
                method:'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: booking.toString()
            }).then(bookingResp => bookingResp);
    };
};
