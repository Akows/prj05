// 로직 변경 등의 이유로 더 이상 사용하지 않지만 참고자료로 사용하기 위한 것들을 보관하는 시트.
// 로직 변경 등의 이유로 더 이상 사용하지 않지만 참고자료로 사용하기 위한 것들을 보관하는 시트.

// CORS 문제를 백엔드에서 해결할 때 사용하는 cors 모듈.
// 이 프로젝트에서는 CORS를 프론트단 미들웨어에서 해결하고 있으므로 사용하지 않음.
// const cors = require("cors");
// app.use(
//     cors({
//         origin: ["http://localhost:3000"],
//         methods: ["GET", "POST", "PUT", "DELETE"],
//         credentials: true,
//     })
// );

// 로그인 기능 (sessionStorage 방식)
// 로그인 방식을 JWT 방식으로 변경되어 현재는 사용하지 않음.

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


// 프론트엔드 시트
// 프론트엔드 시트

// sessionStorage 방식 로그인 기능.
// 로그인 방식을 JWT로 변경하면서 더 이상 사용하지 않음.
//   // 로그인 여부 값과 로그인 한 사용자 이름을 관리하기 위한 isLogin / whoLogin 변수를 useState로 관리.
//   const [isLogin, setIsLogin] = useState('');
//   const [whoLogin, setWhoLogin] = useState('');

//   React.useEffect(() => {
//     // 웹이 실행되면 가장 먼저 isLogin을 false로 초기화.
//         setIsLogin(false);

//     // sessionStorage에 Item으로 담겨진 로그인값을 검증.
//     // 로그인 값의 이름은 'MEMBER_ID', 이 값이 없을(null) 경우 whoLogin의 값을 '익명사용자'로 set.
//     if (sessionStorage.getItem('MEMBER_ID') === null) {
//         setWhoLogin('익명사용자');
//     } 
//     else {
//     // 이 값이 있을 경우 useState로 제어하는 isLogin의 값을 true로 전환하고 whoLogin을 로그인 한 유저의 ID값으로 변경한다.
//         setIsLogin(true);
//         setWhoLogin(sessionStorage.getItem('MEMBER_ID'));
//     }
// }, [])