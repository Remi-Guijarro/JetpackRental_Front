const appConfig = require('./app.config');
const JetpackService = require('./src/Service/Api/JetpackApi');
const HttpClient = require('./src/HttpClient');
const JetpackEntity = require('./src/Entity/Jetpack');

const httpClient = new HttpClient(appConfig.apiUrl);
const jetpackService = new JetpackService(httpClient);

const generateJetpackCardHtml = jetpack => {
    return  '<div class="card" style="width: 18rem;">\n' +
            '  <img src="'+ jetpack.image +'" class="card-img-top" alt="...">\n' +
            '  <div class="card-body">\n' +
            '    <h5 class="card-title">' + jetpack.name + '</h5>\n' +
            '    <a href="#" class="btn btn-primary">Edit</a>\n' +
            '  </div>\n' +
            '</div>';
};

const displayAllJetpacks = () => {
    jetpackService.getJetpacks().then(jetpacks => {
        let html =  '';
        jetpacks.forEach(jetpack => {
            html += generateJetpackCardHtml(jetpack);
        });

        document.getElementById('jetpacks').innerHTML = html;
    });
};

document.getElementById('add-button').onclick = () => {
    document.getElementById('create-form').style.visibility = 'Visible';
};

document.getElementById('save-button').onclick = () => {
    const jetpack = new JetpackEntity();
    jetpack.name = document.getElementById('name').value;
    jetpack.image = document.getElementById('image').value;

    jetpackService.saveJetpack(jetpack);

    const html = generateJetpackCardHtml(jetpack);

    document.getElementById('jetpacks').innerHTML += html;
};

document.getElementById('book-button').onclick = () => {

};


displayAllJetpacks();
