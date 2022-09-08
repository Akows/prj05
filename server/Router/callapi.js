const express = require("express");
const router = express.Router();
const request = require('request');

// 보안성을 위해서 secretkey가 저장된 파일을 따로 두고 사용.
require("dotenv").config();

router.get("/call", (req, res) => {

    const skey = '=' + process.env.PUBLIC_API_CALLKEY;

    const options = {
        uri: "http://apis.data.go.kr/B552584/UlfptcaAlarmInqireSvc/getUlfptcaAlarmInfo",

    };

    // const input = req.query.BOARD_TITLE;

    var url = '';
    var queryParams = '?' + encodeURIComponent('serviceKey') + skey; /* Service Key*/
    queryParams += '&' + encodeURIComponent('returnType') + '=' + encodeURIComponent('xml'); /* */
    queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('100'); /* */
    queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /* */
    queryParams += '&' + encodeURIComponent('year') + '=' + encodeURIComponent('2020'); /* */
    queryParams += '&' + encodeURIComponent('itemCode') + '=' + encodeURIComponent('PM10'); /* */
    const api_url = url + queryParams;

    request(api_url, function(error, res, body){
        if(error){
            console.log(error)
        }
        var obj = JSON.parse(body)
        console.log(obj)
    });




})

module.exports = router;