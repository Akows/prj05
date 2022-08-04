import { Link } from 'react-router-dom';
import '../style/Menubar.css';

const Menubar = () => {

    return (
        <>
            <div className='menubar-outer'>
                <Link to={'/'}>
                <button className='menubar-button'>Main</button>
                </Link>
                <Link to={'/api'}>
                <button className='menubar-button'>API</button>
                </Link>
                <Link to={'/todolist'}>
                <button className='menubar-button'>TodoList</button>
                </Link>
                <Link to={'/board'}>
                <button className='menubar-button'>Board</button>
                </Link>
                <Link to={'/member'}>
                <button className='menubar-button'>Member</button>
                </Link>
            </div>
        </>
    )
}

export default Menubar;