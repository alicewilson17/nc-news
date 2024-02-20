const db = require("../db/connection");
const fs = require('fs/promises')

exports.fetchArticleById = (article_id) => {
    return db.query(`SELECT * FROM articles WHERE article_id = $1`, [article_id])
    .then((response) => {
         if (response.rows.length === 0) {
      return Promise.reject({ status: 404, msg: "id not found" });
         }
        return response.rows[0]
    })
}

exports.selectAllArticles = () => {
    return db.query(`SELECT articles.article_id, articles.title, articles.author, articles.topic, articles.created_at, articles.votes, articles.article_img_url, COUNT(CAST(comments.article_id AS float)) AS comment_count FROM articles LEFT JOIN comments ON articles.article_id = comments.article_id GROUP BY articles.article_id ORDER BY created_at DESC`)
    .then((res) => {
        return res.rows
    })
}