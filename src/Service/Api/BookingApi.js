const JetpackEntity = require('../../Entity/Jetpack');
const BookingEntity = require('../../Entity/Booking');

module.exports = class {
    constructor(httpClient) {
        this.httpClient = httpClient;
    }

    bookJetpack(booking) {
        return this.httpClient.fetch('/bookings',
            {
                method:'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(booking)
            }).then(bookingResp => bookingResp);
    };
};
