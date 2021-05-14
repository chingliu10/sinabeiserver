const express = require("express")
let router = express.Router()
let multer = require("multer")
const path = require("path")

let storage = multer.diskStorage({
    destination : function (req, file, cb) {
        cb(null, 'public/images')
    },
    filename : function (req, file, cb) {
        cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname))
    }
})
let upload = multer({ storage : storage })

router.get("/", (req, res) => {
    res.render("dashboard")
})

router.post("/upload", upload.single("imageUpload"), function (req, res, next) {
    console.log("requested file is")
    console.log(req.file)
    res.json({data : req.file})
})

module.exports = router