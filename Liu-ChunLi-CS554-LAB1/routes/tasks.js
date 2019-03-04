const express = require("express");
const router = express.Router();
const taskdata = require("../data/tasks");


router.get("/api/tasks", async (req, res) => {
  try {
    const taskList = await taskdata.getAllTasks(req.query.skip, req.query.take);
    res.json(taskList);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

function newList(taskList){
  if(!Array.isArray(taskList)){
    return [];
  }
  let arr =[];
  taskList.forEach(obj=>{
    arr.push({
      "id":obj.id,
      "title":obj.title,
      "description" :obj.description,
      "hoursEstimated": obj.hoursEstimated,
      "completed" : obj.completed,
      "comments" :obj.comments
    })
  })
  return arr;
}

router.get("/api/tasks/:id", async (req, res) => {
  try {
    const task = await taskdata.getTaskById(req.params.id);
    res.json(task);// send a JSON object as the response with a status code of 200
  } catch (e) {
    res.status(404).json({ error: "task not found" });
  }
});


router.post("/api/tasks", async (req, res) => {// define a router
  const newTaskData = req.body;
  
  try {
    console.log(newTaskData);
  
    const createdTask = await taskdata.addTask(newTaskData.title, newTaskData.description, newTaskData.hoursEstimated,newTaskData.completed,newTaskData.comments);
  
    res.json(createdTask);
   
    
  } catch (e) {
    res.status(500).json({ error: e });
    console.log(e)
  }
});



router.put("/api/tasks/:id", async (req, res) => {
  console.log("------------------------------");
  const newTaskData = req.body;
  console.log(newTaskData);
  try{
    
    await taskdata.getTaskById(req.params.id);
  }catch(e){
      res.status(404).json({error:"task not found"});
      return;
  }

  try{
    const updatedTask = await taskdata.updateAll(req.params.id, newTaskData);
    res.json(updatedTask);
    //console.log(updatedTask);

  }catch(e){
    
    res.status(500).json({error: e});
    console.log(e);

  }
});

router.patch("/api/tasks/:id", async (req, res) => {// update data
  const newTaskData = req.body;
  try{
    
    await taskdata.getTaskById(req.params.id);
  }catch(e){
      res.status(404).json({error:"task not found"});
      return;
  }

  try{
    const updatedTask = await taskdata.updateTask(req.params.id, newTaskData);
    res.json(updatedTask);

  }catch(e){
    console.log(e);
    res.status(500).json({error: e});

  }
});


module.exports = router;
