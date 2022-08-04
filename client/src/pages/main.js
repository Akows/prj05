
import '../style/Main.css';

const Main = () => {

    const eventbtu = () => {
        console.log('버튼 클릭됨');
    };

    return (
        <>
            <div className='outer'>
                <div className='inner'>

                <div className='title'>

                </div>
                <div className='context'>
                    
                </div>

                <div className='button'>
                    <button onClick={eventbtu}>버튼</button>
                </div>

                </div>
            </div>
        </>
    )
}

export default Main;