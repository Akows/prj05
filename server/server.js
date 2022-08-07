const express = require("express");
const app = express();

const member = require("./Router/member");
const board = require("./Router/board");

app.use("/prj05/member", member);
app.use("/prj05/board", board);

const port = 5000;
app.listen(port, () => console.log(`Server port : ${port}`))