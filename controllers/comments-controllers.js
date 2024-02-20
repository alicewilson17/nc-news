const express = require("express")
const {fetchCommentsByArticleId} = require("../models/comments-model")
const {fetchArticleById} = require("../models/articles-model")

exports.getCommentsByArticleId = (req,res,next) => {
    const {article_id} = req.params
    const promises = [fetchCommentsByArticleId(article_id)]

    if(article_id) {
        promises.push(fetchArticleById(article_id))
    }
  
    Promise.all(promises).then((promiseResolutions) => {
        res.status(200).send({comments: promiseResolutions[0]})
    })
    .catch((err) => {
        next(err)
    })
}