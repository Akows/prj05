const express = require("express");
const app = express();

const member = require("./Router/member");
const board = require("./Router/board");

// CORS 문제를 백엔드에서 해결할 때 사용하는 cors 모듈.
// 이 프로젝트에서는 CORS를 프론트단 미들웨어에서 해결하고 있으므로 사용하지 않음.
// const cors = require("cors");
// app.use(
//     cors({
//         origin: ["http://localhost:3000"],
//         methods: ["GET", "POST", "PUT", "DELETE"],
//         credentials: true,
//     })
// );

app.use("/prj05/member", member);
app.use("/prj05/board", board);

const port = 5000;
app.listen(port, () => console.log(`Server port : ${port}`))