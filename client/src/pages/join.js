import '../style/Join.css';
import '../style/GlobalStyle.css';
import { useState } from 'react';

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
        // 그렇지 않으면 회원가입 절차를 실행.
        else {
            alert('회원가입이 완료되었습니다.');
            console.log('inputID : ', inputID);
            console.log('inputPW : ', inputPW);
            console.log('inputName : ', inputName);
            console.log('inputEmail : ', inputEmail);
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
                        <form>
                            <div className='join-input'>
                                <input type='text' className='join-inputtag gifont' value={inputID} placeholder='아이디를 입력해주세요' onChange={(e) => {setInputID(e.target.value)}}/>
                                <input type='password' className='join-inputtag gifont' value={inputPW} placeholder='비밀번호를 입력해주세요' onChange={(e) => {setInputPW(e.target.value)}} autoComplete='off'/>
                                <input type='text' className='join-inputtag gifont' value={inputName} placeholder='이름을 입력해주세요' onChange={(e) => {setInputName(e.target.value)}}/>
                                <input type='text' className='join-inputtag gifont' value={inputEmail} placeholder='이메일 주소를 입력해주세요' onChange={(e) => {setInputEmail(e.target.value)}}/>
                                <button className='join-buttontag gifont' onClick={joinEvent}>회원가입</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Join;