import axios from "axios";
import { useState } from "react"

import '../style/MemberLogin.css';

const MemberLogin = () => {

    const [inputID, setInputID] = useState('')
    const [inputPW, setInputPW] = useState('')

    const [loginStatus, setLoginStatus] = useState(false);

    // 정확한 입력값을 체크하기 위해서 입력창의 값이 변하는 순간마다 값을 갱신, useState로 변수에 SET하도록 함.
    const handleInputId = (e) => {
        setInputID(e.target.value)
    }

    const handleInputPw = (e) => {
        setInputPW(e.target.value)
    }

    // 아이디와 비밀번호를 입력하고 로그인 버튼을 클릭하면 작동되는 함수.
    const onClickLogin = () => {
        axios
        .post('/prj05/member/login', null, {
            params: {
                'MEMBER_ID': inputID,
                'MEMBER_PW': inputPW
            }
        })
        .then(res => {
            alert(res.data.SystemMessage);
            setLoginStatus(true);
            console.log('loginStatus, ', loginStatus);
            // if (res.data.MEMBERID === undefined) {
            //     alert(res.data.SystemMessage);
            // } 

            // else if (res.data.MEMBERID === null) {
            //     alert('잘못된 비밀번호입니다')

            // } 
            // else if (res.data.MEMBERID === inputID) {
            //     sessionStorage.setItem('MEMBER_ID', inputID);
            //     alert('로그인 성공.');
            // }
            // // 작업 완료 되면 페이지 이동(새로고침)
            // document.location.href = '/'


        })
        .catch(res => {
            alert(res.data.SystemMessage);
            setLoginStatus(false);
        })
    }

    return (
        <>
            <div className='login-outer login-section'>
                <div className='login-inner login-section'>
                    <div className='login-loginform'>
                        <div className='login-loginform-title'>
                            <h2>로그인</h2>
                        </div>
                        <div className='login-loginform-input'>
                            <div className='login-loginform-idpwinput'>
                                <label htmlFor='inputid'>ID : </label>
                                <input type='text' name='inputid' value={inputID} onChange={handleInputId} />
                            </div>
                            <div className='login-loginform-idpwinput'>
                                <label htmlFor='inputpw'>PW : </label>
                                <input type='password' name='inputpw' value={inputPW} onChange={handleInputPw} />
                            </div>
                        </div>
                        <div className='login-loginform-submitbutton'>
                            <div className='login-loginform-submitbtu'>
                                <button type='button' onClick={onClickLogin}>Login</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MemberLogin;
