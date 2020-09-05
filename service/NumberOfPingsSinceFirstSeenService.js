/**
 * http://usejsdoc.org/
 */
'use strict';

const dbUtil = require('../util/DBUtil');
const promise = require('promise');

module.exports = {
    getNumberOfPingsSinceFirstSeenData: (startDate,endDate,source) => {
        return new promise((resolve, reject) => {
            dbUtil.findNumberOfPingsSinceFirstSeenData(startDate,endDate,source)
                    .then(dbResp => {
                        return resolve(dbResp);
                    })
                    .catch(err => {
                        console.log('error is: ' + err);
                        return reject(err);
                    });
        });
    },

    
    getNumberOfPingsDistributioSinceFirstSeen: (startDate,endDate,polygon,source) => {
        return new promise((resolve, reject) => {
            dbUtil.findNumberOfDistributioPingsSinceFirstSeenData(startDate,endDate,polygon,source)
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