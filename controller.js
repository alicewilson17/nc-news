const express = require("express")
const {selectAllTopics} = require("./model")

exports.getTopics = (req,res,next) => {
selectAllTopics()
.then((topics) => {
    res.status(200).send({topics})
})
.catch((err) => {
    next(err)
})
}


