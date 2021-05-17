const express = require("express")
let router = express.Router()
let multer = require("multer")
const path = require("path")
const fs = require("fs")
router.use(express.json())


let storage = multer.diskStorage({
    destination : function (req, file, cb) {
        cb(null, 'public/images')
    },
    filename : function (req, file, cb) {
        cb(null, file.originalname + '_' + Date.now() + path.extname(file.originalname))
    }
})

let upload = multer({ storage : storage })

router.get("/", (req, res) => {
    res.render("dashboard")
})

router.post("/upload", upload.single("imageUpload"), function (req, res) {
    res.json({data : req.file.path})
})


router.get("/deleteimage/:a", (req, res) => {
    let imgUrl = req.params.a
    
    fs.unlink(`/home/chingliu/sinabeiserver/public/images/${imgUrl}`, (err) => {
        if (err) {
            throw err;
        }
    
        res.send("file has being deleted")
    })

})

router.post("/create", (req, res) =>{
    console.log(req.body)
    res.send("product created")
})


module.exports = router