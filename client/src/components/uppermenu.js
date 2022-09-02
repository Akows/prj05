import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { myContext } from '../App';

import '../style/Uppermenu.css';
import '../style/GlobalStyle.css';

const Uppermenu = () => {

    const loginInfo = useContext(myContext);

    const logout = () => {
        axios
        .get('/prj05/member/logout')
        .then(res => {
            alert(res.data.SystemMassage);
            document.location.href = '/'
        })
        .catch(res => {
            alert("Error!");
            document.location.href = '/'
        });
    }

    React.useEffect(() => {
        axios
        .get('/prj05/member/validation')
        .then(res => {
            loginInfo.setLoginStatus(true);
        })
        .catch(res => {
            alert(res.data.SystemMassage);
        });
    }, [loginInfo])

    return (
        <>
            <div className='menubar-upbarbackground setcenter'>

                <div className='menubar-mainbtuarea setcenter'>
                    <Link to={'/'}>
                    <button className='menubar-buttontag gifont'>메인으로</button>
                    </Link>
                </div>
                <div className='menubar-menubtuarea setcenter'>
                    <Link to={'/board'}>
                    <button className='menubar-buttontag gifont'>자유게시판</button>
                    </Link>
                    <Link to={'/todolist'}>
                    <button className='menubar-buttontag gifont'>TodoList</button>
                    </Link>
                    <Link to={'/api'}>
                    <button className='menubar-buttontag gifont'>API</button>
                    </Link>
                </div>
                <div className='menubar-memberbtuarea setcenter'>
                    {loginInfo.loginStatus !== true ?
                        <>
                        <Link to={'/login'}>
                        <button className='menubar-buttontag gifont'>로그인</button>
                        </Link>
                        <Link to={'/join'}>
                        <button className='menubar-buttontag gifont'>회원가입</button>
                        </Link>
                        </>
                    :
                        <>
                        <Link to={'/info'}>
                        <button className='menubar-buttontag gifont'>{loginInfo.whoIsLogin}</button>
                        </Link>
                        <Link to={''}>
                        <button className='menubar-buttontag gifont' onClick={logout}>로그아웃</button>
                        </Link>
                        </>               
                    }
                </div>
            </div>
        </>
    )
}

export default Uppermenu;