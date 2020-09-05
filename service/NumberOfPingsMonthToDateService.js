/**
 * http://usejsdoc.org/
 */
'use strict';

const dbUtil = require('../util/DBUtil');
const promise = require('promise');

module.exports = {

    getNumberOfPingsMonthToDateData: (startDate,endDate,source) => {
        return new promise((resolve, reject) => {
            dbUtil.findNumberOfPingsMonthToDateData(startDate,endDate,source)
                    .then(dbResp => {
                        return resolve(dbResp);
                    })
                    .catch(err => {
                        console.log('error is: ' + err);
                        return reject(err);
                    });
        });
    },

    getNumberOfPingsDistributionMonthToDate: (startDate,endDate,polygon,source) => {
        return new promise((resolve, reject) => {
            dbUtil.findNumberOfPingsDistributionMonthToDate(startDate,endDate,polygon,source)
                    .then(dbResp => {
                        return resolve(dbResp);
                    })
                    .catch(err => {
                        console.log('error is: ' + err);
                        return reject(err);
                    });
        });
    },
};