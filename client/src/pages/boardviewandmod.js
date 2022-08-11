
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { myContext } from '../App';

import '../style/BoardViewandMod.css';

// App.js에서 로그인 여부와 로그인 한 사용자의 아이디 값이 넘어옴.
const BoardViewandMod = () => {
    const loginInfo = useContext(myContext);

    // Generalforum에서 게시물 데이터를 가지고 오기위해 useLocation을 사용.
    const location = useLocation();

    const [isModify, setIsModify] = useState(false);
    const [boardTitle, setBoardTitle] = useState(location.state?.BOARD_TITLE);
    const [boardText, setBoardText] = useState(location.state?.BOARD_TEXT);

    // useLocation으로 가져온 데이터를 변수에 삽입.
    const boardNumber = location.state?.BOARD_NUMBER;
    const boardWriter = location.state?.BOARD_WRITER;
    const boardWritetime = location.state?.BOARD_WRITE_TIME;

    const setTimeinfo = '';

    // 정확한 입력값을 체크하기 위해서 입력창의 값이 변하는 순간마다 값을 갱신, useState로 변수에 SET하도록 함.
    const handleInputTitle = (e) => {
        setBoardTitle(e.target.value)
    }

    const handleInputText = (e) => {
        setBoardText(e.target.value)
    }

    const deleteboard = () => {
        axios
        .delete('/prj05/board/delete', {
            params: {
                'BOARD_NUMBER': boardNumber
            }
        })
        .then(res => {
            console.log(res)
            alert('글이 삭제되었습니다.');

            // 작업 완료 되면 페이지 이동(새로고침)
            document.location.href = '/board'
        })
    };

    const modifyboard = () => {
        axios
        .put('/prj05/board/modify', null, {
            params: {
                'BOARD_TITLE': boardTitle,
                'BOARD_TEXT': boardText,
                'BOARD_NUMBER': boardNumber
            }
        })
        .then(res => {
            // 작업 완료 되면 메시지 알람 띄움.
            alert(res.data.SystemMessage);
            // 작업 완료 되면 페이지 이동(새로고침).
            document.location.href = '/board'
        })
        .catch(error => {
            console.log(error);
        })
    }

    const changemodify = () => {
        setIsModify(true);
    };
    
    return (
        <>
            <div className='boardview-outer boardview-section'>
                <div className='boardview-inner boardview-section'>
                    <div className='boardview-boardviewform'>
                        <div className='boardview-sidemenu'>
                            <div className='boardview-sidemenu-title'>
                                <h1>글 보기</h1>

                                {loginInfo.isLogin ? 
                                    <h2>{loginInfo.whoLogin}</h2>
                                :
                                    <h2>익명(비로그인)</h2>
                                }

                                <h3>{setTimeinfo}</h3>

                            </div>
                            <div className='boardview-sidemenu-menubar'>
                                {loginInfo.whoLogin === boardWriter ?
                                    <div className='boardview-sidemenu-writemenu boardview-section'>
                                        <button className='boardview-sidemenu-writebtu' onClick={deleteboard}>글삭제</button>
                                    </div>
                                    :
                                    <div className='boardview-sidemenu-writemenu boardview-section'>
                                        <button className='boardview-sidemenu-writebtu'>삭제권한없음</button>
                                    </div>
                                }

                                {loginInfo.whoLogin === boardWriter ?
                                    <div className='boardview-sidemenu-writemenu boardview-section'>
                                        <button className='boardview-sidemenu-writebtu' onClick={changemodify}>글수정</button>
                                    </div>
                                    :
                                    <div className='boardview-sidemenu-writemenu boardview-section'>
                                        <button className='boardview-sidemenu-writebtu'>수정권한없음</button>
                                    </div>
                                }
                            </div>
                        </div>

                        {isModify ? 
                            <div className='boardview-contents'>
                                <div className='boardview-contents-viewerinfo'>
                                    <div className='boardview-contents-number'>
                                        {boardNumber}
                                    </div>
                                    <div className='boardview-contents-title boardview-section'>
                                        <input defaultValue={boardTitle} onChange={handleInputTitle}/>
                                    </div>
                                    <div className='boardview-contents-writer'>
                                        {boardWriter}
                                    </div>
                                    <div className='boardview-contents-writetime'>
                                        {boardWritetime}
                                    </div>
                                </div>
                                <div className='boardview-contents-viewertext boardview-section'>
                                    <div className='boardview-contents-text boardview-section'>
                                        <input defaultValue={boardText} onChange={handleInputText}/>
                                    </div>
                                </div>
                                <div className='boardview-contents-submitbutton'>
                                    <button className='boardview-contents-submitbtn' type='button' onClick={modifyboard}>수정하기</button>
                                </div>
                            </div>
                        :
                            <div className='boardview-contents'>
                                <div className='boardview-contents-viewerinfo'>
                                    <div className='boardview-contents-number'>
                                        {boardNumber}
                                    </div>
                                    <div className='boardview-contents-title'>
                                        {boardTitle}
                                    </div>
                                    <div className='boardview-contents-writer'>
                                        {boardWriter}
                                    </div>
                                    <div className='boardview-contents-writetime'>
                                        {boardWritetime}
                                    </div>
                                </div>
                                <div className='boardview-contents-viewertext boardview-section'>
                                    <div className='boardview-contents-text'>
                                        {boardText}
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default BoardViewandMod;   