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
 
    updateJetPack(jetpack) {
        return this.httpClient.fetch('/jetpacks/'+jetpack.id,
            {
                method:'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body : JSON.stringify(jetpack)
            }).then(jetpack => jetpack);
    }
  
    saveJetpack(jetpack) {
        return this.httpClient.fetch('/jetpacks',
            {
                method:'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(jetpack)
            }).then(jetpack => jetpack);
    }

    getBookingByDateTimeRange(start_date,end_date) {
        return this.httpClient.fetch('/jetpacks?start='+JSON.stringify(start_date)+'&end='+JSON.stringify(end_date), {
            method:'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(rows => {
            return rows.map(row => {
                const jetpack = new JetpackEntity();
                jetpack.id = row.id;
                jetpack.name = row.name;
                jetpack.image = row.image;
                return jetpack;
            });
        });
    }
};
