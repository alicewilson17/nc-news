const db = require("../db/connection");
const fs = require('fs/promises')

exports.fetchArticleById = (article_id) => {
    return db.query(`SELECT articles.*, COUNT(CAST(comments.article_id AS int)) AS comment_count FROM articles LEFT JOIN comments on articles.article_id = comments.article_id WHERE articles.article_id = $1 GROUP BY articles.article_id;`, [article_id])
    .then((response) => {
         if (response.rows.length === 0) {
      return Promise.reject({ status: 404, msg: "id not found" });
         }
        return response.rows[0]
    })
}

exports.selectAllArticles = (topic, sort_by = 'created_at', order = 'desc') => {
    const validSortBys = ["article_id", "title", "author", "topic", "created_at", "votes", "article_img_url", "comment_count"]
    const validOrderBys = ["asc", "desc"]
if (!validSortBys.includes(sort_by) || !validOrderBys.includes(order)) {
    return Promise.reject({status: 400, msg: "Bad request"})
}

    let sqlString = `SELECT articles.article_id, articles.title, articles.author, articles.topic, articles.created_at, articles.votes, articles.article_img_url, COUNT(CAST(comments.article_id AS float)) AS comment_count FROM articles LEFT JOIN comments ON articles.article_id = comments.article_id`
    const queryVals = []

    if(topic) {
        sqlString += ` WHERE topic = $1`
        queryVals.push(topic)
    }

    sqlString += ` GROUP BY articles.article_id ORDER BY ${sort_by} ${order}`

    
    return db.query(sqlString, queryVals)
        .then((res) => {
            if(res.rows.length === 0) {
                return db.query(`SELECT * FROM topics WHERE slug = $1;`, [topic])
                .then((topicCheck) => {
                    if (topicCheck.rows.length === 0) {
                        return Promise.reject({status: 404, msg: "Topic not found"})
                }
                else {return res.rows}
            })
            }
           else{return res.rows}
        })
}

exports.updateArticle = (article_id, voteData) => {
const {inc_votes} = voteData
return db.query(`UPDATE articles SET votes = votes + $1 WHERE article_id = $2 RETURNING *`, [inc_votes, article_id])
.then((res) => {
    if (res.rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Id not found" });
    }
    return res.rows[0]
})

}