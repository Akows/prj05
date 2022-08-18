const express = require("express");
const router = express.Router();
const mysql = require("mysql");

const jwt = require("jsonwebtoken");

const db = mysql.createPool({
    host: "localhost",
    port: '3308',
    user: "root",
    password: "123456",
    database: "prj05",
});

const verifyJWT = (req, res, next) => {
    const token = req.headers["x-access-token"];

    if (!token) {
        res.send('토큰이 존재하지 않습니다.');
    }
    else {
        jwt.verify(token, "jwtSecret", (err, decoded) => {
            if(err) {
                res.json({ auth: false, SystemMessage: '인증이 실패하였습니다.' });
            }
            else {
                req.userId = decoded.id;
                next();
            }
        })
    }
};

router.get("/auth", verifyJWT, (req, res) => {
    res.send('인증되었습니다.');
});

router.post("/login", (req, res) => {
    // 프론트단에서 입력된 id와 pw를 받아온다.
    const inputid = req.query.MEMBER_ID;
    const inputpwd = req.query.MEMBER_PW;

    // 우선 로그인 처리에 앞서 입력한 id가 DB에 존재하는지 확인한다.
    // 입력한 id가 DB에 존재하는지 검증하는 쿼리문.
    const idchecksql = `SELECT *
                        FROM member 
                        WHERE MEMBER_ID = ?`;

    // 쿼리문과 아이디를 담아 DB로 전송한다.
    db.query(idchecksql, inputid, (err, result) => {

        // DB와 통신 중 에러가 발생했다면 모든 작업을 중단하고 에러 내용을 프론트로 전송한다.
        if (err) {
            res.send({ 'SystemMessage': err });
        }

        // 에러가 발생하지 않았다면 회신되는 내용을 받아 아래 코드를 실행한다.
        // 위에서 사용한 검증 쿼리문은 id가 DB에 존재할 경우, id에 해당하는 member 테이블의 모든 행을 결과값으로 반환한다.
        // 결과값의 길이가 0보다 크다면 반환되는 값이 존재한다는 뜻이니 아래 코드를 실행한다.
        if (result.length > 0) {

            const id = result[0].MEMBER_ID;
            const token = jwt.sign({id}, "jwtSecret", 
            {
                expiresIn: 300,
            });

            res.json({ auth: true, token: token, result: result});

            res.send({ SystemMessage : '성공적으로 로그인하였습니다.' });
        } 
        // 결과값의 길이가 0과 같거나 작다면 반환되는 값이 존재하지 않는다는 뜻이니 작업을 중단한다.
        else {
            res.send({ SystemMessage: '존재하지 않는 계정입니다.' });
        }
        
    })
})

// 이전 로그인 방식 (세션스토리지)
// JWT 방식으로 변경되어 현재는 사용하지 않음.

// router.post("/login", (req, res) => {
//     // 로그인 창에서 넘어온 아이디와 비밀번호 값을 변수 선언으로 정리.
//     const inputid = req.query.MEMBER_ID;
//     const inputpwd = req.query.MEMBER_PW;

//     // 입력한 ID가 DB상에 존재하는지 확인
//     const idchecksql = `SELECT COUNT(*) AS CHECKRESULT 
//                         FROM member 
//                         WHERE MEMBER_ID = ?`;

//     db.query(idchecksql, inputid, (err, data) => {
//         // 에러 발생 여부 확인, 에러가 없으면 실행.
//         if (!err) {
//             // idchecksql의 'COUNT(*) AS CHECKRESULT'이 0일 경우 (일치하는 아이디가 없음)
//             if (data[0].CHECKRESULT < 1) {
//                 res.send({ 'SystemMessage': '존재하지 않는 계정입니다' })
//             } 
//             // idchecksql의 'COUNT(*) AS CHECKRESULT'이 1일 경우 (일치하는 아이디가 있음)
//             else { 
//                 // 입력된 ID, PW 값이 DB상에 존재하는지 검증, 존재할 경우 일치하는 아이디와 비밀번호값을 반환.
//                 const idpwchecksql = `SELECT 
//                                         CASE (SELECT COUNT(*) FROM member WHERE MEMBER_ID = ? AND MEMBER_PW = ?)
//                                             WHEN '0' THEN NULL
//                                             ELSE (SELECT MEMBER_ID FROM member WHERE MEMBER_ID = ? AND MEMBER_PW = ?)
//                                         END AS MEMBERID
//                                         , CASE (SELECT COUNT(*) FROM member WHERE MEMBER_ID = ? AND MEMBER_PW = ?)
//                                             WHEN '0' THEN NULL
//                                             ELSE (SELECT MEMBER_PW FROM member WHERE MEMBER_ID = ? AND MEMBER_PW = ?)
//                                         END AS MEMBERPW`;
//                 // 쿼리문 내에서 ?로 처리되는 입력받는 값을 채워주기 위한 배열
//                 const params = [inputid, inputpwd, inputid, inputpwd, inputid, inputpwd, inputid, inputpwd]

//                 db.query(idpwchecksql, params, (err, data) => {
//                     // 에러 발생 여부 확인, 에러가 없으면 데이터를 받아서 반환.
//                     if (!err) {
//                         res.send(data[0]);
//                     } 
//                     // 에러가 있으면 에러 문장만 보냄.
//                     else {
//                         res.send(err)
//                     }
//                 })
//             }
//         } 
//         // 에러가 있으면 에러 문장만 보냄.
//         else {
//             res.send(err)
//         }
//     })
// })

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

router.get("/info", (req, res) => {
    const memberid = req.query.MEMBER_ID;

    const sqlQuery = `SELECT * 
                        FROM member 
                        WHERE MEMBER_ID = ?;`;

    db.query(sqlQuery, memberid, (err, data) => {
        if (!err) {
            res.send(data[0])
        } 
        else {
            res.send(err)
        }
    });    
})






router.put("/infomodify", (req, res) => {
    const mamberNumber = req.query.MEMBER_NUMBER;
    const memberId = req.query.MEMBER_ID;
    const mamberName = req.query.MEMBER_NAME;
    const mamberEmail = req.query.MEMBER_EMAIL;

    const sqlQuery = `UPDATE member 
                        SET MEMBER_ID = ?, MEMBER_NAME = ?, MEMBER_EMAIL = ?
                        WHERE MEMBER_NUMBER = ?;`;

    const params = [memberId, mamberName, mamberEmail, mamberNumber]

    db.query(sqlQuery, params, (err, data) => {
        if (!err) {
            res.send({ 'SystemMessage': '회원정보가 수정되었습니다.' })
        } 
        else {
            res.send(err)
        }
    });
})

module.exports = router;