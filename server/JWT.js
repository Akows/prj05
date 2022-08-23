// JWT와 관련된 코드가 작성될 파일.
const { sign, verify } = require("jsonwebtoken");

// JWT를 생성하는 함수.
// member 정보를 매개변수로 받아 토큰을 생성하여 반환한다.
const createTokens = (user) => {
    // 토큰을 생성, accessToken 변수에 담고 "jwtsecretplschange"의 이름으로 서버에 남겨둔다?
    const accessToken = sign({ memberid: user.MEMBER_ID, memberpw: user.MEMBER_PW }, "jwtsecretplschange");
    
    return accessToken;
};

// JWT를 검증하는 함수.
const validateToken = (req, res, next) => {
    // 생성했던 쿠키를 받아 변수에 담는다.
    const accessToken = req.cookies["access-token"];

    // 쿠키가 존재하지 않을 경우, 아래 코드를 실행하고 작동을 종료한다.
    if (!accessToken) 
        return res.status(400).json({ SystemMassage: "유효하지 않은 사용자입니다."});

    // try-catch문, 코드 실행 중 에러가 발생하면 에러 코드문을 실행하고 작동을 종료한다.
    try {
        // Cookie에 담겨있는 토큰과 서버에서 생성했던 토큰을 비교하여 유효성을 검사한다.
        const validToken = verify(accessToken, "jwtsecretplschange");

        // 토큰이 유효할 경우, authenticated을 true로 바꾸고 함수를 종료한 뒤 이후 코드로 넘어가게 한다. 
        if (validToken) {
            req.authenticated = true;
            return next();
        }
    }
    // 에러가 발생했을 경우, 아래 코드를 실행하고 작동을 종료한다.
    catch (err) {
        return res.status(400).json({ SystemMassage: err });
    }
};

module.exports = { createTokens, validateToken };