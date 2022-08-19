import '../style/Login.css';
import '../style/GlobalStyle.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Login = (props) => {

    // 로그인에 필요한 데이터를 변수로 제어할 useState 사용.
    const [inputID, setInputID] = useState('');
    const [inputPW, setInputPW] = useState('');


    // 로그인 Event.
    const loginEvent = () => {
        // 정보 입력란이 하나라도 비어있으면 경고를 출력하고 기능 정지.
        if (inputID === '' || inputPW === '') {
            alert('아이디 혹은 비밀번호가 입력되지 않았습니다.');
        }
        // 그렇지 않으면 다음 작업으로 이동.
        else {
            axios.post('/prj05/member/login', null, {
                params: {
                    'MEMBER_ID': inputID,
                    'MEMBER_PW': inputPW
                }
            })
            // 작업이 완료되었을 경우, 로그인 값과 사용자 이름을 상단 App으로 전송.
            .then(res => {
                // 인증이 실패한 경우
                if (!res.data.auth) {
                    props.sendLoginStatus(false);
                }
                // 인증이 성공한 경우
                else {
                    localStorage.setItem('token', res.data.token);
                    props.sendLoginStatus(true);
                }
            })
            // 에러가 발생하였을 경우, 로그인 값을 상단 App으로 전송
            .catch(res => {
                alert(res.data.SystemMessage);
                props.sendLoginStatus(false);
            })
        }
    }

    // 비로그인 사용시 로그인 값과 사용자 이름을 상단 App으로 전송하는 함수.
    const anonymousUse = () => {
        props.sendLoginStatus(true);
        props.sendLoginID('비로그인사용자');
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
                                <Link to={'/join'}>
                                <button className='login-buttontag gifont'>회원가입하기</button>
                                </Link>
                                <Link to={'/main'}>
                                <button className='login-buttontag gifont' onClick={anonymousUse}>비로그인사용</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;