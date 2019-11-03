module.exports = class DateTime {
    constructor(date,time){
        this._date = date;
        this._time = time;
    }

    get date(){
        return this._date;
    }

    get time(){
        return this._time;
    }

    set date(date){
        this._date = date;
    }

    set time(time){
        this._time = time;
    }
};
