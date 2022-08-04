const express = require("express");
const router = express.Router();

const mysql = require("mysql");

const db = mysql.createPool({
    host: "localhost",
    port: '3308',
    user: "root",
    password: "123456",
    database: "prj05",
});

// router.get("/", (req, res) => {
//     res.send({ db: "db" });
// })

router.get("/", (req, res) => {

    const sqlQuery = "INSERT INTO requested (rowno) VALUES (2)";

    db.query(sqlQuery, (err, result) => {
        console.log(err);
        res.send("success!");
    });
    
})

module.exports = router;