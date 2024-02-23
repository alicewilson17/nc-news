const apiRouter = require('express').Router();
const articlesRouter = require("./articles-router");
const commentsRouter = require("./comments-router");
const topicsRouter = require("./topics-router");
const usersRouter = require("./users-router");

const { getEndPoints } = require("../controllers/api-controller")
const { handleBadMethod } = require("../controllers/errors.controllers")

apiRouter.route("/").get(getEndPoints).all(handleBadMethod);

apiRouter.use("/topics", topicsRouter);
apiRouter.use("/users", usersRouter);
apiRouter.use("/articles", articlesRouter);
apiRouter.use("/comments", commentsRouter);

module.exports = apiRouter