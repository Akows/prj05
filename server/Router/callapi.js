const express = require("express");
const router = express.Router();

const request = require('request');
const uuidAPIKey = require('uuid-apikey');

// 보안성을 위해서 secretkey가 저장된 파일을 따로 두고 사용.
require("dotenv").config();

// request 모듈 (미사용)


router.post("/call", (req, res) => {
    const { apiKey, uuid, inputType } = req.body;

    if (!uuidAPIKey.isAPIKey(apiKey) || !uuidAPIKey.check(apiKey, uuid)) {
        res.json({ SystemMassage: "API KEY가 유효하지 않습니다." })
    }
    else {
        // 발급받은 인증키를 저장한 env 파일에서 인증키를 가져온다.
        const serviceKey = process.env.PUBLIC_API_CALLKEY;

        var url = "http://apis.data.go.kr/B552584/UlfptcaAlarmInqireSvc/getUlfptcaAlarmInfo";
        var queryParams = '?' + encodeURIComponent('serviceKey') + '=' + serviceKey; /* Service Key*/
        queryParams += '&' + encodeURIComponent('returnType') + '=' + encodeURIComponent('json'); /* */
        queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('100'); /* */
        queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /* */
        queryParams += '&' + encodeURIComponent('year') + '=' + encodeURIComponent('2020'); /* */
        queryParams += '&' + encodeURIComponent('itemCode') + '=' + encodeURIComponent('PM10'); /* */

        const api_url = url + queryParams;

        request(api_url, function(error, res, body){
            if(error){
                console.log(error)
            }
            let info = JSON.parse(body);

            for (i in info.response.body.items.item) {
                console.log('지역 : ' + info.response.body.items.item.districtName);
                console.log('지역상세 : ' + info.response.body.items.item.moveName);
                console.log('경보수준 : ' + info.response.body.items.item.issueGbn);
                console.log('오염수치 : ' + info.response.body.items.item.clearVal);
                console.log(" ")
            }
    



        });
        res.json({ SystemMassage: "API KEY가 유효합니다."})
    }
})



module.exports = router;