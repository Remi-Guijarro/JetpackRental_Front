const JetpackEntity = require('../../Entity/Jetpack');
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
            }).then(booking => booking);
    };
};
