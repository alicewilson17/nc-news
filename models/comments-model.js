const db = require("../db/connection");
const fs = require('fs/promises')



exports.fetchCommentsByArticleId = (article_id) => {
return db.query(`SELECT * FROM comments WHERE article_id = $1 ORDER BY created_at DESC`, [article_id])
.then((result) => {

return result.rows
})
}

exports.addCommentToArticle = (article_id, commentData) => {
const {username, body} = commentData;
return db.query('SELECT * FROM users WHERE username = $1;', [username])
.then((result) => {
    if (result.rows.length === 0) {
        return Promise.reject({ status: 404, msg: "User does not exist" })
    }
    else {
        return db.query(`INSERT INTO comments (author, body, article_id, votes) VALUES ($1, $2, $3, 0) RETURNING *;`, [username, body, article_id])
        .then((result) => {
            return result.rows[0]
        
        })

    }
})
} 

exports.removeCommentById = (comment_id) => {
    return db.query(`SELECT * FROM comments WHERE comment_id = $1;`, [comment_id])
    .then((commentCheck) => {
        if (commentCheck.rows.length === 0) {
        return Promise.reject({status: 404, msg: "Comment not found"})
    }
    return db.query(`DELETE FROM comments WHERE comment_id = $1`, [comment_id])
    .then((result) => {
       return(result.rows)
    })
})
}
