/**
 * http://usejsdoc.org/
 */
'use strict';

const dbUtil = require('../util/DBUtil');
const promise = require('promise');

module.exports = {

    summaryReport1: (startDate,endDate,type) => {
        return new promise((resolve, reject) => {
            dbUtil.summaryReport1(startDate,endDate,type)
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