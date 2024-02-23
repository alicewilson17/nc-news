const express = require("express")
const {getTopics} = require("./controllers/topics-controller");
const {getArticleById, getArticles, patchArticleById} = require("./controllers/articles-controller")
const {getCommentsByArticleId, postCommentOnArticle, deleteCommentById} = require('./controllers/comments-controllers')
const { handleInvalidEndpoint, handleServerError, handlePSQLErrors, handleCustomErrors } = require("./controllers/errors.controllers");
const { getUsers } = require("./controllers/users-controllers");
const app = express()
const apiRouter = require("./routes/api-router")

app.use(express.json())

app.use("/api", apiRouter);
app.use(handleCustomErrors);
app.use(handleInvalidEndpoint);
app.use(handlePSQLErrors);
app.use(handleServerError);

module.exports = app