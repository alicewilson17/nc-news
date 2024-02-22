const express = require("express")
const {fetchCommentsByArticleId, addCommentToArticle, removeCommentById} = require("../models/comments-model")
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

exports.postCommentOnArticle = (req, res, next) => {
    const commentData = req.body;
    const {article_id} = req.params;

    addCommentToArticle(article_id, commentData).then((comment) => {
        res.status(201).send({comment})
    })
    .catch((err) => {
        next(err)
    })
}

exports.deleteCommentById = (req,res,next) => {
    const {comment_id} = req.params;
    removeCommentById(comment_id).then((comment) => {
        res.status(204).send()
    })
    .catch((err) => {
        next(err)
    })
}