const appConfig = require('./app.config');
const JetpackService = require('./src/Service/Api/JetpackApi');
const BookingService = require('./src/Service/Api/BookingApi');
const HttpClient = require('./src/HttpClient');
const JetpackEntity = require('./src/Entity/Jetpack');
const BookingEntity = require('./src/Entity/Booking');
const DateTimeValidator = require('./src/Service/Validators/DateTimeValidator');

const httpClient = new HttpClient(appConfig.apiUrl);
const jetpackService = new JetpackService(httpClient);
const bookingService = new BookingService(httpClient);


const date2ISO = datetime => new Date(datetime + ' UTC').toISOString();

const bookJetpack = function() {
    const booking = new BookingEntity();
    booking.start_date_time = date2ISO($('#start_date').val());
    booking.end_date_time = date2ISO($('#end_date').val());
    booking.jetpackId = $(this).data('jetpackId');

    bookingService.bookJetpack(booking).then(returnedBooking =>{
        if(returnedBooking !== undefined || returnedBooking !== null){
            const alert = $('#alert_success');
            alert.slideDown();
            setTimeout(() => {
                alert.hide();
            },2000);
        }else {
            const alert = $('#alert_error');
            alert.slideDown();
            setTimeout(() => {
                alert.hide();
            },2000);
        }
    });
};

const generateJetPackCard = (jetpack, decoLabel='', decoButton=null, edit=true) => {
    const jetpackId = 'jetpack_' + jetpack.id;
    const jetPackDiv = $('<div class="card"  id="' + jetpackId +'" ></div>');
    jetPackDiv.append(' <img src="'+ jetpack.image +'" class="card-img-top" alt="...">');
    const jetPackDivBody =$(' <div class="card-body"> '+decoLabel+'<h5 class="card-title">' + jetpack.name + '</h5> </div>');
    const jetPackDivBodyEditButton = $('<button class="btn btn-primary edit-jet-button">Edit</button>');
    jetPackDivBodyEditButton.data('jetPackName',jetpack.name);
    jetPackDivBodyEditButton.data('jetPackImg',jetpack.image);
    jetPackDivBodyEditButton.data('jetPackId',jetpack.id);
    jetPackDivBodyEditButton.on('click', launchModal);
    if(edit) {
        jetPackDivBody.append(jetPackDivBodyEditButton);
    }
    jetPackDiv.append(jetPackDivBody);
    if (decoButton) {
        decoButton.data('jetpackId',jetpack.id);
        decoButton.on('click',bookJetpack);
        jetPackDivBody.append(decoButton);
    }
    $('#jetpacks').append(jetPackDiv);
};

const displayAllJetpacks = () => {
    jetpackService.getJetpacks().then(jetpacks => {
        jetpacks.forEach(jetpack => {
            generateJetPackCard(jetpack);
        });
    });
};

$('#search_id').on('click', () => {
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

$('#reset_search').on('click', () => {
    $('#reset_search').hide();
    $('#jetpacks').empty();
    $('#start_date').val('');
    $('#end_date').val('');
    displayAllJetpacks();
});

$('#launch_search').on('click', () => {
    const start_date = $('#start_date').val();
    const end_date = $('#end_date').val();
    const validator = new DateTimeValidator();
    if(validator.validate(start_date,end_date)){
        jetpackService.getBookingByDateTimeRange(date2ISO(start_date),date2ISO(end_date)).then(rows => {
            $('#jetpacks').empty();
            rows.forEach(jetpack => {
                generateJetPackCard(
                    jetpack
                    , '<span class="badge badge-pill badge-success">Available</span>'
                    , $('<button type="button" class="btn btn-success btn-lg btn-book" >Réserver</button>')
                    , false);
            });
        });
        $('#reset_search').slideDown();
    }else {
        alert('Start date must be lower than end date');
    }
});

const updateJetPackCard = (id, jetpack) => {
    $('#jetpack_' + id + ' div.card-body h5.card-title').text(jetpack.name);
    $('#jetpack_' + id + ' img').attr('src', jetpack.image);
    const saveBtn = $('#jetpack_' + id + ' button.edit-jet-button');
    saveBtn.data('jetPackName',jetpack.name);
    saveBtn.data('jetPackImg',jetpack.image);
    saveBtn.data('jetPackId',id);
};

$('#modalSaveBtn').on('click', () => {
    const jetpack = new JetpackEntity();
    const modalSaveBtnData  = $('#modalSaveBtn').data('jetPackId');
    jetpack.id = modalSaveBtnData;
    jetpack.name = $('#modalJetName').val();
    jetpack.image = $('#modalImgUrl').val();
    jetpackService.updateJetPack(jetpack).then(resp => {
        updateJetPackCard(modalSaveBtnData,resp);
        $('#editJetModal').modal('toggle');
    });
});

document.getElementById('add-button').onclick = () => {
    document.getElementById('create-form').style.visibility = 'Visible';
};

document.getElementById('save-button').onclick = () => {
    const jetpack = new JetpackEntity();
    jetpack.name = $('#name').val();
    jetpack.image = $('#image').val();
    jetpackService.saveJetpack(jetpack).then(resp => {
        generateJetPackCard(resp);
    });
};

displayAllJetpacks();
