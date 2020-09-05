/**
 * http://usejsdoc.org/
 */
'use strict';

module.exports = {

    onlyUnique: (value, index, self) => {
        return self.indexOf(value) === index;
    }

};