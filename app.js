const express = require("express")
const {getTopics, getDescriptions} = require("./controllers/topics-controller");
const {getArticleById, getArticles, patchArticleById} = require("./controllers/articles-controller")
const {getCommentsByArticleId, postCommentOnArticle} = require('./controllers/comments-controllers')
const { handleInvalidEndpoint, handleServerError, handlePSQLErrors, handleCustomErrors } = require("./controllers/errors.controllers");
const app = express()

app.use(express.json())

app.get("/api/topics", getTopics);

app.get("/api", getDescriptions)

app.get("/api/articles/:article_id", getArticleById)

app.get("/api/articles", getArticles)

app.get("/api/articles/:article_id/comments", getCommentsByArticleId)

app.post("/api/articles/:article_id/comments", postCommentOnArticle)

app.patch("/api/articles/:article_id", patchArticleById)

app.all("/*", handleInvalidEndpoint)

app.use(handlePSQLErrors)

app.use(handleCustomErrors)

app.use(handleServerError)

module.exports = app