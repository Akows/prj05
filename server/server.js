const express = require("express");
const app = express();

const createdbtable = require("./Router/createdbtable");
const selectdbcolumn = require("./Router/selectdbcolumn");
const insertdbcolumn = require("./Router/insertdbcolumn");

app.use("/prj05/cdbt", createdbtable);
app.use("/prj05/cdbs", selectdbcolumn);
app.use("/prj05/cdbi", insertdbcolumn);

const port = 5000;
app.listen(port, () => console.log(`Server port : ${port}`))