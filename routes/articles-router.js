const articlesRouter = require("express").Router();
const {getArticleById, getArticles, patchArticleById} = require("../controllers/articles-controller");
const {getCommentsByArticleId, postCommentOnArticle} = require("../controllers/comments-controllers");
const { handleBadMethod } = require("../controllers/errors.controllers");

articlesRouter.route("/").get(getArticles).all(handleBadMethod);

articlesRouter
  .route("/:article_id")
  .get(getArticleById)
  .patch(patchArticleById)
  .all(handleBadMethod);

articlesRouter
  .route("/:article_id/comments")
  .get(getCommentsByArticleId)
  .post(postCommentOnArticle)
  .all(handleBadMethod);

module.exports = articlesRouter;