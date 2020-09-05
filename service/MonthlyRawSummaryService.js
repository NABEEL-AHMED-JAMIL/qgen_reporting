/**
 * http://usejsdoc.org/
 */
'use strict';

const dbUtil = require('../util/DBUtil');
const promise = require('promise');

module.exports = {

    monthlyRawSummary: (startDate,endDate,polygon,type) => {
        return new promise((resolve, reject) => {
            dbUtil.monthlyRawSummary(startDate,endDate,polygon,type)
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