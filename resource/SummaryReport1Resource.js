/**
 * http://usejsdoc.org/
 */

'use strict';

const summaryReport1Service = require('../service/SummaryReport1Service');

module.exports = {
    
    // 9/18/2019 create by nabeel ahmed==> Production Done
    summaryReport1: (req, res, next) => {

        if(!req.query.startDate) {
            res.send({error : 'Start-Date Required !!'});
            return next();
        }

        if(!req.query.endDate) {
            res.send({error : 'End-Date Required !!'});
            return next();
        }

        let startDate = req.query.startDate.replace("-", "/");
        console.log("Start-Date :- " + startDate);
        let endDate = req.query.endDate.replace("-", "/");
        console.log("End-Date :- " + endDate);
        let type = req.params.type;
        console.log("Type :- " + type);

        summaryReport1Service.summaryReport1(startDate,endDate,type)
            .then(resp => {
                console.log("Resource-RESPONSE", JSON.stringify(resp));
                res.send({data: resp});
            })
            .catch(err => {
                res.status(403).send({error: err});
            });
    }
};