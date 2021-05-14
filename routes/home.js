const express = require("express")
let router = express.Router()


router.get("/", (req, res) => {
    res.render("sinabei")
})

router.get("/check", (req, res) => {
    res.send(__dirname)
})



module.exports = router




