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

router.post("/", (req, res) => {

    const sqlQuery = "INSERT INTO board(BOARD_NUMBER, BOARD_TITLE, BOARD_TEXT) VALUES ('', '', '')";

    db.query(sqlQuery, () => {
        res.send("BOARD WRITE.");
    });
    
})

module.exports = router;