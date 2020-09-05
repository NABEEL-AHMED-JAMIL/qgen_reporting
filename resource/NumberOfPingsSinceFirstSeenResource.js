/**
 * http://usejsdoc.org/
 */

'use strict';

const numberOfPingsSinceFirstSeenService = require('../service/NumberOfPingsSinceFirstSeenService');

module.exports = {

    getNumberOfPingsSinceFirstSeen: (req, res, next) => {

        if(!req.query.startDate) {
            res.send({error : 'Start-Date Required !!'});
            return next();
        }

        if(!req.query.endDate) {
            res.send({error : 'End-Date Required !!'});
            return next();
        }

        if(!req.query.source) {
            res.send({error : 'Source Required !!'});
            return next();
        }

        let startDate = req.query.startDate.replace("-", "/");
        console.log("Start-Date :- " + startDate);
        let endDate = req.query.endDate.replace("-", "/");
        console.log("End-Date :- " + endDate);
        let source = req.query.source;
        console.log("Source :- " + source);

        numberOfPingsSinceFirstSeenService.getNumberOfPingsSinceFirstSeenData(startDate,endDate,source)
            .then(resp => {
                res.send({data: resp});
            })
            .catch(err => {
                res.status(403).send({error: err});
            });
    },

    getNumberOfPingsDistributioSinceFirstSeen: (req, res, next) => {

        if(!req.query.startDate) {
            res.send({error : 'Start-Date Required !!'});
            return next();
        }

        if(!req.query.endDate) {
            res.send({error : 'End-Date Required !!'});
            return next();
        }

        if(!req.query.source) {
            res.send({error : 'Source Required !!'});
            return next();
        }

        if(!req.query.polygon) {
            res.send({error : 'Missing Polygon !!'});
            return next();
        }

        let startDate = req.query.startDate.replace("-", "/");
        console.log("Start-Date :- " + startDate);

        let endDate = req.query.endDate.replace("-", "/");
        console.log("End-Date :- " + endDate);

        let source = req.query.source;
        console.log("Source :- " + source);

        let polygon = req.query.polygon;
        console.log("Polygon :- " + polygon);

        numberOfPingsSinceFirstSeenService.getNumberOfPingsDistributioSinceFirstSeen(startDate,endDate,polygon,source)
            .then(resp => {
                res.send({data: resp});
            })
            .catch(err => {
                res.status(403).send({error: err});
            });
    }

};