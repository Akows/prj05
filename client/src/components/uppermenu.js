import { Link } from 'react-router-dom';

import '../style/Uppermenu.css';
import '../style/GlobalStyle.css';

import { myContext } from '../App';
import { useContext } from 'react';

const Uppermenu = () => {

    const loginInfo = useContext(myContext);

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('loginstatus');
        localStorage.removeItem('whologin');
        document.location.href = '/'
    }

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