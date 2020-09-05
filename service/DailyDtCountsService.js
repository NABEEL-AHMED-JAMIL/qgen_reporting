/**
 * http://usejsdoc.org/
 */
'use strict';

const dbUtil = require('../util/DBUtil');
const promise = require('promise');

module.exports = {

    dailyDtCounts: (startDate,endDate,polygon,source) => {
        return new promise((resolve, reject) => {
            dbUtil.dailyDtCounts(startDate,endDate,polygon,source)
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