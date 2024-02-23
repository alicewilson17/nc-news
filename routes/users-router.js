const usersRouter = require("express").Router()
const {getUsers} = require("../controllers/users-controllers")
const { handleBadMethod } = require("../controllers/errors.controllers")

usersRouter
.route("/")
.get(getUsers)
.all(handleBadMethod)




module.exports=usersRouter