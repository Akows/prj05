import { useCallback, useRef, useState } from 'react';
import TodoListAdd from '../components/todoListAdd';
import TodoListBox from '../components/todoListBox';
import TodoListDate from '../components/todoListDate';
import '../style/Todolist.css';

const Todolist = () => {

    const [todos, setTodos] = useState([
        {
            id: 1,
            text: '리액트 공부하기',
            checked: false,
            important: false,
        },
        {
            id: 2,
            text: '도서관가서 책 빌리기',
            checked: false,
            important: false,
        },
        {
            id: 3,
            text: '방 청소하기',
            checked: false,
            important: false,
        },
    ]);
    
    const nextId = useRef(4);
    
    const onAdd = useCallback(text => {
        const todo = {
            id: nextId.current,
            text,
            checked: false,
        };
            setTodos(todos.concat(todo));
            nextId.current++;
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
            <div className='todolist-outer'>
                <div className='todolist-inner todolist-section'>
                    <div className='todolist-contentsbox'>

                        <h1>TodoList</h1>

                        <div className='todolist-listouter'>
                            <div className='todolist-menu'>
                                <TodoListDate todos={todos}/>
                            </div>

                            <div className='todolist-contents'>
                                <TodoListAdd onAdd={onAdd}/>

                                <TodoListBox
                                    todos={todos} 
                                    onRemove={onRemove} 
                                    onCheck={onCheck} 
                                    onImportant={onImportant} 
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