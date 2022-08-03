const express = require("express");
const app = express();

const test = require("./Router/test");

app.use("/prj05", test);

const port = 5000;
app.listen(port, () => console.log(`Server port : ${port}`))