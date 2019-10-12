const appConfig = require('./app.config');
const JetpackService = require('./src/Service/Api/JetpackApi');
const HttpClient = require('./src/HttpClient');
const JetpackEntity = require('./src/Entity/Jetpack');

const httpClient = new HttpClient(appConfig.apiUrl);
const jetpackService = new JetpackService(httpClient);
const launchModal = function(){
    $('#modalImgUrl').val($(this).data('jetPackImg'));
    $('#modalJetName').val($(this).data('jetPackName'));
    $('#modalSaveBtn').data('jetPackId',$(this).data('jetPackId'));
    $('#editJetModal').modal('toggle');
};

const generateJetPackCard = jetpack => {
    const jetPackDiv = $('<div class="card"  id="' + 'jetpack_' + jetpack.id +'" style="width: 18rem; margin: auto;"></div>');
    jetPackDiv.append(' <img src="'+ jetpack.image +'" style="width: 18rem;" class="card-img-top" alt="...">');
    const jetPackDivBody =$(' <div class="card-body"> <h5 class="card-title">' + jetpack.name + '</h5> </div>');
    const jetPackDivBodyEditButton = $('<button class="btn btn-primary edit-jet-button">Edit</button>');
    jetPackDivBodyEditButton.data('jetPackName',jetpack.name);
    jetPackDivBodyEditButton.data('jetPackImg',jetpack.image);
    jetPackDivBodyEditButton.data('jetPackId',jetpack.id);
    jetPackDivBodyEditButton.click(launchModal);
    jetPackDivBody.append(jetPackDivBodyEditButton);
    jetPackDiv.append(jetPackDivBody);
    $('#jetpacks').append(jetPackDiv);
};
jetpackService.getJetpacks().then(jetpacks => {
    $.each(jetpacks,(index,jetpack) => {
        generateJetPackCard(jetpack);
    });
});

const updateJetPackCard = (id,jetpack) => {
    $('#jetpack_' + id + ' div.card-body h5.card-title').text(jetpack.name);
    $('#jetpack_' + id + ' img').attr('src', jetpack.image);
    const saveBtn = $('#jetpack_' + id + ' button.edit-jet-button');
    saveBtn.data('jetPackName',jetpack.name);
    saveBtn.data('jetPackImg',jetpack.image);
    saveBtn.data('jetPackId',id);
};

$('#modalSaveBtn').click(() => {
    const jetpack = new JetpackEntity();
    jetpack.name = $('#modalJetName').val();
    jetpack.image = $('#modalImgUrl').val();
    const modalSaveBtnData  = $('#modalSaveBtn').data('jetPackId');
    //jetpackService.updateJetpack(('#modalSaveBtn').data('jetPackId'),jetpack);
    updateJetPackCard(modalSaveBtnData,jetpack);
    $('#editJetModal').modal('toggle');
});


