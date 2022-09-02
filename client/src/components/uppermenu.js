import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { myContext } from '../App';

import '../style/Uppermenu.css';
import '../style/GlobalStyle.css';

const Uppermenu = () => {

    const contextApi = useContext(myContext);

    const logout = () => {
        axios
        .get('/prj05/member/logout')
        .then(res => {
            localStorage.removeItem("MEMBER_ID");
            sessionStorage.removeItem("MEMBER_NAME", res.data.MEMBER_NAME);
            sessionStorage.removeItem("MEMBER_EMAIL", res.data.MEMBER_EMAIL);
            sessionStorage.removeItem("MEMBER_JOINDATE", res.data.MEMBER_JOINDATE);
            alert(res.data.SystemMassage);
            document.location.href = '/'
        })
        .catch(() => {
            alert("Error!");
            document.location.href = '/'
        });
    }

    React.useEffect(() => {
        contextApi.loginCheck();
    });

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
                    {contextApi.loginStatus !== true ?
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
                        <button className='menubar-buttontag gifont'>{contextApi.whoIsLogin}</button>
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