/**
 * http://usejsdoc.org/
 */

'use strict';

const uniqueDeviceCountPerDayService = require('../service/UniqueDeviceCountPerDayService');

module.exports = {

    getUniqueDeviceCountPerDay: (req, res, next) => {

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

        let startDate = req.query.startDate;
        console.log("Start-Date :- " + startDate);
        let endDate = req.query.endDate;
        console.log("End-Date :- " + endDate);
        let source = req.query.source;
        console.log("Source :- " + source);

        uniqueDeviceCountPerDayService.getUniqueDeviceCountPerDayData(startDate,endDate,source)
                .then(resp => {
                    res.send({data: resp});
                })
                .catch(err => {
                    res.status(403).send({error: err});
                });

    },

    // 9/18/2019 create by nabeel ahmed==> Production Done
    getUniqueDeviceCountDistributionPerDayData: (req, res, next) => {

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

        let startDate = req.query.startDate;
        console.log("Start-Date :- " + startDate);

        let endDate = req.query.endDate;
        console.log("End-Date :- " + endDate);

        let source = req.query.source;
        console.log("Source :- " + source);

        let polygon = req.query.polygon;
        console.log("Polygon :- " + polygon);

        uniqueDeviceCountPerDayService.getUniqueDeviceCountDistributionPerDayData(startDate,endDate,polygon,source)
            .then(resp => {
                res.send({data: resp});
            })
            .catch(err => {
                res.status(403).send({error: err});
            });

    },

    getUniqueDeviceCountPerDayPercentage: (req, res, next) => {

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

        let startDate = req.query.startDate;
        console.log("Start-Date :- " + startDate);

        let endDate = req.query.endDate;
        console.log("End-Date :- " + endDate);

        let source = req.query.source;
        console.log("Source :- " + source);

        uniqueDeviceCountPerDayService.getUniqueDeviceCountPerDayData(startDate,endDate,source)
                .then(resp => {
                    let output = [];
                    resp.forEach(row => {
                        let obj = {
                            'Date': row.Date,
                            'A_1': parseInt(row['A_1']) / (parseInt(row['A_1']) + parseInt(row['B_2-5']) + parseInt(row['C_6-10']) + parseInt(row['D_11-30']) + parseInt(row['E_31-60']) + parseInt(row['F_61-100']) + parseInt(row['G_101-500']) + parseInt(row['H_501+'])),
                            'B_2-5': parseInt(row['B_2-5']) / (parseInt(row['A_1']) + parseInt(row['B_2-5']) + parseInt(row['C_6-10']) + parseInt(row['D_11-30']) + parseInt(row['E_31-60']) + parseInt(row['F_61-100']) + parseInt(row['G_101-500']) + parseInt(row['H_501+'])),
                            'C_6-10': parseInt(row['C_6-10']) / (parseInt(row['A_1']) + parseInt(row['B_2-5']) + parseInt(row['C_6-10']) + parseInt(row['D_11-30']) + parseInt(row['E_31-60']) + parseInt(row['F_61-100']) + parseInt(row['G_101-500']) + parseInt(row['H_501+'])),
                            'D_11-30': parseInt(row['D_11-30']) / (parseInt(row['A_1']) + parseInt(row['B_2-5']) + parseInt(row['C_6-10']) + parseInt(row['D_11-30']) + parseInt(row['E_31-60']) + parseInt(row['F_61-100']) + parseInt(row['G_101-500']) + parseInt(row['H_501+'])),
                            'E_31-60': parseInt(row['E_31-60']) / (parseInt(row['A_1']) + parseInt(row['B_2-5']) + parseInt(row['C_6-10']) + parseInt(row['D_11-30']) + parseInt(row['E_31-60']) + parseInt(row['F_61-100']) + parseInt(row['G_101-500']) + parseInt(row['H_501+'])),
                            'F_61-100': parseInt(row['F_61-100']) / (parseInt(row['A_1']) + parseInt(row['B_2-5']) + parseInt(row['C_6-10']) + parseInt(row['D_11-30']) + parseInt(row['E_31-60']) + parseInt(row['F_61-100']) + parseInt(row['G_101-500']) + parseInt(row['H_501+'])),
                            'G_101-500': parseInt(row['G_101-500']) / (parseInt(row['A_1']) + parseInt(row['B_2-5']) + parseInt(row['C_6-10']) + parseInt(row['D_11-30']) + parseInt(row['E_31-60']) + parseInt(row['F_61-100']) + parseInt(row['G_101-500']) + parseInt(row['H_501+'])),
                            'H_501+': parseInt(row['H_501+']) / (parseInt(row['A_1']) + parseInt(row['B_2-5']) + parseInt(row['C_6-10']) + parseInt(row['D_11-30']) + parseInt(row['E_31-60']) + parseInt(row['F_61-100']) + parseInt(row['G_101-500']) + parseInt(row['H_501+']))
                        };
                        output.push(obj);
                    });
                    res.send({data: output});
                })
                .catch(err => {
                    res.status(403).send({error: err});
                });
    },

    getUniqueDeviceCountPerDistributionDayPercentage: (req, res, next) => {

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

        let startDate = req.query.startDate;
        console.log("Start-Date :- " + startDate);

        let endDate = req.query.endDate;
        console.log("End-Date :- " + endDate);

        let source = req.query.source;
        console.log("Source :- " + source);

        let polygon = req.query.polygon;
        console.log("Polygon :- " + polygon);

        uniqueDeviceCountPerDayService.getUniqueDeviceCountDistributionPerDayData(startDate,endDate,polygon,source)
                .then(resp => {
                    let output = [];
                    resp.forEach(row => {
                        let obj = {
                            'Date': row.Date,
                            'A_1': parseInt(row['A_1']) / (parseInt(row['A_1']) + parseInt(row['B_2-5']) + parseInt(row['C_6-10']) + parseInt(row['D_11-30']) + parseInt(row['E_31-60']) + parseInt(row['F_61-100']) + parseInt(row['G_101-500']) + parseInt(row['H_501+'])),
                            'B_2-5': parseInt(row['B_2-5']) / (parseInt(row['A_1']) + parseInt(row['B_2-5']) + parseInt(row['C_6-10']) + parseInt(row['D_11-30']) + parseInt(row['E_31-60']) + parseInt(row['F_61-100']) + parseInt(row['G_101-500']) + parseInt(row['H_501+'])),
                            'C_6-10': parseInt(row['C_6-10']) / (parseInt(row['A_1']) + parseInt(row['B_2-5']) + parseInt(row['C_6-10']) + parseInt(row['D_11-30']) + parseInt(row['E_31-60']) + parseInt(row['F_61-100']) + parseInt(row['G_101-500']) + parseInt(row['H_501+'])),
                            'D_11-30': parseInt(row['D_11-30']) / (parseInt(row['A_1']) + parseInt(row['B_2-5']) + parseInt(row['C_6-10']) + parseInt(row['D_11-30']) + parseInt(row['E_31-60']) + parseInt(row['F_61-100']) + parseInt(row['G_101-500']) + parseInt(row['H_501+'])),
                            'E_31-60': parseInt(row['E_31-60']) / (parseInt(row['A_1']) + parseInt(row['B_2-5']) + parseInt(row['C_6-10']) + parseInt(row['D_11-30']) + parseInt(row['E_31-60']) + parseInt(row['F_61-100']) + parseInt(row['G_101-500']) + parseInt(row['H_501+'])),
                            'F_61-100': parseInt(row['F_61-100']) / (parseInt(row['A_1']) + parseInt(row['B_2-5']) + parseInt(row['C_6-10']) + parseInt(row['D_11-30']) + parseInt(row['E_31-60']) + parseInt(row['F_61-100']) + parseInt(row['G_101-500']) + parseInt(row['H_501+'])),
                            'G_101-500': parseInt(row['G_101-500']) / (parseInt(row['A_1']) + parseInt(row['B_2-5']) + parseInt(row['C_6-10']) + parseInt(row['D_11-30']) + parseInt(row['E_31-60']) + parseInt(row['F_61-100']) + parseInt(row['G_101-500']) + parseInt(row['H_501+'])),
                            'H_501+': parseInt(row['H_501+']) / (parseInt(row['A_1']) + parseInt(row['B_2-5']) + parseInt(row['C_6-10']) + parseInt(row['D_11-30']) + parseInt(row['E_31-60']) + parseInt(row['F_61-100']) + parseInt(row['G_101-500']) + parseInt(row['H_501+']))
                        };
                        output.push(obj);
                    });
                    res.send({data: output});
                })
                .catch(err => {
                    res.status(403).send({error: err});
                });
    }
};