const {Pool} = require('pg')


const pool = new Pool({
    host: "localhost",
    user: "yourUserName",
    password: "yourPassword",
    port: 5432,
    database: "BornToDevDB"
})

module.exports = pool