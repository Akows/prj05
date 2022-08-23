import { useState } from 'react';
import axios from 'axios';

import '../style/Login.css';
import '../style/GlobalStyle.css';

const Login = (props) => {

    // 로그인에 필요한 데이터를 변수로 제어할 useState 사용.
    const [inputID, setInputID] = useState('');
    const [inputPW, setInputPW] = useState('');

    // // 로그인 Event.
    // const loginEvent = () => {
    //     // 정보 입력란이 하나라도 비어있으면 경고를 출력하고 기능 정지.
    //     if (inputID === '' || inputPW === '') {
    //         alert('아이디 혹은 비밀번호가 입력되지 않았습니다.');
    //     }
    //     // 그렇지 않으면 다음 작업으로 이동.
    //     else {
    //         axios.post('/prj05/member/login', null, {
    //             params: {
    //                 'MEMBER_ID': inputID,
    //                 'MEMBER_PW': inputPW
    //             }
    //         })
    //         // 작업이 완료되었을 경우, 로그인 값과 사용자 이름을 상단 App으로 전송.
    //         .then(res => {
    //             // 인증이 실패한 경우
    //             if (!res.data.auth) {
    //                 props.sendLoginStatus(false);
    //                 alert(res.data.SystemMessage);
    //             }
    //             // 인증이 성공한 경우
    //             else {
    //                 // 토큰을 로컬스토리지에 저장.
    //                 localStorage.setItem('token', res.data.token);

    //                 // 토큰 유효성 검사 실행
    //                 axios.get('/prj05/member/auth', {
    //                     headers: {
    //                         "x-access-token": localStorage.getItem('token'),
    //                     }})
    //                     // 유효성 검사를 통과했을 경우
    //                     // 로그인 상태를 true로 변경하고 App으로 전송.
    //                     .then(() => {
    //                         props.sendLoginID(inputID);
    //                         props.sendLoginStatus(true);

    //                         // 작업 완료 되면 페이지 이동(새로고침).
    //                         document.location.href = '/'
    //                     })
    //                     // 에러가 발생했을 경우.
    //                     .catch(res => {
    //                         console.log(res);
    //                     })
    //             }
    //         })
    //         // 에러가 발생했을 경우.
    //         .catch(res => {
    //             alert(res.data.SystemMessage);
    //             props.sendLoginStatus(false);
    //         })
    //     }
    // }

    // 로그인 Event.
    const loginEvent = () => {
        // 정보 입력란이 하나라도 비어있으면 경고를 출력하고 기능 정지.
        if (inputID === '' || inputPW === '') {
            alert('아이디 혹은 비밀번호가 입력되지 않았습니다.');
        }
        // 그렇지 않으면 다음 작업으로 이동.
        else {
            axios.post('/prj05/member/login', {
                'memberid': inputID,
                'memberpwd': inputPW
            })
            .then(res => {
                console.log(res.data.SystemMassage);
                alert(res.data.SystemMassage);
            })
            .catch(res => {
                console.log(res.data.SystemMassage);
                alert(res.data.SystemMassage);             
            })
        }
    }

    return (
        <>
            <div className='login-pagebackground setcenter'>
                <div className='login-pageinner setcenter'>
                    <div className='login-formarea gifont'>
                        <div className='login-title setcenter'>
                            <h1>사용자 로그인</h1>
                        </div>
                        <div className='login-input'>
                            <input type='text' className='login-inputtag gifont' value={inputID} placeholder='아이디를 입력해주세요' onChange={(e) => {setInputID(e.target.value)}}/>
                            <input type='password' className='login-inputtag gifont' value={inputPW} placeholder='비밀번호를 입력해주세요' onChange={(e) => {setInputPW(e.target.value)}} autoComplete='off'/>
                            <div className='login-button'>
                                <button className='login-buttontag gifont' onClick={loginEvent}>로그인하기</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;