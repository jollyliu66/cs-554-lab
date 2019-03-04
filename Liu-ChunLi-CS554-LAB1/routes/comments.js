const express = require('express');
const router = express.Router();
const commentsData = require("../data/comments");

router.post("/api/tasks/:id/comments", async (req, res) => {// define a router
  
  
  
    const data = req.body;// we reference the object called req.body
    
    try {
      console.log(data);
      const createdComment = await commentsData.addComment(req.params.id, data.name,data.comment);
      console.log(createdComment);
  
      res.status(200).json(createdComment);
      
    } catch (e) {
      res.status(500).json({ error: e });
      console.log(e);
    }
  
  });

  router.delete("/api/tasks/:taskId/:commentId", async (req, res) => {
   
  
    try {
      
      const result = await commentsData.removeCommentById(req.params.taskId, req.params.commentId );
      res.status(200).json(result);
    } catch (e) {
      res.sendStatus(500).json({ error: e });;
      return;
    }
  });
  module.exports = router;
      

