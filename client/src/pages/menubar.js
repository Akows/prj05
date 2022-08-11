import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { myContext } from '../App';

import '../style/Menubar.css';
import '../style/global.css';

// 최상단 App.js에서 로그인 여부가 검증되어 결과값으로 전달되어 옴.
// 결과값의 이름은 'isLogin'.
const Menubar = () => {

    const loginInfo = useContext(myContext);

    // 로그아웃 기능
    // 버튼을 클릭하면 sessionStorage에 있는 로그인 값 'MEMBER_ID'을 삭제하도록 한다.
    // alert으로 로그아웃 알림을 띄우고 document.location.href으로 새로고침하도록 한다.
    const logout = () => {
        sessionStorage.removeItem('MEMBER_ID');
        alert('로그아웃 되었습니다.');
        document.location.href = '/';
    }

    return (
        <>
            <div className='menubar-outer menubar-btu'>
                <div className='menubar-main menubar-btu'>
                    <Link to={'/'}>
                        <button className='menubar-button-big'>메인 페이지</button>
                    </Link>
                </div>

                <div className='menubar-menu menubar-btu'>
                    <Link to={'/api'}>
                        <button className='menubar-button-big'>API</button>
                    </Link>
                    <Link to={'/todolist'}>
                        <button className='menubar-button-big'>TodoList</button>
                    </Link>
                    <Link to={'/board'}>
                        <button className='menubar-button-big'>게시판</button>
                    </Link>
                </div>

                <div className='menubar-member menubar-btu'>
                    {loginInfo.isLogin ? 
                        <>
                            <Link to={'/member'} state={{ value: 'memberinfo' }}>
                                <button className='menubar-button-small'>회원정보</button>
                            </Link>

                            <button className='menubar-button-small' onClick={logout}>로그아웃</button>
                        </>
                    :
                        <>
                            <Link to={'/member'} state={{ value: 'memberlogin' }}>
                                <button className='menubar-button-small'>로그인</button>
                            </Link>
                            <Link to={'/member'} state={{ value: 'memberjoin' }}>
                                <button className='menubar-button-small'>회원가입</button>
                            </Link>
                        </>
                    }
                </div>
            </div>
        </>
    )
}

export default Menubar;