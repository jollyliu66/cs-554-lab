const mongoCollections = require("../config/mongoCollections");
const tasks = mongoCollections.tasks;
const uuid = require("node-uuid");


const exportedMethods = {
    async addComment(id,name,comment) {
        
        if ( typeof name !== 'string'|| typeof comment !== 'string') throw "you must provide a name or comment"
        const taskCollection = await tasks();
        const result = await taskCollection.findOneAndUpdate(
            {id: id},
            {$push: {
                comments: {
                    id: uuid.v4(),
                    name: name,
                    comment, comment
                }
            }},
            {returnOriginal: false,projection:{_id:0}}
        )
        //const newId = newInsertInformation.insertedId;
        //console.log(result);
        //return await this.getTaskById(newId);
        if (result)
        return result.value;
        else
        return {error: `no result`};


        /*return taskCollection.updateOne({_id:id},{$push:{"comments":newComment}}).then(function(){
            return exportedMethods.getTaskById(id).then((comments)=>{
                return comments;
            },(err)=>{
                return Promise.reject("Cannot add this comment");
            })
        })*/
    },
      async removeCommentById(taskId,commentId) {
        const taskCollection = await tasks();
        const result = await taskCollection.findOneAndUpdate(
            {id: taskId},
            {$pull: {
                comments: {
                    id: commentId
                }
            }},
            {returnOriginal: false,projection:{_id:0}}
        )
        //const newId = newInsertInformation.insertedId;
        //console.log(result);
        //return await this.getTaskById(newId);
        if (result)
        return result.value;
        else
        return {error: `no result`};
        
    }
}

module.exports = exportedMethods;


      
    


         
    
     
       
    


    