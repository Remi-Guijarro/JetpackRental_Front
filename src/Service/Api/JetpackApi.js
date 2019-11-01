const JetpackEntity = require('../../Entity/Jetpack');
module.exports = class  {
    constructor(httpClient) {
        this.httpClient = httpClient;
    }

    getJetpacks() {
        return this.httpClient.fetch('/jetpacks', {method:'GET'}).then(rows => {
            return rows.map(row => {
                const jetpack = new JetpackEntity();
                jetpack.id = row.id;
                jetpack.name = row.name;
                jetpack.image = row.image;
                return jetpack;
            });
        });
    }

    saveJetpack(jetpack) {
        return this.httpClient.fetch('/jetpacks', {method:'POST'}).then(jetpack => {
            return jetpack;
        });
    }
};
