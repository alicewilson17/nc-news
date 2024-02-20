const express = require("express")
const {selectAllTopics} = require("../models/topics-model")
const jsondata = require('../endpoints.json')

exports.getTopics = (req,res,next) => {
selectAllTopics()
.then((topics) => {
    res.status(200).send({topics})
})
.catch((err) => {
    next(err)
})
}

exports.getDescriptions = (req,res,next) => {
    return res.status(200).send(jsondata)
    .catch((err) => {
        next(err)
    })
}
