import React, { useCallback, useContext, useRef, useState } from 'react';
import axios from 'axios';

import { myContext } from '../App';

import TodoListAdd from '../components/todoListAdd';
import TodoListBox from '../components/todoListBox';
import TodoListDate from '../components/todoListDate';
import Pagination from '../components/pagination';
import TodoListAddDB from '../components/todoListAdd(DB)';
import TodoListBoxDB from '../components/todoListBox(DB)';

import '../style/Todolist.css';
import '../style/GlobalStyle.css';
import TodoListDateDB from '../components/todoListDate(DB)';

const Todolist = () => {
    // contextAPI를 사용.
    const contextApi = useContext(myContext);

    // Todolist는 DB버전와 No DB버전으로 나누어 구현할 것임.
    // No DB버전은 리액트만 사용하여 구현하는 Todolist.
    // DB버전은 MariaDB를 사용하여 구현하는 Todolist임.

    // DB버전 TodoList 로직.
    // DB버전 TodoList 로직.

    // 두 버전화면을 전환하는데 사용할 변수를 제어.
    const [componentValue, setComponentValue] = useState("DB");

    // 회원 아이디를 제어하는 변수
    const [memberId, setMemberId] = useState("NoDB");

    // Todolist 정보를 담는 변수.
    const [todosDB, setTodosDB] = useState([]);
    // Todolist 정보를 담는 변수.
    const [todosDBCount, setTodosDBCount] = useState([]);

    // 로딩 제어 변수.
    const [loading, setLoading] = useState(false);

    // 화면 전환을 제어하는 onClick 함수들.
    const toDBVersion = () => {
        setComponentValue("DB");
    }
    const toNoDBVersion = () => {
        setComponentValue("NoDB");
    } 

    React.useEffect(() => {
        // 로그인 검증 실시.
        contextApi.loginCheck();

        if(!contextApi.loginStatus) {
            // console.log("회원정보 검증이 실패하였습니다.");
        }
        // 검증에 통과하였을 경우 contextApi를 이용하여 setMemberId.
        setMemberId(contextApi.whoIsLogin);

        // Todolist 데이터를 조회.
        axios.post('/prj05/todo/showtodo', {
            'memberId': memberId
        })
        .then((res) => {
            axios.post('/prj05/todo/getpostcount', {
                'memberId': memberId
            })
            .then((res) => {
                setTodosDBCount(res.data.datas[0].TODO_COUNT);
            })

            setTodosDB(res.data);   
            setLoading(true);
        })
        .catch((res) => {
            console.log(res.data.SystemMassage);
        });
    }, [contextApi, memberId])

    // No DB버전 TodoList 로직.
    // No DB버전 TodoList 로직.
    const [todos, setTodos] = useState([
        {
            id: 1,
            text: '11',
            checked: false,
            important: false,
        },
        {
            id: 2,
            text: '22',
            checked: false,
            important: false,
        },
        {
            id: 3,
            text: '33',
            checked: false,
            important: false,
        },
    ]);

    const nextId = useRef(14);
    
    const onAdd = useCallback(text => {
        const todo = {
            id: nextId.current,
            text,
            checked: false,
        };

        if(text.length > 36) {
            alert("입력 가능한 최대 글자수는 35자입니다.");
        }
        else {
            setTodos(todos.concat(todo));
            nextId.current++;
        }
        }, [todos]);

    const onCheck = useCallback(
        id => {setTodos(todos.map(todo => 
            todo.id === id 
            ? 
                { ...todo, checked: !todo.checked } 
            : 
                todo
            )
        );
        }, [todos]);
    
    const onRemove = useCallback(
        id => {
        setTodos(todos.filter(todo => todo.id !== id)); // 클릭되지 않은 나머지만 추출하여 새로운 배열 생성
        }, [todos]);
    
    const onImportant = useCallback(
        id => {
        setTodos(
            todos.map(todo =>
            todo.id === id ? { ...todo, important: !todo.important } : todo)
        );
    }, [todos]);


    // 페이지네이션 로직
    // 페이지네이션 로직

    // 현재 페이지를 제어할 변수 (가장 처음으로 보여질 페이지)
    const [currentPage, setCurrentPage] = useState(1);
    // 페이지 당 요소 갯수를 제어할 변수
    const [postPerPage] = useState(5);

    // Get current posts
    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;
    const currentPosts = todos.slice(indexOfFirstPost, indexOfLastPost);
    const currentDBPosts = todosDB.datas?.slice(indexOfFirstPost, indexOfLastPost);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <>
            {componentValue === "NoDB" ?
                <div className='tdl-pagebackground setcenter'>
                    <div className='tdl-pageinner setcenter'>
                        <div className='tdl-tdlarea setcenter gifont'>

                            <div className='tdl-sidebar'>

                                <div className='tdl-sidetitle'>
                                    <h1>TodoList(No DB)</h1>
                                </div>

                                <div className='tdl-sideutil'>
                                    <TodoListDate todos={todos}/>
                                </div>

                                <div className='tdl-sidebtu'>
                                    <button className='tdl-changebtu gifont' onClick={toDBVersion}>DB 버전으로 전환</button>
                                </div>

                            </div>

                            <div className='tdl-contents'>
                                <div className='tdl-addtdl'>
                                    <TodoListAdd onAdd={onAdd}/>
                                </div>
                                <div className='tdl-showtdl'>
                                    <TodoListBox
                                            todos={currentPosts} 
                                            onRemove={onRemove} 
                                            onCheck={onCheck} 
                                            onImportant={onImportant} 
                                        />
                                </div>
                                <div className='tdl-pagenation'>
                                    <Pagination
                                        postsPerPage={postPerPage}
                                        totalPosts={todos.length}
                                        paginate={paginate}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            :
                <div className='tdl-pagebackground setcenter'>
                    <div className='tdl-pageinner setcenter'>
                        <div className='tdl-tdlarea setcenter gifont'>

                            <div className='tdl-sidebar'>

                                <div className='tdl-sidetitle'>
                                    <h1>TodoList(DB)</h1>
                                </div>

                                <div className='tdl-sideutil'>
                                    <TodoListDateDB todos={todosDB}/>
                                </div>

                                <div className='tdl-sidebtu'>
                                    <button className='tdl-changebtu gifont' onClick={toNoDBVersion}>No DB 버전으로 전환</button>
                                </div>

                            </div>

                            <div className='tdl-contents'>
                                {contextApi.loginStatus ? 
                                    <>
                                        <div className='tdl-addtdl'>
                                            <TodoListAddDB memberId={memberId}/>
                                        </div>
                                        <div className='tdl-showtdl'>
                                            {!loading ?
                                                <>
                                                    <div className='todolist-loadbox'>
                                                        <h1>Loading...</h1>
                                                    </div>
                                                </>
                                            :
                                                <>
                                                    <TodoListBoxDB todosDB={currentDBPosts}/>
                                                </>
                                            }

                                        </div>
                                        <div className='tdl-pagenation'>
                                            <Pagination
                                                postsPerPage={postPerPage}
                                                totalPosts={todosDBCount}
                                                paginate={paginate}
                                            />
                                        </div>
                                    </>
                                    :
                                    <>
                                        <div className='tdl-showtdl'>
                                            <h1>본 기능은 회원전용 기능입니다.</h1>
                                        </div>
                                    </>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default Todolist;