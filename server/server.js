const express = require("express");
const app = express();

const createdbtable = require("./Router/createdbtable");

app.use("/prj05/cdbt", createdbtable);

const port = 5000;
app.listen(port, () => console.log(`Server port : ${port}`))