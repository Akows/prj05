
import { Link } from 'react-router-dom';
import '../style/BoardList.css';

const BoardList = (props) => {

    return (
        <div className='board-contents-board'>
            {props.boarddata && props.boarddata.datas?.map(item => {
                return (
                    <div className='board-contents-boarddes' key={item.BOARD_NUMBER}>
                        <div className='board-contents-boarddesnumber bod-conts-boddespubcss'>
                            {item.BOARD_NUMBER}
                        </div>

                        <div className='board-contents-boarddestitle bod-conts-boddespubcss'>
                            <Link to={`/boardview/${item.BOARD_NUMBER}`} state={{ BOARD_NUMBER: item.BOARD_NUMBER,
                                                                                    BOARD_TITLE: item.BOARD_TITLE,               
                                                                                    BOARD_TEXT: item.BOARD_TEXT,                
                                                                                    BOARD_WRITER: item.BOARD_WRITER,               
                                                                                    BOARD_WRITE_TIME: item.BOARD_WRITE_TIME }}>
                            {item.BOARD_TITLE}
                            </Link>
                        </div>

                        <div className='board-contents-boarddeswriter bod-conts-boddespubcss'>
                            {item.BOARD_WRITER}
                        </div>

                        <div className='board-contents-boarddeswritetime bod-conts-boddespubcss'>
                            {item.BOARD_WRITE_TIME}
                        </div>

                    </div>
                );
            })}
        </div>
    )
}

export default BoardList;