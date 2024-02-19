const express = require("express")
const {getTopics} = require("./controller")
const app = express()

app.get("/api/topics", getTopics);


app.all("/*", (req, res, next) => {
    res.status(404).send({msg: "Path not found"})
})

//Error handling middleware

app.use((err, req, res, next) => {
    res.status(500).send({msg: "Internal server error!"})
})
module.exports = app