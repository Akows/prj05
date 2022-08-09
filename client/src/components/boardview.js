
import '../style/Boardview.css';

const Boardview = (props) => {

    return (
        <div className='board-contents-board'>
            <div className='board-contents-boarddes'>
                <></>
            </div>

            {props.boarddata && props.boarddata.datas?.map(item => {
                return (
                    <div key={item.BOARD_NUMBER}>
                        <div className='board-inner-boardcontents-title'>
                            {item.BOARD_NUMBER} <br/>
                            {item.BOARD_TITLE}
                        </div>
                    </div>
                );
            })}
        </div>
    )
}

export default Boardview;