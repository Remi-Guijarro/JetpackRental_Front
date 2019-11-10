const appConfig = require('./app.config');
const JetpackService = require('./src/Service/Api/JetpackApi');
const HttpClient = require('./src/HttpClient');
const JetpackEntity = require('./src/Entity/Jetpack');
const DateTimeValidator = require('./src/Service/Validators/DateTimeValidator');

const httpClient = new HttpClient(appConfig.apiUrl);
const jetpackService = new JetpackService(httpClient);

$('#search_id').click(() => {
    if($('#searchArea').is( ':hidden' )){
        $('#searchArea').slideDown( 'slow' );
    }else{
        $('#searchArea').hide(500);
    }
});


const launchModal = function(){
    $('#modalImgUrl').val($(this).data('jetPackImg'));
    $('#modalJetName').val($(this).data('jetPackName'));
    $('#modalSaveBtn').data('jetPackId',$(this).data('jetPackId'));
    $('#editJetModal').modal('toggle');
};

const generateJetPackCard = (jetpack,decolLabel='',edit=true) => {
    const jetPackDiv = $('<div class="card"  id="' + 'jetpack_' + jetpack.id +'" ></div>');
    jetPackDiv.append(' <img src="'+ jetpack.image +'" class="card-img-top" alt="...">');
    const jetPackDivBody =$(' <div class="card-body"> '+decolLabel+'<h5 class="card-title">' + jetpack.name + '</h5> </div>');
    const jetPackDivBodyEditButton = $('<button class="btn btn-primary edit-jet-button">Edit</button>');
    jetPackDivBodyEditButton.data('jetPackName',jetpack.name);
    jetPackDivBodyEditButton.data('jetPackImg',jetpack.image);
    jetPackDivBodyEditButton.data('jetPackId',jetpack.id);
    jetPackDivBodyEditButton.click(launchModal);
    if(edit)
        jetPackDivBody.append(jetPackDivBodyEditButton);
    jetPackDiv.append(jetPackDivBody);
    $('#jetpacks').append(jetPackDiv);
};
$('#reset_search').click(() =>{
    $('#reset_search').hide();
    $('#jetpacks').empty();
    $('#start_date').val('');
    $('#end_date').val('');
    displayAllJetpacks();
});

$('#launch_search').click(() => {
    const start_date = $('#start_date').val();
    const end_date = $('#end_date').val();
    const validator = new DateTimeValidator();
    if(validator.validate(start_date,end_date)){
        jetpackService.getBookingByDateTimeRange(new Date(start_date+ ' UTC').toISOString(),new Date(end_date+ ' UTC').toISOString()).then(rows => {
            $('#jetpacks').empty();
            rows.forEach(jetpack => {
                generateJetPackCard(jetpack,'<span class="badge badge-pill badge-success">Available</span>',false);
            });
        });
        $('#reset_search').slideDown();
    }else {
        alert('Start date must be lower than end date');
    }
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

    jetpackService.updateJetPack(jetpack).then(resp => {
        updateJetPackCard(modalSaveBtnData,resp);
        $('#editJetModal').modal('toggle');
    });
});

const displayAllJetpacks = () => {
    jetpackService.getJetpacks().then(jetpacks => {
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

