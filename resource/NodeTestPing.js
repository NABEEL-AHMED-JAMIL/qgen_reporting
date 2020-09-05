/**
 * http://usejsdoc.org/
 */

'use strict';

module.exports = {

    getPingTest: (req, res, next) => {

        if(!req.query.firstNum && !req.query.secondNum) {
            res.send({error : 'FirstNum and SecondNum Required !!'});
            return next();
        }
        let firstNum = req.query.firstNum;
        console.log("First Number " + firstNum);
        let secondNum = req.query.secondNum;
        console.log("Second Number " + secondNum);
        let count = firstNum + secondNum;
        console.log("Count :- " + count);
        let json = {
            "total" : count
        }
        res.status(200).send(json);
    }
};