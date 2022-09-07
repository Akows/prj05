const express = require("express");
const router = express.Router();
const request = require('request');

router.get("/call", (req, res) => {

    const options = {
        uri: "http://apis.data.go.kr/B552584/UlfptcaAlarmInqireSvc/getUlfptcaAlarmInfo",

    };

    // const input = req.query.BOARD_TITLE;

    var url = '';
    var queryParams = '?' + encodeURIComponent('serviceKey') + '=서비스키'; /* Service Key*/
    queryParams += '&' + encodeURIComponent('returnType') + '=' + encodeURIComponent('xml'); /* */
    queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('100'); /* */
    queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /* */
    queryParams += '&' + encodeURIComponent('year') + '=' + encodeURIComponent('2020'); /* */
    queryParams += '&' + encodeURIComponent('itemCode') + '=' + encodeURIComponent('PM10'); /* */

    request(api_url, function(err, res, body){
        console.log(body);
    });




})

module.exports = router;