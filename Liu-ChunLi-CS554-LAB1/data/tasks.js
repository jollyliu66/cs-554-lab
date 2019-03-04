const mongoCollections = require("../config/mongoCollections");
const tasks = mongoCollections.tasks;
const comments = mongoCollections.comments;
const uuid = require("node-uuid");

const exportedMethods = {
  async getAllTasks(skip, take) {
    if(typeof skip === 'undefined') skip = 0;
    if(typeof take === 'undefined') take = 20;
   
    skip = parseInt(skip);
    take = parseInt(take);

    if(isNaN(skip)|| isNaN(take)||skip <0||take <=0||take > 100){
      throw "invalid param";
    }
    const taskCollection = await tasks();
    const result = await taskCollection.find({}, '-_id').skip(skip).limit(take).toArray();
    return result;
  },
 
  async getTaskById(id) {
    const taskCollection = await tasks();
    const task = await taskCollection.findOne({ id: id });
    if (!task) throw "task not found";
    return task;
  },

  /*async getCommentById(id) {
    const taskCollection = await tasks();
    const comments = await taskCollection.findOne({ _id: id });
    if (!comments) throw "comments not found";
    return comments;
  },*/
  
  async addTask(title, description, hoursEstimated,completed,comments) {
    if (typeof title !== 'string') throw "title must be provided"
    if (typeof description !== 'string') throw "description must be provided"
    if (typeof hoursEstimated !== 'number') throw "hoursEstimated must be provided"
    if (typeof completed !== 'boolean') throw "completed must be provided"
    if (!Array.isArray(comments)) throw "comments must be provided"

    for(let i = 0; i < comments.length; i++){
      if((typeof comments[i].name !== 'string')||(typeof comments[i].comment !== 'string')){
        throw "comment or name must be string";
      }
      comments[i].id = uuid.v4();
      console.log(comments[i]);
    }
   
    const taskCollection = await tasks();
    let abc = uuid.v4();
    const newTask = { //object
      title:title,
      description:description,
      hoursEstimated:hoursEstimated,
      completed:completed,
      comments:comments,
      id: abc // set an id as the unique id
    };
    
    const newInsertInformation = await taskCollection.insertOne(newTask);
    console.log(newInsertInformation);
    //const newId = newInsertInformation.abc;
    //console.log(abc)
    return await this.getTaskById(abc);
  },
  
  
  async updateAll(id,updatedTask){
  let taskCollection = await tasks();
    
    if(!id)throw "invalid id";
    if ((typeof updatedTask.title!=="string")||(typeof updatedTask.description!=="string")||
    (typeof updatedTask.hoursEstimated!=="number")||(typeof updatedTask.completed!=="boolean")){
      throw "invalid input";
    };

    const result = await taskCollection.findOneAndUpdate(
        {id: id},
        {$set:{
          title: updatedTask.title,
          description:updatedTask.description,
          hoursEstimated: updatedTask.hoursEstimated,
          completed: updatedTask.completed

        }},
        {returnOriginal: false,projection:{_id:0}}
    )

    if (result)
    return result.value;
    else
    return {error: `no result`};
},

  async updateTask(id, updatedTask){
    
    const taskCollection = await tasks();
    const updatedDataTask={};

    if(!id)throw "invalid id";
    if ('title' in updatedTask){
      updatedDataTask.title = updatedTask.title;
    } 

    if ('description' in updatedTask){
      updatedDataTask.description = updatedTask.description;
    } 

    if ('hoursEstimated' in updatedTask){
      updatedDataTask.hoursEstimated = updatedTask.hoursEstimated;
    } 

    if ('completed' in updatedTask){
      updatedDataTask.completed = updatedTask.completed;
    } 


    let updateCommand = {
      $set: updatedDataTask
    };
   
    const query = {
      id: id
    };

    let result = await taskCollection.findOneAndUpdate(query, updateCommand,{returnOriginal: false,projection:{_id:0}});
    console.log(result);
    if (result)
    return result.value;
    else
    return {error: `no result`};
  },

}

module.exports = exportedMethods;