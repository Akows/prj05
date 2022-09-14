const express = require("express");
const router = express.Router();

const uuidAPIKey = require('uuid-apikey');

// 보안성을 위해서 secretkey가 저장된 파일을 따로 두고 사용.
require("dotenv").config();

// request 모듈 (미사용)
// const request = require('request');

router.get("/call/:aa", (req, res) => {

    let { aa } = req.params;

    if (!uuidAPIKey.isAPIKey(apikey) || !uuidAPIKey.check(apikey, key.uuid)) {
        res.send('API KEY가 유효하지 않습니다.')
    }

    const inputType  = req.body;

    console.log(aa);
    res.send("connect.");
})



// router.get("/call", (req, res) => {

//     // 발급받은 인증키를 저장한 env 파일에서 인증키를 가져온다.
//     const serviceKey = process.env.PUBLIC_API_CALLKEY;

//     // const options = {
//     //     uri: "http://apis.data.go.kr/B552584/UlfptcaAlarmInqireSvc/getUlfptcaAlarmInfo",
//     // };

//     var url = "http://apis.data.go.kr/B552584/UlfptcaAlarmInqireSvc/getUlfptcaAlarmInfo";
//     var queryParams = '?' + encodeURIComponent('serviceKey') + '=' + serviceKey; /* Service Key*/
//     queryParams += '&' + encodeURIComponent('returnType') + '=' + encodeURIComponent('json'); /* */
//     queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('100'); /* */
//     queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /* */
//     queryParams += '&' + encodeURIComponent('year') + '=' + encodeURIComponent('2020'); /* */
//     queryParams += '&' + encodeURIComponent('itemCode') + '=' + encodeURIComponent('PM10'); /* */
    
//     const api_url = url + queryParams;

//     var data = '';

//     request(api_url, function(error, res, body){
//         if(error){
//             console.log(error)
//         }
//         // console.log(body)

//         data = body;
//     });

//     res.render("/prj05/api/call", {datas: data})
// })

module.exports = router;