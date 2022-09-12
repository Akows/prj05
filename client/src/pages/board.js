import React, { useContext, useMemo, useState } from 'react';
import { myContext } from '../App';
import axios from 'axios';

import '../style/Board.css';
import '../style/GlobalStyle.css';

import BoardWrite from '../components/boardwrite';
import BoardList from '../components/boardlist';
import Pagination from '../components/pagination';

const Board = () => {
    const contextApi = useContext(myContext);

    const [boarddata, setBoarddata] = useState([]);
    const [componentvalue, setComponentvalue] = useState('list');

    React.useEffect(() => {
        axios
        .get('/prj05/board/select')
        .then(res => {
            setBoarddata(res.data);
            // console.log(res.data.datas);
        });
    }, [])

    const setTimeinfo = useMemo(e => {
        let today = new Date();

        let time = {
            year: today.getFullYear(),  //현재 년도
            month: today.getMonth() + 1, // 현재 월
            date: today.getDate(), // 현제 날짜
            // hours: today.getHours(), //현재 시간
            // minutes: today.getMinutes(), //현재 분
        };
    
        let timestring = `${time.year}년 ${time.month}월 ${time.date}일`;

        return timestring;
    }, []);

    const showboardlist = () => {
        setComponentvalue('list');
    };

    const showboardcreate = () => {
        setComponentvalue('create');
    };

    // 페이지네이션 로직
    // 페이지네이션 로직

    // 현재 페이지를 제어할 변수 (가장 처음으로 보여질 페이지)
    const [currentPage, setCurrentPage] = useState(1);
    // 페이지 당 요소 갯수를 제어할 변수
    const [postPerPage] = useState(7);

    // Get current posts
    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;
    const currentPosts = boarddata.datas?.slice(indexOfFirstPost, indexOfLastPost);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <>
                <div className='bod-pagebackground setcenter'>
                    <div className='bod-pageinner setcenter'>
                        <div className='bod-bodarea setcenter gifont'>

                            <div className='bod-sidebar'>

                                <div className='bod-sidetitle'>
                                    <h1>자유게시판</h1>
                                </div>

                                <div className='bod-sideutil'>
                                    {contextApi.loginStatus ? 
                                        <h2>{contextApi.whoIsLogin}</h2>
                                    :
                                        <h2>익명(비로그인)</h2>
                                    }

                                    <h3>{setTimeinfo}</h3>
                                </div>

                                <div className='bod-sidebtu'>
                                    <button className='bod-changebtu gifont' onClick={showboardlist}>글 목록 보기</button>
                                    <button className='bod-changebtu gifont' onClick={showboardcreate}>글 쓰기</button>
                                </div>

                            </div>

                            <div className='bod-contents'>
                                <div className='bod-addbod'>
                                    <div className='bod-contents-boarddes'>
                                        <div className='bod-contents-boarddesnumber bod-conts-boddespubcss'>
                                            <h3>글번호</h3>   
                                        </div>
                                        <div className='bod-contents-boarddestitle bod-conts-boddespubcss'>
                                            <h3>제목</h3>
                                        </div>
                                        <div className='bod-contents-boarddeswriter bod-conts-boddespubcss'>
                                            <h3>작성자</h3>
                                        </div>
                                        <div className='bod-contents-boarddeswritetime bod-conts-boddespubcss'>
                                            <h3>작성시간</h3>
                                        </div>
                                    </div>
                                </div>
                                <div className='bod-showbod'>
                                    {componentvalue === 'list' ? 
                                        <BoardList boarddata={currentPosts}/>
                                    :
                                        <BoardWrite whoLogin={contextApi.whoIsLogin}/>
                                    }
                                </div>
                                <div className='bod-pagenation'>
                                    <Pagination
                                        postsPerPage={postPerPage}
                                        totalPosts={boarddata.datas?.length}
                                        paginate={paginate}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </>
    )
}

export default Board;