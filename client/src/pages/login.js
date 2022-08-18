import '../style/Login.css';
import '../style/GlobalStyle.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = (props) => {

    const [inputID, setInputID] = useState('');
    const [inputPW, setInputPW] = useState('');

    const loginEvent = () => {
        if (inputID === '' || inputPW === '') {
            alert('아이디 혹은 비밀번호가 입력되지 않았습니다.');
        }
        else {
            alert('아이디와 비밀번호가 모두 입력되었습니다.');
            console.log('inputID : ', inputID);
            console.log('inputPW : ', inputPW);

            const loginStatus = true;

            props.sendLoginStatus(loginStatus);
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
                        <form>
                            <div className='login-input'>
                                <input type='text' className='login-inputtag gifont' value={inputID} placeholder='아이디를 입력해주세요' onChange={(e) => {setInputID(e.target.value)}}/>
                                <input type='password' className='login-inputtag gifont' value={inputPW} placeholder='비밀번호를 입력해주세요' onChange={(e) => {setInputPW(e.target.value)}} autoComplete='off'/>
                                
                                <div className='login-button'>
                                    <button className='login-buttontag gifont' onClick={loginEvent}>로그인하기</button>
                                    <Link to={'/join'}>
                                    <button className='login-buttontag gifont'>회원가입하기</button>
                                    </Link>
                                    <Link to={'/'}>
                                    <button className='login-buttontag gifont'>비로그인사용</button>
                                    </Link>
                                </div>
                                
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;