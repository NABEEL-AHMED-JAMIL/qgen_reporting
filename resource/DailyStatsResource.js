'use strict';

const dailyStatsService = require('../service/DailyStatsService');

module.exports = {
    
    // 9/18/2019 create by nabeel ahmed==> Production Done
    dailyStatsSummary: (req, res, next) => {

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

        let startDate = req.query.startDate;
        console.log("Start-Date :- " + startDate);
        let endDate = req.query.endDate;
        console.log("End-Date :- " + endDate);
        let polygon = req.query.polygon;
        console.log("Polygon :- " + polygon);
        let type = req.params.type;
        console.log("Type :- " + type);

        dailyStatsService.dailyStatsSummary(startDate,endDate,polygon,type)
            .then(resp => {
                console.log("Resource-RESPONSE", JSON.stringify(resp));
                res.send({data: resp});
            })
            .catch(err => {
                res.status(403).send({error: err});
            });
    }
};