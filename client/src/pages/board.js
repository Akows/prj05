import React, { useState } from "react";
import axios from 'axios';

import '../style/Board.css';

const Board = () => {

    const [boarddata, setBoarddata] = useState([]);

    const dbtablemake = () => {
        axios
        .post('/prj05/board/create')
        .then(res => 
            console.log(res.data)
        );
    };

    const dbtableselect = () => {
        axios
        .get('/prj05/board/select')
        .then(res => {
            setBoarddata(res.data);
            console.log(res.data);
        });
    };

    const dbtableinsert = () => {
        axios
        .post('/prj05/board/insert')
        .then(res => {
            console.log(res.data);
        });
    };

    const dbtablewrite = () => {
        axios
        .post('/prj05/board/write')
        .then(res => {
            console.log(res.data);
        });
    };

    return (
        <>
            <div className='board-outer'>

                <div className='board-inner-sidemenu'>
                    <button className='board-inner-sidemenu-button' onClick={dbtablemake}>
                        DB에 테이블 생성하기
                    </button>

                    <button className='board-inner-sidemenu-button' onClick={dbtableselect}>
                        게시판 데이터 가져오기
                    </button>

                    <button className='board-inner-sidemenu-button' onClick={dbtableinsert}>
                        게시판 임시데이터 삽입
                    </button>

                    <div className='board-inner-sidemenu-writeform'>
                        <input/>

                        <br/>

                        <input/>

                        <br/>

                        <button onClick={dbtablewrite}>
                            글 작성
                        </button>
                    </div>




                </div>

                <div className='board-inner-boardcontents'>

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
        </>
    )
}

export default Board;