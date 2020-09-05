/**
 * http://usejsdoc.org/
 */
'use strict';

const dbUtil = require('../util/DBUtil');
const qgenUtil = require('../util/QgenUtil');
const promise = require('promise');

module.exports = {

    getPolygon: () => {
        return new promise((resolve, reject) => {
            dbUtil.findPolygon()
                .then(dbResp => {
                    var array = dbResp;
                    return resolve(array[0]);
                })
                .catch(err => {
                    console.log('error is: ' + err);
                    return reject(err);
                });
        });
    },

};