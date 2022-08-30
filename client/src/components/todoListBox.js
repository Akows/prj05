import '../style/TodoListBox.css';

import TodoObject from './todoObject';

const TodoListBox = ({ todos, onRemove, onCheck, onImportant }) => {
    return (
        <div className='todolist-listbox'>
            {todos.map(todo => (
                <TodoObject
                todo={todo}
                key={todo.id}
                onRemove={onRemove}
                onCheck={onCheck}
                onImportant={onImportant}
                />
            ))}
        </div>
    )
}

export default TodoListBox;