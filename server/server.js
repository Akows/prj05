const express = require("express");
const app = express();

const createdbtable = require("./Router/createdbtable");
const selectdbcolumn = require("./Router/selectdbcolumn");
const insertdbcolumn = require("./Router/insertdbcolumn");
const writedbcolumn = require("./Router/writedbcolumn");

app.use("/prj05/cdbt", createdbtable);
app.use("/prj05/cdbs", selectdbcolumn);
app.use("/prj05/cdbi", insertdbcolumn);
app.use("/prj05/cdbi", writedbcolumn);

const port = 5000;
app.listen(port, () => console.log(`Server port : ${port}`))