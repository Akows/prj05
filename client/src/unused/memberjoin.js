
import axios from 'axios';
import { useState } from 'react';

import '../style/MemberJoin.css';

const MemberJoin = () => {

    const [inputID, setInputID] = useState('')
    const [inputPW, setInputPW] = useState('')
    const [inputName, setInputName] = useState('')
    const [inputEMail, setInputEMail] = useState('')

    // 정확한 입력값을 체크하기 위해서 입력창의 값이 변하는 순간마다 값을 갱신, useState로 변수에 SET하도록 함.
    const handleInputID = (e) => {
        setInputID(e.target.value);
    }
    const handleInputPW = (e) => {
        setInputPW(e.target.value);
    }
    const handleInputName = (e) => {
        setInputName(e.target.value);
    }
    const handleInputEMail = (e) => {
        setInputEMail(e.target.value);
    }

    const memberjoin = () => {

        var checkPasswordExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,10}$/;
        var checkEmailExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
        
        var checkPassword = checkPasswordExp.test(inputPW);
        var checkEmail = checkEmailExp.test(inputEMail);

        if (checkPassword === false)
            alert('비밀번호는 8-10자 영문, 숫자 조합으로만 가능합니다!');
        else if (checkEmail === false)
            alert('유효하지 않은 이메일 주소입니다!');
        else
            axios.post('/prj05/member/join', null, {
                params: {
                    'MEMBER_ID': inputID,
                    'MEMBER_PW': inputPW,
                    'MEMBER_NAME': inputName,
                    'MEMBER_EMAIL': inputEMail
                }
            })
            .then(res => {
                console.log(res)
                alert('회원가입이 완료되었습니다.');

                // 작업 완료 되면 페이지 이동(새로고침)
                document.location.href = '/'
            })
    }
    
    return (
        <>
            <div className='join-outer join-section'>
                <div className='join-inner join-section'>
                    <div className='join-joinform'>
                        <div className='join-joinform-title'>
                            <h2>회원가입</h2>
                        </div>
                        <div className='join-joinform-input'>
                            <div className='join-joinform-idpwinput'>
                                <label htmlFor='inputid'>ID : </label>
                                <input type='text' name='inputid' value={inputID} onChange={handleInputID} />
                            </div>
                            <div className='join-joinform-idpwinput'>
                                <label htmlFor='inputpw'>PW : </label>
                                <input type='password' name='inputpw' value={inputPW} onChange={handleInputPW} />
                            </div>
                            <div className='join-joinform-idpwinput'>
                                <label htmlFor='inputname'>Name : </label>
                                <input type='text' name='inputname' value={inputName} onChange={handleInputName} />
                            </div>
                            <div className='join-joinform-idpwinput'>
                                <label htmlFor='inputemail'>EMail : </label>
                                <input type='text' name='inputemail' value={inputEMail} onChange={handleInputEMail} />
                            </div>
                        </div>
                        <div className='join-joinform-submitbutton'>
                            <div className='join-joinform-submitbtu'>
                                <button type='button' onClick={memberjoin}>회원가입</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MemberJoin;