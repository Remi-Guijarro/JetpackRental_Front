const appConfig = require('./app.config');
const JetpackService = require('./src/Service/Api/JetpackApi');
const HttpClient = require('./src/HttpClient');

const httpClient = new HttpClient(appConfig.apiUrl);
const jetpackService = new JetpackService(httpClient);


jetpackService.getJetpacks().then(jetpacks => {
    let html =  '';
    jetpacks.forEach((jetpack) => {
        html +=
            '<div class="card" style="width: 18rem;">\n' +
            '  <img src="'+ jetpack.image +'" class="card-img-top" alt="...">\n' +
            '  <div class="card-body">\n' +
            '    <h5 class="card-title">' + jetpack.name + '</h5>\n' +
            '    <button class="btn btn-primary edit-jet-button" data-jetPack=\"'+JSON.stringify(jetpack)+'\">Edit</button>\n' +
            '  </div>\n' +
            '</div>';

    });

    document.getElementById('jetpacks').innerHTML = html;
    for (let editBtn in document.getElementsByClassName('edit-jet-button')) {
        editBtn.onclick = (() => {
            document.getElementsByTagName('body').appendChild(

            );
        });
    }
});
