// express.js로 서버를 구축하는 파일.
// 우선 require 함수로 설치한 express를 불러온다.
// 그 다음 app 변수를 선언하여 express 변수를 대입해준다.
const express = require("express");
const app = express();

// 이 시트에 서버 코드를 작성해도 되지만 여기서는 보기 편하기 위해서 Router를 사용하여 파일을 나누어준다.
const member = require("./Router/member");
const board = require("./Router/board");

// express.js로 제작한 서버에서 json으로 이루어진 Request Body를 받았을 경우.
// 요청값을 제대로 받아오지 못하는 문제가 발생하곤 한다.
// express.js의 버전이 4.16 이전인 경우, body-parser 모듈을 설치하여 사용하여야 한다. (4.17 이후 버전은 express에서 body-parser을 내장함.)
// 그렇지 않은 경우 express.json()를 사용해주면 된다. 본 프로젝트의 express 버전은 4.18.1이므로 후자의 방법을 채택하였다.
app.use(express.json());

// 프론트에서 Axios로 호출하는 url 주소를 구분하여 알맞은 Router 파일을 연결해준다.
app.use("/prj05/member", member);
app.use("/prj05/board", board);

// 서버가 정상적으로 가동되고 있는지 확인하기 위한 코드.
// 서버가 정상이라면 Server port : 5000이라는 로그가 출력된다.
const port = 5000;
app.listen(port, () => console.log(`Server port : ${port}`))