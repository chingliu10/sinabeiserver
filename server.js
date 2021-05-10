const express = require("express")
let app = express()
let home = require("./routes/home")

app.use(express.static("public"))
app.set("view engine", "hbs")


app.use("/", home)
let port = 3000

app.listen(port , () => {
    console.log("listenning from sinabei servers")
})