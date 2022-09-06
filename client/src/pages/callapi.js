import axios from 'axios';
import '../style/Callapi.css';

const Callapi = () => {


    const callAPIAction = () => {
        axios
        .get('prj05/api/call')
        .then(res => {
            console.log(res.data);
        })
        .catch(res => {
            console.log('실패');
        })
    }

	return (
        <>
            <div className='capi-pagebackground setcenter'>
                <div className='capi-pageinner setcenter'>
                    <div className='capi-capiarea setcenter gifont'>

                        <div className='capi-sidebar'>

                            <h1>공공데이터 API 호출</h1>

                            <div className='capi-sideutil'>
                                <button onClick={callAPIAction}>ㅎㅎ</button>
                            </div>

                        </div>

                        <div className='capi-contents'>

                            <div className='capi-addcapi'>

                            </div>
                            <div className='capi-showcapi'>

                            </div>
                            <div className='capi-pagenation'>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Callapi;