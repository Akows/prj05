import axios from 'axios';
import React, { useContext, useMemo, useState } from 'react';
import { myContext } from '../App';

import BoardWrite from '../components/boardwrite';
import Boardlist from '../components/boardlist';

import '../style/Board.css';

// App.js에서 로그인 여부와 로그인 한 사용자의 아이디 값이 넘어옴.
const Board = () => {
    const loginInfo = useContext(myContext);

    const [boarddata, setBoarddata] = useState([]);
    const [componentvalue, setComponentvalue] = useState('list');

    React.useEffect(() => {
        axios
        .get('/prj05/board/select')
        .then(res => {
            setBoarddata(res.data);
            // console.log(res.data);
        });
    }, [])

    const setTimeinfo = useMemo(e => {
        let today = new Date();

        let time = {
            year: today.getFullYear(),  //현재 년도
            month: today.getMonth() + 1, // 현재 월
            date: today.getDate(), // 현제 날짜
            hours: today.getHours(), //현재 시간
            minutes: today.getMinutes(), //현재 분
        };
    
        let timestring = `${time.year}년 ${time.month}월 ${time.date}일 ${time.hours}시 ${time.minutes}분`;

        return timestring;
    }, []);

    const showboardlist = () => {
        setComponentvalue('list');
    };

    const showboardcreate = () => {
        setComponentvalue('create');
    };

    return (
        <>
            <div className='board-outer board-section'>
                <div className='board-inner board-section'>
                    <div className='board-boardform'>

                        <div className='board-sidemenu'>

                            <div className='board-sidemenu-title'>
                                <h1>자유게시판</h1>

                                {loginInfo.isLogin ? 
                                    <h2>{loginInfo.whoLogin}</h2>
                                :
                                    <h2>익명(비로그인)</h2>
                                }

                                <h3>{setTimeinfo}</h3>

                            </div>

                            <div className='board-sidemenu-menubar'>

                                <div className='board-sidemenu-writemenu board-section'>
                                    <button className='board-sidemenu-writebtu' onClick={showboardlist}>글목록</button>
                                </div>

                                <div className='board-sidemenu-writemenu board-section'>
                                    <button className='board-sidemenu-writebtu' onClick={showboardcreate}>글쓰기</button>
                                </div>

                            </div>

                        </div>

                        <div className='board-contents board-section'>
                            {componentvalue === 'list' ? 
                                <Boardlist boarddata={boarddata}/>
                            :
                                <BoardWrite whoLogin={loginInfo.whoLogin}/>
                            }
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Board;