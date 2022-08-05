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

router.post("/create", (req, res) => {

    const sqlQuery = "CREATE TABLE `prj05`.`BOARD` (`BOARD_NUMBER` INT NOT NULL,`BOARD_TITLE` VARCHAR(100) NOT NULL,`BOARD_TEXT` VARCHAR(1000) NOT NULL, PRIMARY KEY (`BOARD_NUMBER`))";

    db.query(sqlQuery, () => {
        res.send("TABLE CREATED.");
    });
})

router.post("/insert", (req, res) => {

    const sqlQuery = "INSERT INTO board(BOARD_NUMBER, BOARD_TITLE, BOARD_TEXT) VALUES ('1', '1번 제목', '1번 내용')";

    db.query(sqlQuery, () => {
        res.send("INSERT COLUMN.");
    });
    
})

router.get("/select", (req, res) => {

    const sqlQuery = `SELECT * 
                        FROM prj05.board`;

    db.query(sqlQuery, (error, data) => {
        if (error)
            res.send(error);
        else
            res.send({datas: data});
    })
})

router.post("/write", (req, res) => {

    const sqlQuery = "INSERT INTO board(BOARD_NUMBER, BOARD_TITLE, BOARD_TEXT) VALUES ('', '', '')";

    db.query(sqlQuery, () => {
        res.send("BOARD WRITE.");
    });
    
})

module.exports = router;