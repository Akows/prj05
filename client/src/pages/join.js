import '../style/Join.css';
import '../style/GlobalStyle.css';
import { useState } from 'react';
import axios from 'axios';

const Join = () => {

    // 회원가입에 필요한 데이터를 변수로 제어할 useState 사용.
    const [inputID, setInputID] = useState('');
    const [inputPW, setInputPW] = useState('');
    const [inputName, setInputName] = useState('');
    const [inputEmail, setInputEmail] = useState('');

    // 회원가입 Event.
    const joinEvent = () => {
        // 정보 입력란이 하나라도 비어있으면 경고를 출력하고 기능 정지.
        if (inputID === '' || inputPW === '' || inputName === '' || inputEmail === '') {
            alert('회원가입에 필요한 모든 정보가 충족되지 않았습니다.');
        }
        // 그렇지 않으면 다음 작업으로 이동.
        else {
            // 비밀번호와 이메일 무결성 검사용 정규식.
            var checkPasswordExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,10}$/; 
            // eslint-disable-next-line
            var checkEmailExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
            
            // 정규식을 이용하여 입력한 비밀번호와 이메일을 검증.
            var checkPassword = checkPasswordExp.test(inputPW);
            var checkEmail = checkEmailExp.test(inputEmail);
    
            // 비밀번호 검증에 실패했을 경우 경고를 출력하고 작업 중단.
            if (checkPassword === false) {
                alert('비밀번호는 8-10자 영문, 숫자 조합으로만 가능합니다!');
            }
            // 이메일 검증에도 실패했을 경우 경고를 출력하고 작업 중단.
            else if (checkEmail === false) {
                alert('유효하지 않은 이메일 주소입니다!');
            }
            // 그렇지 않으면 회원가입 절차를 실행.
            else {
                axios.post('/prj05/member/register', {
                    'memberid': inputID,
                    'memberpwd': inputPW,
                    'membername': inputName,
                    'memberemail': inputEmail
                })
                // 작업이 완료되거나 완료되지 않았을 경우 알림 문구를 출력한다.
                // 이후 로그인 페이지로 이동하거나, 회원가입 페이지를 새로고침한다.
                .then(res => {
                    console.log(res.data.SystemMassage);
                    alert(res.data.SystemMassage);
                    document.location.href = '/';
                })
                .catch(res => {
                    console.log(res.data.SystemMassage);
                    alert(res.data.SystemMassage);
                    document.location.href = '/join';
                })
            }
        }
    }

    return (
        <>
            <div className='join-pagebackground setcenter'>
                <div className='join-pageinner setcenter'>
                    <div className='join-formarea gifont'>
                        <div className='join-title setcenter'>
                            <h1>회원가입</h1>
                        </div>
                        <div className='join-input'>
                                <input type='text' className='join-inputtag gifont' value={inputID} placeholder='아이디를 입력해주세요' onChange={(e) => {setInputID(e.target.value)}}/>
                                <input type='password' className='join-inputtag gifont' value={inputPW} placeholder='비밀번호를 입력해주세요' onChange={(e) => {setInputPW(e.target.value)}} autoComplete='off'/>
                                <input type='text' className='join-inputtag gifont' value={inputName} placeholder='이름을 입력해주세요' onChange={(e) => {setInputName(e.target.value)}}/>
                                <input type='text' className='join-inputtag gifont' value={inputEmail} placeholder='이메일 주소를 입력해주세요' onChange={(e) => {setInputEmail(e.target.value)}}/>
                                <button className='join-buttontag gifont' onClick={joinEvent}>회원가입</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Join;