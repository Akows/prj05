const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const jwt = require("jsonwebtoken");

const db = mysql.createPool({
    host: 'localhost',
    port: '3308',
    user: 'root',
    password: '123456',
    database: 'prj05',
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

// 로그인 기능 (JWT 방식)
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
            res.json({ auth: false, SystemMessage: '에러가 발생하였습니다.'});
        }
        else {
            // 에러가 발생하지 않았다면 회신되는 내용을 받아 아래 코드를 실행한다.
            // 위에서 사용한 검증 쿼리문은 id가 DB에 존재할 경우, id에 해당하는 member 테이블의 모든 행을 결과값으로 반환한다.
            // 결과값의 길이가 0보다 크다면 반환되는 값이 존재한다는 뜻이니 아래 코드를 실행한다.
            if (result.length > 0) {

                const id = result[0].MEMBER_ID;
                const token = jwt.sign({id}, "jwtSecret", 
                {
                    expiresIn: 300,
                });
                res.json({ auth: true, token: token, result: result, SystemMessage: '로그인 작업이 완료되었습니다.'});
            } 
            // 결과값의 길이가 0과 같거나 작다면 반환되는 값이 존재하지 않는다는 뜻이니 작업을 중단한다.
            else {
                res.json({ auth: false, SystemMessage: '존재하지 않는 계정입니다.'});
            }
        }
    })
})

// 회원가입 기능
router.post("/join", (req, res) => {
    // 프론트단에서 입력받은 회원정보를 각 변수에 담는다.
    const inputid = req.query.MEMBER_ID;
    const inputpwd = req.query.MEMBER_PW;
    const inputname = req.query.MEMBER_NAME;
    const inputemail = req.query.MEMBER_EMAIL;

    // MariaDB에서 사용할 쿼리문을 작성한다.
    const sqlQuery = `INSERT INTO member(MEMBER_ID, MEMBER_PW, MEMBER_NAME, MEMBER_EMAIL, MEMBER_JOINDATE)
                        VALUES (?, ?, ?, ?, sysdate());`;

    // 쿼리문에 사용될 변수가 많으므로 하나의 배열에 삽입한다. 배열의 순서는 쿼리문에 삽입될 요소의 순서를 맞춘다.
    const params = [inputid, inputpwd, inputname, inputemail]

    // 준비된 변수들로 작업을 실행한다.
    db.query(sqlQuery, params, (err, data) => {
        // 회원가입 기능의 경우 작업이 정상완료되었다면 프론트단으로 다시 넘겨줄 것이 없다.
        // 따라서 에러가 발생했을 경우에만 에러 문구를 프론트단으로 넘겨주는 코드를 작성한다.
        if (err) {
            res.send(err)
        }
        else {
            res.send(data[0])
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