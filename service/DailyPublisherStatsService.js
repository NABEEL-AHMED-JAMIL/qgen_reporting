/**
 * http://usejsdoc.org/
 */
'use strict';

const dbUtil = require('../util/DBUtil');
const promise = require('promise');

module.exports = {

    dailyPublisherStats: (startDate,endDate,polygon,name) => {
        return new promise((resolve, reject) => {
            dbUtil.dailyPublisherStats(startDate,endDate,polygon,name)
                .then(dbResp => {
                    console.log("Service-RESPONSE", JSON.stringify(dbResp));
                    return resolve(dbResp);
                })
                .catch(err => {
                    console.log('error is: ' + err);
                    return reject(err);
                });
        });
    }

};