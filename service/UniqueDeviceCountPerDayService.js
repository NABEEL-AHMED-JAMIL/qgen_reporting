/**
 * http://usejsdoc.org/
 */
'use strict';

const dbUtil = require('../util/DBUtil');
const promise = require('promise');

module.exports = {

    getUniqueDeviceCountPerDayData: (startDate,endDate,source) => {
        return new promise((resolve, reject) => {
            dbUtil.findUniqueDeviceCountPerDayData(startDate,endDate,source)
                    .then(dbResp => {
                        return resolve(dbResp);
                    })
                    .catch(err => {
                        console.log('error is: ' + err);
                        return reject(err);
                    });
        });
    },

    // 9/18/2019 create by nabeel ahmed==> Production Done
    getUniqueDeviceCountDistributionPerDayData: (startDate,endDate,polygon,source) => {
        return new promise((resolve, reject) => {
            dbUtil.findUniqueDeviceCountDistributionPerDayData(startDate,endDate,polygon,source)
                .then(dbResp => {
                    return resolve(dbResp);
                })
                .catch(err => {
                    console.log('error is: ' + err);
                    return reject(err);
                });
        });
    }


};