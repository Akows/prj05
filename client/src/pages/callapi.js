import axios from 'axios';
import { useState } from 'react';

import '../style/Callapi.css';

const Callapi = () => {

    // const [apiData, setApiData] = useState('');

    const [inputType, setInputType] = useState('');

    const key = { 
        apiKey: 'G35VFKA-45P4RYK-N6JZ4TA-NJCBNA1',
        uuid: '80cbb7cd-216c-4c7a-a9a5-f269ac98baa8'
    };

    const callAPIAction = () => {

        // const serviceKey = "z7ImRcb%2BDxJrHffyg9qkxVkYQgzL8EyntQLQds6ahlEhx4Jo10F1luSE4gBwkvxI3JWbQqINDilLifoBhUJVDQ%3D%3D";

        // var url = "http://apis.data.go.kr/B552584/UlfptcaAlarmInqireSvc/getUlfptcaAlarmInfo";
        // var queryParams = '?' + encodeURIComponent('serviceKey') + '=' + serviceKey; /* Service Key*/
        // queryParams += '&' + encodeURIComponent('returnType') + '=' + encodeURIComponent('json'); /* */
        // queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('100'); /* */
        // queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /* */
        // queryParams += '&' + encodeURIComponent('year') + '=' + encodeURIComponent('2020'); /* */
        // queryParams += '&' + encodeURIComponent('itemCode') + '=' + encodeURIComponent('PM10'); /* */

        // const api_url = url + queryParams;

        // axios.post(api_url)
        // .then(res => {
        //     console.log(res.data);
        // })
        // .catch(() => {
        //     console.log("err");
        // })




        axios.post('prj05/api/call/', {
            apiKey: key.apiKey,
            uuid: key.uuid,            
            inputType: inputType
        })
        .then(res => {
            console.log(res.data.SystemMassage);
        })
        .catch(res => {
            console.log(res.data.SystemMassage);
        })

    }

	return (
        <>
            <div className='capi-pagebackground setcenter'>
                <div className='capi-pageinner setcenter'>
                    <div className='capi-capiarea setcenter gifont'>

                        <div className='capi-sidebar'>

                            <h1>API 호출</h1>

                            <div className='capi-sideutil'>
                                <button onClick={callAPIAction}>Go</button>
                                <input type='text' className='gifont' value={inputType} placeholder='아이디를 입력해주세요' onChange={(e) => {setInputType(e.target.value)}}/>
                            </div>

                        </div>

                        <div className='capi-contents'>

                            <div className='capi-showapi'>

                            {/* {apiData && apiData.map(item => {
                                return (
                                    <>
                                        {item}
                                    </>
                                )
                            })} */}



                            </div>

                            
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Callapi;