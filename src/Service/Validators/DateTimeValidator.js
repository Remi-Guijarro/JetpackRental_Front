module.exports = class  {
    validate(start_date_time,end_date_time){
        const startDate = new Date(start_date_time) ;
        const endDate = new Date(end_date_time);
        return startDate < endDate;
    }
};
