import axios from 'axios';
import { useState } from 'react';

import '../style/Callapi.css';

const Callapi = () => {

    const [apiData, setApiData] = useState('');

    const key = { 
        apiKey: 'G35VFKA-45P4RYK-N6JZ4TA-NJCBNA1',
        uuid: '80cbb7cd-216c-4c7a-a9a5-f269ac98baa8'
    };

    let startNum = 0;
    let endNum = 15;

    const callAPIAction = () => {
        axios.post('prj05/api/call/', {
            apiKey: key.apiKey,
            uuid: key.uuid
        })
        .then(res => {
            const newData = [];
            res.data.datas.response.body.items.slice(startNum, endNum).forEach(element => { newData.push(element); });
            setApiData((oldData => [...oldData, ...newData]));

            const handleScrollCharacter = (event) => {

                if (window.innerHeight + event.target.documentElement.scrollTop + 1 >= event.target.documentElement.scrollHeight) {
                    startNum = endNum;
                    endNum = startNum + 15;

                    setTimeout(() => {
                        callAPIAction(); 
                    }, 1000);
                }
            };

            window.addEventListener('scroll', handleScrollCharacter);
        })
        .catch(err => {
            console.log(err);
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
                                <button className='capi-callbtu gifont' onClick={callAPIAction}><h3>데이터 받아오기</h3></button>
                            </div>

                        </div>

                        <div className='capi-contents'>

                            <div className='capi-showapi'>

                            {apiData === '' ?
                            <>
                                <div className='capi-loading'>
                                    <h1>공공데이터 API 호출하여 데이터 출력하기</h1>
                                </div>

                            </>
                            :
                            <>
                                {apiData && apiData.map(item => {
                                    return (
                                        <div className='capi-datablock' key={item.sn}>
                                            {item.districtName} <br/>
                                            {item.moveName} <br/>
                                            {item.issueGbn} <br/><hr/>
                                        </div>
                                    )
                                })}
                            </>    
                            }

                            



                            </div>

                            
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Callapi;