const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.send({ test2: "test2" });
})

module.exports = router;