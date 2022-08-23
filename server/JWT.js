// JWT와 관련된 코드들이 작성될 파일.

const { sign, verify } = require("jsonwebtoken");

// JWT를 생성하는 함수.
// member 정보를 매개변수로 받아 토큰을 생성하여 반환한다.
const createTokens = (user) => {
    const accessToken = sign({ memberid: user.MEMBER_ID, memberpw: user.MEMBER_PW }, "jwtsecretplschange");
        return accessToken;
};

module.exports = { createTokens };