const express = require("express")
const {fetchArticleById, selectAllArticles, updateArticle} = require("../models/articles-model")


exports.getArticleById = (req, res, next) => {
    const {article_id} = req.params
    fetchArticleById(article_id)
    .then((article) => {
        res.status(200).send({article})
    })
    .catch((err) => {
        next(err)
    })
}

exports.getArticles = (req,res,next) => {
    const {topic, sort_by, order} = req.query
    selectAllArticles(topic, sort_by, order)
    .then((articles) => {
        res.status(200).send({articles})
    })
    .catch((err) => {
        next(err)
    })
    }

exports.patchArticleById = (req,res,next) => {
    const voteData = req.body
    const {article_id} = req.params
    updateArticle(article_id, voteData)
    .then((article) => {
        res.status(200).send({article})
    })
    .catch((err) => {
        next(err)
    })
}

