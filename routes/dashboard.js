const express = require("express")
let router = express.Router()
let multer = require("multer")
const path = require("path")
const fs = require("fs")

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
    let imgurl = req.params
    console.log(imgurl.a)
    // console.log(__dirname)
    // console.log(__dirname + "/public/" + imgurl.address)
    res.send("fsfsd")
    // console.log("image url is " + imgurl)

    // fs.readFile('/public/images', 'utf8' , (err, data) => {
    //     if (err) {
    //       console.error(err)
    //       return
    //     }
    //     console.log(data)
    // })

    // res.send("img deleted")
    // fs.unlink('file.txt', (err) => {
    //     if (err) {
    //         throw err;
    //     }
    
    //     res.send("file has being deleted")
    // })

})

module.exports = router