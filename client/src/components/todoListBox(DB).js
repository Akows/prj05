import '../style/TodoListBox.css';

import TodoObjectDB from './todoObject(DB)';

const TodoListBoxDB = ( props ) => {
    return (
        <div className='todolist-listbox'>
            {props.todosDB && props.todosDB.datas?.map(item => {
                return (
                    <div key={item.TODO_NUMBER}>
                        <TodoObjectDB todo={item}/>
                    </div>
                )
            })}
        </div>
    )
}

export default TodoListBoxDB;