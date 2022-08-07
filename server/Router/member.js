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

router.post("/join", (req, res) => {

    const inputid = req.query.MEMBER_ID;
    const inputpwd = req.query.MEMBER_PW;
    const inputname = req.query.MEMBER_NAME;
    const inputemail = req.query.MEMBER_EMAIL;

    const sqlQuery = `INSERT INTO member(MEMBER_ID, MEMBER_PW, MEMBER_NAME, MEMBER_EMAIL, MEMBER_JOINDATE)
                        VALUES (?, ?, ?, ?, sysdate());`;

    const params = [inputid, inputpwd, inputname, inputemail]

    db.query(sqlQuery, params, (err, data) => {
        if (!err) {
            res.send(data[0])
        } 
        else {
            res.send(err)
        }
    });
    
})

router.post("/login", (req, res) => {
   	// 로그인 창에서 넘어온 아이디와 비밀번호 값을 변수 선언으로 정리.
    const inputid = req.query.MEMBER_ID;
    const inputpwd = req.query.MEMBER_PW;

    // 입력한 ID가 DB상에 존재하는지 확인
    const idchecksql = `SELECT COUNT(*) AS CHECKRESULT 
                        FROM member 
                        WHERE MEMBER_ID = ?`;

    db.query(idchecksql, inputid, (err, data) => {
        // 에러 발생 여부 확인, 에러가 없으면 실행.
        if (!err) {
        	// idchecksql의 'COUNT(*) AS CHECKRESULT'이 0일 경우 (일치하는 아이디가 없음)
            if (data[0].CHECKRESULT < 1) {
                res.send({ 'SystemMessage': '존재하지 않는 계정입니다' })
            } 
            // idchecksql의 'COUNT(*) AS CHECKRESULT'이 1일 경우 (일치하는 아이디가 있음)
            else { 
                // 입력된 ID, PW 값이 DB상에 존재하는지 검증, 존재할 경우 일치하는 아이디와 비밀번호값을 반환.
                const idpwchecksql = `SELECT 
                                        CASE (SELECT COUNT(*) FROM member WHERE MEMBER_ID = ? AND MEMBER_PW = ?)
                                            WHEN '0' THEN NULL
                                            ELSE (SELECT MEMBER_ID FROM member WHERE MEMBER_ID = ? AND MEMBER_PW = ?)
                                        END AS MEMBERID
                                        , CASE (SELECT COUNT(*) FROM member WHERE MEMBER_ID = ? AND MEMBER_PW = ?)
                                            WHEN '0' THEN NULL
                                            ELSE (SELECT MEMBER_PW FROM member WHERE MEMBER_ID = ? AND MEMBER_PW = ?)
                                        END AS MEMBERPW`;
                // 쿼리문 내에서 ?로 처리되는 입력받는 값을 채워주기 위한 배열
                const params = [inputid, inputpwd, inputid, inputpwd, inputid, inputpwd, inputid, inputpwd]

                db.query(idpwchecksql, params, (err, data) => {
                    // 에러 발생 여부 확인, 에러가 없으면 데이터를 받아서 반환.
                    if (!err) {
                        res.send(data[0])
                    } 
                    // 에러가 있으면 에러 문장만 보냄.
                    else {
                        res.send(err)
                    }
                })
            }
        } 
        // 에러가 있으면 에러 문장만 보냄.
        else {
            res.send(err)
        }
    })

    
})

module.exports = router;