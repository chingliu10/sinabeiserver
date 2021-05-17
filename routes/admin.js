const express = require("express")
let router = express.Router()




router.get("/", (req, res) => {
    res.render("login")
})

router.post("/", (req, res) => {
    res.redirect("/dashboard")
})



module.exports = router