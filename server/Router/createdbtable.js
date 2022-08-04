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

    const sqlQuery = "CREATE TABLE `prj05`.`BOARD` (`BOARD_NUMBER` INT NOT NULL,`BOARD_TITLE` VARCHAR(100) NOT NULL,`BOARD_CONTEXT` VARCHAR(1000) NOT NULL, PRIMARY KEY (`BOARD_NUMBER`))";

    db.query(sqlQuery, () => {
        res.send("TABLE CREATED.");
    });
    
})

module.exports = router;