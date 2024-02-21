const db = require("../db/connection");



exports.fetchCommentsByArticleId = (article_id) => {
return db.query(`SELECT * FROM comments WHERE article_id = $1 ORDER BY created_at DESC`, [article_id])
.then((result) => {

return result.rows
})
}

exports.addCommentToArticle = (article_id, commentData) => {
const {username, body} = commentData;
    return db.query(`INSERT INTO comments (author, body, article_id, votes) VALUES ($1, $2, $3, 0) RETURNING *;`, [username, body, article_id])
    .then((result) => {
        return result.rows[0]
    
    })
} 