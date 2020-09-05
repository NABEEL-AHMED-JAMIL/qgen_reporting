/**
 * http://usejsdoc.org/
 */

'use strict';

const extraService = require('../service/ExtraService');

module.exports = {

    // 9/18/2019 create by nabeel ahmed==> Production Done
    getPolygon: (req, res, next) => {
        extraService.getPolygon()
            .then(resp => {
                res.send({data: resp});
            })
            .catch(err => {
                res.status(403).send({error: err});
            });
    }
};