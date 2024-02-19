const express = require("express")
const {getTopics, getDescriptions} = require("./controller")
const app = express()

app.use(express.json())

app.get("/api/topics", getTopics);

app.get("/api", getDescriptions)


app.all("/*", (req, res, next) => {
    res.status(404).send({msg: "Path not found"})
})

//Error handling middleware

app.use((err, req, res, next) => {
    res.status(500).send({msg: "Internal server error!"})
})
module.exports = app