const express = require("express")
let router = express.Router()



router.get("/", (req, res) => {
    res.render("sinabei")
})



module.exports = router




