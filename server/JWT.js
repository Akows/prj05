// JWT와 관련된 코드들이 작성될 파일.

const { sign, verify } = require("jsonwebtoken");

// JWT를 생성하는 함수.
// member 정보를 매개변수로 받아 토큰을 생성하여 반환한다.
const createTokens = (user) => {
    const accessToken = sign({ memberid: user.MEMBER_ID, memberpw: user.MEMBER_PW }, "jwtsecretplschange");
        return accessToken;
};

// JWT를 검증하는 함수.
const validateToken = (req, res, next) => {
    const accessToken = req.cookies["access-token"];

    if (!accessToken) 
        return res.status(400).json({ SystemMassage: "유효하지 않은 사용자입니다."});

    try {
        const validToken = verify(accessToken, "jwtsecretplschange");

        if (validToken) {
            req.authenticated = true;
            return next();
        }
    }
    catch (err) {
        return res.status(400).json({ SystemMassage: err });
    }
};

module.exports = { createTokens, validateToken };