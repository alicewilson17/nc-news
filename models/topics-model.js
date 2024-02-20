const db = require("../db/connection")
const descriptions = require("../endpoints.json")
const fs = require("fs/promises")

exports.selectAllTopics = () => {
    return db.query("SELECT * FROM topics")
    .then((res) => {
        return res.rows
    })
}
