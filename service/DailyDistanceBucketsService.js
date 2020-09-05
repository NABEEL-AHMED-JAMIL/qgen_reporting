/**
 * http://usejsdoc.org/
 */
'use strict';

const dbUtil = require('../util/DBUtil');
const promise = require('promise');

module.exports = {

    dailyDistanceBuckets: (startDate,endDate,polygon,source,type) => {
        return new promise((resolve, reject) => {
            dbUtil.dailyDistanceBuckets(startDate,endDate,polygon,source,type)
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