
import '../style/Boardview.css';

const Boardview = (props) => {

    return (
        <div className='board-contents-board'>
            <div className='board-contents-boarddes'>
                <div className='board-contents-boarddesnumber'>글번호</div>
                <div className='board-contents-boarddestitle'>글제목</div>
                <div className='board-contents-boarddeswriter'>작성자</div>
            </div>

            {props.boarddata && props.boarddata.datas?.map(item => {
                return (
                    <div className='board-contents-boarddes' key={item.BOARD_NUMBER}>
                        <div className='board-contents-boarddesnumber'>{item.BOARD_NUMBER} </div>
                        <div className='board-contents-boarddestitle'>{item.BOARD_TITLE}</div>
                        <div className='board-contents-boarddeswriter'>{item.BOARD_WRITE}</div>
                    </div>
                );
            })}
        </div>
    )
}

export default Boardview;