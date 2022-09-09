import '../style/TodoObject.css';
import '../style/GlobalStyle.css';

import staron from '../asset/icon/free-icon-favorite-121726.png';
import staroff from '../asset/icon/free-icon-favorite-121724.png';

import checkimg from '../asset/icon/free-icon-checkbox-6941893.png';
import uncheckimg from '../asset/icon/free-icon-checkbox-6941890.png';
import axios from 'axios';

const TodoObjectDB = ( props ) => {
    
    const checkEvent = () => {
        axios.put("prj05/todo/check", {
            todonumber: props.todo.TODO_NUMBER,
            isck: props.todo.TODO_ISCHECKED
        })
        .then((res) => {
            console.log(res.data.SystemMassage);
            document.location.href = '/todolist';
        })
    }

    const checkIrtEvent = () => {
        axios.put("prj05/todo/important", {
            todonumber: props.todo.TODO_NUMBER,
            isip: props.todo.TODO_ISIMPORTANT
        })
        .then((res) => {
            console.log(res.data.SystemMassage);
            document.location.href = '/todolist';
        })
    }

    const checkrRevEvent = () => {
        axios.delete("prj05/todo/delete", {
            data: {
                todonumber: props.todo.TODO_NUMBER
            }
        })
        .then((res) => {
            console.log(res.data.SystemMassage);
            document.location.href = '/todolist';
        })
    }

    return (
        <div className='tdl-listobject'>
            <div className='tdl-important setcenter' onClick={checkIrtEvent}>
                {props.todo.TODO_ISIMPORTANT ? 
                    <img className='todolist-listobjectimg' src={staron} alt='!!'/> 
                : 
                    <img className='todolist-listobjectimg' src={staroff} alt='!!'/>
                }
            </div>

            <div className='tdl-listtext' onClick={checkEvent}>
                <div className='tdl-checkbox'>
                    {props.todo.TODO_ISCHECKED ? 
                        <img className='todolist-listobjectimg' src={checkimg} alt='!!'/> 
                    : 
                        <img className='todolist-listobjectimg' src={uncheckimg} alt='!!'/>
                    }
                </div>
                <div className="tdl-todotext">
                {props.todo.TODO_ISCHECKED ? 
                    <p className='tdl-cktext'>{props.todo.TODO_TEXT}</p>
                : 
                    <p>{props.todo.TODO_TEXT}</p>
                }
                </div>
            </div>

            <div className="todolist-delete setcenter gifont" onClick={checkrRevEvent}>
                <h2>삭제</h2>
            </div>
        </div>
    )
}

export default TodoObjectDB;