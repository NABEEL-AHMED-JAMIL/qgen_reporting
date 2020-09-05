'use strict';

const dailyDtCountsService = require('../service/DailyDtCountsService');

module.exports = {
    
    // 9/18/2019 create by nabeel ahmed==> Production Done
    dailyDtCounts: (req, res, next) => {

        if(!req.query.startDate) {
            res.send({error : 'Start-Date Required !!'});
            return next();
        }

        if(!req.query.endDate) {
            res.send({error : 'End-Date Required !!'});
            return next();
        }

        if(!req.query.polygon) {
            res.send({error : 'Missing Polygon !!'});
            return next();
        }

        if(!req.query.source) {
            res.send({error : 'Missing Source !!'});
            return next();
        }

        let startDate = req.query.startDate;
        console.log("Start-Date :- " + startDate);
        let endDate = req.query.endDate;
        console.log("End-Date :- " + endDate);
        let polygon = req.query.polygon;
        console.log("Polygon :- " + polygon);
        let source = req.query.source;
        console.log("Source :- " + source);
        

        dailyDtCountsService.dailyDtCounts(startDate,endDate,polygon,source)
            .then(resp => {
                console.log("Resource-RESPONSE", JSON.stringify(resp));
                res.send({data: resp});
            })
            .catch(err => {
                res.status(403).send({error: err});
            });
    }
};