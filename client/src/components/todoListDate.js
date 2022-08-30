import '../style/TodoListDate.css';

const TodoListDate = (props) => {

    // 자바스크립트 날짜 데이터 가져오기.
    // new 키워드를 사용하여 Date 객체 가져오기.
    const timeData = new Date();

    // 전체 시간 데이터를 불러오는 방법.

    // Thu Aug 18 2022 16:39:36 GMT+0900 (한국 표준시)
    // const timeString1 = timeData.toString();
    // // Thu, 18 Aug 2022 07:39:36 GMT
    // const timeString2 = timeData.toUTCString();
    // // 2022. 8. 18. 오후 4:39:36
    // const timeString3 = timeData.toLocaleString(); 
    // // 2022. 8. 18. 오후 4:39:36
    // const timeString4 = timeData.toLocaleString('ko-kr');
    // // 8/18/2022, 4:39:36 PM
    // const timeString5 = timeData.toLocaleString('en-us');

    // 일부 시간 데이터를 불러오는 방법.
    // UTC 기준 시간은 get 대신 getUTC 함수를 사용하면 된다.
    // get 함수들은 시간 데이터를 숫자만 (1월이라고 하면, 1만 가져온다) 가져온다.
    // const year = timeData.getFullYear();
    // const month = timeData.getMonth() + 1; // getMonth에서는 월을 0부터 시작한다. 따라서 숫자 1을 더해줘야 월이 정상적으로 출력된다.
    // const date = timeData.getDate();
    // const hours = timeData.getHours();
    // const minutes = timeData.getMinutes();
    // const seconds = timeData.getSeconds();
    // const milliseconds = timeData.getMilliseconds();

    const year = timeData.getFullYear();
    const month = timeData.getMonth() + 1; // getMonth에서는 월을 0부터 시작한다. 따라서 숫자 1을 더해줘야 월이 정상적으로 출력된다.
    const date = timeData.getDate();
    const timeString = year + '년 ' + month + '월 ' + date + '일';

    // 요일을 구하는 detDay 함수는 요일을 숫자로 표시한다.
    const day = timeData.getDay();
    const week = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
    const dayString = week[day];

    // Todolist에 존재하는 요소들의 총 갯수 구하기.
    const listCount = props.todos.length;

	return (
        <div>
            <h4>{timeString}</h4>
            <h4>{dayString}</h4>
            <h3 className="tdl-taskleft">할 일 {listCount}개 남음</h3>
        </div>
    )
}

export default TodoListDate;