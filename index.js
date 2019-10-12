const appConfig = require('./app.config');
const JetpackService = require('./src/Service/Api/JetpackApi');
const HttpClient = require('./src/HttpClient');

const httpClient = new HttpClient(appConfig.apiUrl);
const jetpackService = new JetpackService(httpClient);
jetpackService.getJetpacks().then(jetpacks => {
    $.each(jetpacks,(index,jetpack) => {
        let jetPackDiv = $('<div class="card" style="width: 18rem; margin: auto;"></div>');
        jetPackDiv.append(' <img src="'+ jetpack.image +'" style="width: 18rem;" class="card-img-top" alt="...">');
        let jetPackDivBody =$(' <div class="card-body"> <h5 class="card-title">' + jetpack.name + '</h5> </div>');
        jetPackDivBodyEditButton = $('<button class="btn btn-primary edit-jet-button">Edit</button>');
        jetPackDivBodyEditButton.data('jetPackName',jetpack.name);
        jetPackDivBodyEditButton.data('jetPackImg',jetpack.image);
        jetPackDivBodyEditButton.click(function() {
            $('#modal-img-url').val($(this).data('jetPackImg'));
            $('#modal-jet-name').val($(this).data('jetPackName'));
            $('#editJetModal').modal('toggle');
        });
        jetPackDivBody.append(jetPackDivBodyEditButton);
        jetPackDiv.append(jetPackDivBody);
        $('#jetpacks').append(jetPackDiv)
    });
});
