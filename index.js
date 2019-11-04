const appConfig = require('./app.config');
const JetpackService = require('./src/Service/Api/JetpackApi');
const BookingService = require('./src/Service/Api/BookingApi');
const HttpClient = require('./src/HttpClient');
const JetpackEntity = require('./src/Entity/Jetpack');
const DateTime = require('./src/Entity/DateTime');

const httpClient = new HttpClient(appConfig.apiUrl);
const jetpackService = new JetpackService(httpClient);
const bookingSerivce = new BookingService(httpClient);
let jetpack_list;

$('#search_id').click(() => {
    if($('#searchArea').is( ':hidden' )){
        $('#searchArea').slideDown( 'slow' );
    }else{
        $('#searchArea').hide(500);
    }
});

$('#launch_search').click(() => {
    const splited_start_date = $('#start_date').val().split(' ');
    const splited_end_date = $('#end_date').val().split(' ');
    const start_date = new DateTime(splited_start_date[0],splited_start_date[1]);
    const end_date = new DateTime(splited_end_date[0],splited_end_date[1]);
    bookingSerivce.getBookingByDateTimeRange(start_date,end_date).then(row => {
        console.log(row);
    });
});

const launchModal = function(){
    $('#modalImgUrl').val($(this).data('jetPackImg'));
    $('#modalJetName').val($(this).data('jetPackName'));
    $('#modalSaveBtn').data('jetPackId',$(this).data('jetPackId'));
    $('#editJetModal').modal('toggle');
};

const generateJetPackCard = jetpack => {
    const jetPackDiv = $('<div class="card"  id="' + 'jetpack_' + jetpack.id +'" ></div>');
    jetPackDiv.append(' <img src="'+ jetpack.image +'" class="card-img-top" alt="...">');
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

    jetpackService.updateJetPack(jetpack).then(resp => {
        updateJetPackCard(modalSaveBtnData,resp);
        $('#editJetModal').modal('toggle');
    });
});

const displayAllJetpacks = () => {
    jetpackService.getJetpacks().then(jetpacks => {
        jetpack_list = jetpacks;
        jetpacks.forEach(jetpack => {
            generateJetPackCard(jetpack);
        });
    });
};

document.getElementById('add-button').onclick = () => {
    document.getElementById('create-form').style.visibility = 'Visible';
};

document.getElementById('save-button').onclick = () => {
    const jetpack = new JetpackEntity();
    jetpackService.saveJetpack(jetpack).then(resp => {
        generateJetPackCard(resp);
    });
};

document.getElementById('book-button').onclick = () => {
    //TODO
};

displayAllJetpacks();

