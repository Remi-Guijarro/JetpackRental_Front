const appConfig = require('./app.config');
const JetpackService = require('./src/Service/Api/JetpackApi');
const HttpClient = require('./src/HttpClient');

const httpClient = new HttpClient(appConfig.apiUrl);
const jetpackService = new JetpackService(httpClient);
const launchModal = function(){
    $('#modalImgUrl').val($(this).data('jetPackImg'));
    $('#modalJetName').val($(this).data('jetPackName'));
    $('#editJetModal').modal('toggle');
};
jetpackService.getJetpacks().then(jetpacks => {
    $.each(jetpacks,(index,jetpack) => {
        const jetPackDiv = $('<div class="card" style="width: 18rem; margin: auto;"></div>');
        jetPackDiv.append(' <img src="'+ jetpack.image +'" style="width: 18rem;" class="card-img-top" alt="...">');
        const jetPackDivBody =$(' <div class="card-body"> <h5 class="card-title">' + jetpack.name + '</h5> </div>');
        const jetPackDivBodyEditButton = $('<button class="btn btn-primary edit-jet-button">Edit</button>');
        jetPackDivBodyEditButton.data('jetPackName',jetpack.name);
        jetPackDivBodyEditButton.data('jetPackImg',jetpack.image);
        jetPackDivBodyEditButton.click(launchModal);
        jetPackDivBody.append(jetPackDivBodyEditButton);
        jetPackDiv.append(jetPackDivBody);
        $('#jetpacks').append(jetPackDiv);
    });
});
