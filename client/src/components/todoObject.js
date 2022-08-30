import '../style/TodoObject.css';
import '../style/GlobalStyle.css';

import staron from '../asset/icon/free-icon-favorite-121726.png';
import staroff from '../asset/icon/free-icon-favorite-121724.png';

import checkimg from '../asset/icon/free-icon-checkbox-6941893.png';
import uncheckimg from '../asset/icon/free-icon-checkbox-6941890.png';

const TodoObject = ({ todo, onRemove, onCheck, onImportant }) => {
    const { id, text, checked, important } = todo;

    const checkEvent = () => {
        onCheck(id)
    }

    const checkIrtEvent = () => {
        onImportant(id)
    }

    const checkrRevEvent = () => {
        onRemove(id)
    }

    return (
        <div className='tdl-listobject'>
            <div className='tdl-important setcenter' onClick={checkIrtEvent}>
                {important ? 
                    <img className='todolist-listobjectimg' src={staron} alt='!!'/> 
                : 
                    <img className='todolist-listobjectimg' src={staroff} alt='!!'/>
                }
            </div>

            <div className='tdl-listtext' onClick={checkEvent}>
                <div className='tdl-checkbox'>
                    {checked ? 
                        <img className='todolist-listobjectimg' src={checkimg} alt='!!'/> 
                    : 
                        <img className='todolist-listobjectimg' src={uncheckimg} alt='!!'/>
                    }
                </div>
                <div className="tdl-todotext">
                    {text}
                </div>
            </div>

            <div className="todolist-delete setcenter gifont" onClick={checkrRevEvent}>
                <h2>삭제</h2>
            </div>
        </div>
    )
}

export default TodoObject;