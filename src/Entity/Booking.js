module.exports = class {
    constructor() {
        this._id = null;
        this._jetpackId = null;
        this._start_date_time = null;
        this._end_date_time = null;
    }

    get id() {
        return this._id;
    }

    get jetpackId() {
        return this._jetpackId;
    }

    get start_date_time() {
        return this._start_date_time;
    }

    get end_date_time() {
        return this._end_date_time;
    }

    set id(value) {
        this._id = value;
    }

    set jetpackId(value) {
        this._jetpackId = value;
    }

    set start_date_time(value) {
        this._start_date_time = value;
    }

    set end_date_time(value) {
        this._end_date_time = value;
    }

    toJson() {
        return {
            id : this.id,
            jetpackId : this.jetpackId,
            start_date: this.start_date_time,
            end_date: this.end_date_time
        };
    };
};
