import axios from 'axios';
import { useState } from 'react';
import '../style/Board.css';

// App.js에서 로그인 여부와 로그인 한 사용자의 아이디 값이 넘어옴.
const Board = (props) => {

    const [boarddata, setBoarddata] = useState([]);

    const dbtableselect = () => {
        axios
        .get('/prj05/board/select')
        .then(res => {
            setBoarddata(res.data);
            console.log(res.data);
        });
    };

    let today = new Date();

    let time = {
      year: today.getFullYear(),  //현재 년도
      month: today.getMonth() + 1, // 현재 월
      date: today.getDate(), // 현제 날짜
      hours: today.getHours(), //현재 시간
      minutes: today.getMinutes(), //현재 분
    };

    let timestring = `${time.year}년 ${time.month}월 ${time.date}일`;
    let timestring2 = `${time.hours}시 ${time.minutes}분`;

    return (
        <>
            <div className='board-outer board-section'>
                <div className='board-inner board-section'>
                    <div className='board-boardform'>

                        <div className='board-sidemenu'>

                            <div className='board-sidemenu-title'>
                                <h1>자유게시판</h1>

                                {props.isLogin ? 
                                    <h2>{props.whoLogin}</h2>
                                :
                                    <h2>익명(비로그인)</h2>
                                }

                                <h3>{timestring}</h3>

                                <h3>{timestring2}</h3>

                            </div>

                            <div className='board-sidemenu-menubar'>

                                <div className='board-sidemenu-writemenu board-section'>
                                    <button className='board-sidemenu-writebtu'>글쓰기</button>
                                </div>

                            </div>

                        </div>

                        <div className='board-contents board-section'>


                            <div className='board-contents-board'>

                                <div className='board-contents-boarddes'>
                                    <></>
                                </div>

                                {boarddata && boarddata.datas?.map(item => {
                                    return (
                                        <div key={item.BOARD_NUMBER}>
                                            <div className='board-inner-boardcontents-title'>
                                                {item.BOARD_NUMBER} <br/>
                                                {item.BOARD_TITLE}
                                            </div>

                                            <div className='board-inner-boardcontents-context'>
                                                {item.BOARD_TEXT}
                                            </div>
                                        </div>
                                    );
                                })}

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Board;