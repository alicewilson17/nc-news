const commentsRouter = require("express").Router();
const {deleteCommentById} = require("../controllers/comments-controllers");
const { handleBadMethod } = require("../controllers/errors.controllers");

commentsRouter
  .route("/:comment_id")
  .delete(deleteCommentById)
  .all(handleBadMethod);

module.exports = commentsRouter;