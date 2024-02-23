const topicsRouter = require("express").Router()
const {getTopics} = require("../controllers/topics-controller")
const {handleBadMethod} = require("../controllers/errors.controllers")

topicsRouter.route("/").get(getTopics).all(handleBadMethod)

module.exports = topicsRouter