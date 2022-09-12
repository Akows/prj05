import './Test.css';
import '../style/GlobalStyle.css';

const Test = () => {

    return (
        <>
                <div className='tdl-pagebackground setcenter'>
                    <div className='tdl-pageinner setcenter'>
                        <div className='tdl-tdlarea setcenter gifont'>

                            <div className='tdl-sidebar'>

                                <div className='tdl-sidetitle'>
                                    <h1>TodoList(DB)</h1>
                                </div>

                                <div className='tdl-sideutil'>
                                    
                                </div>

                                <div className='tdl-sidebtu'>
                                    <button className='tdl-changebtu gifont'>No DB 버전으로 전환</button>
                                </div>

                            </div>

                            <div className='tdl-contents'>

                                <div className='tdl-addtdl'>
                                    
                                </div>
                                <div className='tdl-showtdl'>
                                    <div className='todolist-loadbox'>
                                        <h1>Loading...</h1>
                                    </div>
                                </div>
                                <div className='tdl-pagenation'>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </>
    )
}

export default Test;