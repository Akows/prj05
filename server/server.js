const express = require("express");
const app = express();

const test = require("./Router/test");
const test2 = require("./Router/test2");

const dbtest = require("./Router/dbtest");

app.use("/prj05/1", test);
app.use("/prj05/2", dbtest);

const port = 5000;
app.listen(port, () => console.log(`Server port : ${port}`))