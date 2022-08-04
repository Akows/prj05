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

router.get("/", (req, res) => {

    const sqlQuery = "SELECT * FROM prj05.board";

    db.query(sqlQuery, (error, data) => {
        if (error)
            res.send(error);
        else
            res.send({datas: data});
    })
})

module.exports = router;