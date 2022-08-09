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

    const inputtitle = req.query.BOARD_TITLE;
    const inputtext = req.query.BOARD_TEXT;
    const inputmember = req.query.BOARD_WRITE;

    if (inputmember == undefined) {
        inputmember = '익명사용자';
    }

    const sqlQuery = `INSERT INTO board(BOARD_TITLE, BOARD_TEXT, BOARD_WRITE, BOARD_WRITE_TIME)
                        VALUES (?, ?, ?, sysdate());`;

    const params = [inputtitle, inputtext, inputmember]

    db.query(sqlQuery, params, (err, data) => {
        if (!err) {
            res.send({ 'SystemMessage': '글이 정상적으로 작성되었습니다.' })
        } 
        else {
            res.send(err)
        }
    });
})


module.exports = router;