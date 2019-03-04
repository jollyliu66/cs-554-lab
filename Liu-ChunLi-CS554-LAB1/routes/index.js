const tasksRoutes = require("./tasks");
const commentsRoutes = require("./comments");
const constructorMethod = app => {
  app.use("/", tasksRoutes);
  app.use("/", commentsRoutes);
 

  app.use("*", (req, res) => {
    res.sendStatus(404);
  });
};

module.exports = constructorMethod;
