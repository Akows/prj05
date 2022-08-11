
import axios from 'axios';
import React from 'react';
import { useLocation } from 'react-router-dom';
import '../style/Boardview.css';

// App.js에서 로그인 여부와 로그인 한 사용자의 아이디 값이 넘어옴.
const Boardview = (props) => {

    const isLogin = props.isLogin;
    const whoLogin = props.whoLogin;

    // Generalforum에서 게시물 데이터를 가지고 오기위해 useLocation을 사용.
    const location = useLocation();

    // useLocation으로 가져온 데이터를 변수에 삽입.
    const boardNumber = location.state?.BOARD_NUMBER;
    const boardTitle = location.state?.BOARD_TITLE;
    const boardText = location.state?.BOARD_TEXT;
    const boardWriter = location.state?.BOARD_WRITER;
    const boardWritetime = location.state?.BOARD_WRITE_TIME;

    const setTimeinfo = '';

    const deleteboard = () => {
        axios
        .delete('/prj05/board/delete', null, {
            params: {
                'BOARD_NUMBER': boardNumber
            }
        })
        .then(res => {
            console.log(res)
            alert('글이 삭제되었습니다.');

            // 작업 완료 되면 페이지 이동(새로고침)
            document.location.href = '/'
        })
    };
    
    return (
        <>
            <div className='boardview-outer boardview-section'>
                <div className='boardview-inner boardview-section'>
                    <div className='boardview-boardviewform'>

                        <div className='boardview-sidemenu'>

                            <div className='boardview-sidemenu-title'>
                                <h1>글 보기</h1>

                                {isLogin ? 
                                    <h2>{whoLogin}</h2>
                                :
                                    <h2>익명(비로그인)</h2>
                                }

                                <h3>{setTimeinfo}</h3>

                            </div>

                            <div className='boardview-sidemenu-menubar'>

                                <div className='boardview-sidemenu-writemenu boardview-section'>
                                    <button className='boardview-sidemenu-writebtu' onClick={deleteboard}>글삭제</button>
                                </div>

                                <div className='boardview-sidemenu-writemenu boardview-section'>
                                    <button className='boardview-sidemenu-writebtu' onClick={''}>글수정</button>
                                </div>

                            </div>

                        </div>

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

                    </div>
                </div>
            </div>
        </>
    )
}

export default Boardview;   