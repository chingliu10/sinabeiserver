const express = require("express")
const hbs = require("hbs")
let app = express()
let home = require("./routes/home")
let admin = require("./routes/admin")
let dashboard = require("./routes/dashboard")

app.use(express.static("public"))
app.set("view engine", "hbs")
hbs.registerPartials(__dirname + "/views/partials")

app.use("/", home)
app.use("/admin", admin)
app.use("/dashboard", dashboard)
let port = 80

app.listen(port , () => {
    console.log("listenning from sinabei servers")
})