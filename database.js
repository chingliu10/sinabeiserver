const mysql = require("mysql2")

let connection = mysql.createConnection({
    host : "208.117.86.203" ,
    user : "sinabei",
    password : "fungaMeza12?",
    database : "pos",
    port : 3306
})


module.exports = connection

