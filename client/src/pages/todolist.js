import React, { useCallback, useRef, useState } from 'react';

import TodoListAdd from '../components/todoListAdd';
import TodoListBox from '../components/todoListBox';
import TodoListDate from '../components/todoListDate';

import '../style/Todolist.css';
import '../style/GlobalStyle.css';
import Pagination from '../components/pagination';

const Todolist = () => {

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
        {
            id: 4,
            text: '44',
            checked: false,
            important: false,
        },
        {
            id: 5,
            text: '55',
            checked: false,
            important: false,
        },
        {
            id: 6,
            text: '66',
            checked: false,
            important: false,
        },
        {
            id: 7,
            text: '77',
            checked: false,
            important: false,
        },
        {
            id: 8,
            text: '88',
            checked: false,
            important: false,
        },
        {
            id: 9,
            text: '99',
            checked: false,
            important: false,
        },
        {
            id: 10,
            text: '1010',
            checked: false,
            important: false,
        },
        {
            id: 11,
            text: '1111',
            checked: false,
            important: false,
        },
        {
            id: 12,
            text: '1212',
            checked: false,
            important: false,
        },
        {
            id: 13,
            text: '1313',
            checked: false,
            important: false,
        },
    ]);

    // 페이지네이션
    // 현재 페이지를 제어할 변수 (가장 처음으로 보여질 페이지)
    const [currentPage, setCurrentPage] = useState(1);
    // 페이지 당 요소 갯수를 제어할 변수
    const [postPerPage] = useState(5);

    // Get current posts
    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;
    const currentPosts = todos.slice(indexOfFirstPost, indexOfLastPost);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

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



    return (
        <>
            <div className='tdl-pagebackground setcenter'>
                <div className='tdl-pageinner setcenter'>
                    <div className='tdl-tdlarea setcenter gifont'>

                        <div className='tdl-sidebar'>

                            <h1>TodoList</h1>

                            <div className='tdl-sideutil'>
                                <TodoListDate todos={todos}/>
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
        </>
    )
}

export default Todolist;