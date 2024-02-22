const db = require("../db/connection");

exports.selectAllUsers = () => {
return db.query(`SELECT * FROM users`)
.then((res) => {
    return res.rows
})
}