import axios from 'axios';

import '../style/Board.css';

const Board = () => {

    const dbtablemake = () => {
        axios
        .get('/prj05/cdbt')
        .then(res => 
            console.log('테이블 생성')
        );
    };

    return (
        <>
            <div className='board-outer'>

                <div className='board-inner-sidemenu'>
                    <button onClick={dbtablemake}>
                        DB에 테이블 생성하기
                    </button>
                </div>
                <div className='board-inner-boardcontents'>

                </div>

            </div>
        </>
    )
}

export default Board;