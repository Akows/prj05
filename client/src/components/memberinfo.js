
import '../style/MemberInfo.css';

const MemberInfo = (props) => {

    return (
        <>
            <div className='memberinfo-outer all'>
                
                <div className='memberinfo-inner all'>
                
                    <div className='memberinfo-title all'>
                        <h1>제목</h1>
                    </div>

                    <div className='memberinfo-inputform all'>

                        <div className='memberinfo-write all'>

                            {props.whoLogin}

                        </div>


                    </div>

                    <div className='memberinfo-submit all'>
                        <button className='memberinfo-button'>
                            버튼
                        </button>
                    </div>

                </div>
            </div>
        </>
    )
}

export default MemberInfo;