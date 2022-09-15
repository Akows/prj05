import axios from 'axios';
import React, { useContext, useState } from 'react';

import { myContext } from '../App';

import '../style/Callapi.css';

const Callapi = () => {
    const contextApi = useContext(myContext);

    const [apiData, setApiData] = useState('');

    const key = { 
        apiKey: 'G35VFKA-45P4RYK-N6JZ4TA-NJCBNA1',
        uuid: '80cbb7cd-216c-4c7a-a9a5-f269ac98baa8'
    };

    let numOfRows = 12;
    let pageNo = 1;

    const callAPIAction = () => {
        axios.post('prj05/api/call/', {
            apiKey: key.apiKey,
            uuid: key.uuid,
            numOfRows: numOfRows,
            pageNo: pageNo
        })
        .then(res => {
            const newData = [];
            res.data.datas.response.body.items.forEach(element => { newData.push(element); });
            setApiData((oldData => [...oldData, ...newData]));

        })
        .catch(err => {
            console.log(err);
        })
    }

    const handleScrollCharacter = (event) => {
        if (window.innerHeight + event.target.documentElement.scrollTop + 1 >= event.target.documentElement.scrollHeight) {
            pageNo++;
            callAPIAction();
        }
    };

    React.useEffect(() => {
        // 로그인 검증 실시.
        contextApi.loginCheck();

        if(!contextApi.loginStatus) {
            // console.log("회원정보 검증이 실패하였습니다.");
        }

        window.addEventListener('scroll', handleScrollCharacter);
    }, []);

	return (
        <>
            <div className='capi-pagebackground setcenter'>
                <div className='capi-pageinner setcenter'>
                    <div className='capi-capiarea setcenter gifont'>
                        <div className='capi-sidebar'>
                            <h1>API 호출</h1>
                            <div className='capi-sideutil'>
                            {contextApi.loginStatus ?
                                <>
                                    <button className='capi-callbtu gifont' onClick={callAPIAction}><h3>데이터 받아오기</h3></button>
                                </>
                                :
                                <>
                                    <button className='capi-callbtu gifont'><h3>사용불가</h3></button>
                                </>
                            }
                            </div>
                        </div>
                        <div className='capi-contents'>
                            <div className='capi-showapi'>
                                {contextApi.loginStatus ?
                                <>
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
                                                    식별번호 : {item.sn} <br/>
                                                    지역명 : {item.districtName} <br/>
                                                    권역명 : {item.moveName} <br/>
                                                    오염수치 : {item.issueVal} <br/>
                                                    경보수준 : {item.issueGbn} <br/><hr/>
                                                </div>
                                            )
                                        })}
                                    </>    
                                    }
                                </>
                                :
                                <>
                                    <div className='capi-loading'>
                                        <h1>본 기능은 회원전용입니다.</h1>
                                    </div>
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