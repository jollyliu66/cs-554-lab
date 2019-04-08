const bluebird = require("bluebird");
const data = require("../data")
const express = require("express");
const router = express.Router();
const redis = require("redis");
bluebird.promisifyAll(redis);
const client = redis.createClient();


async function keepLast20(id){
  const len = await client.llenAsync("last20");
  if(len === 20){
    await client.rpopAsync("last20");
  }
  return await client.lpushAsync("last20",id);
}

router.get("/api/people/history", async (req, res) => {
    try {
      
      let historyArray = [];
      const redisList = await client.lrangeAsync("last20",0,-1)
      for(let i = 0; i < redisList.length; i++){
        const entry = await client.getAsync(redisList[i]);
        console.log(entry)
        historyArray.push(JSON.parse(entry))
      }
     
      return res.status(200).json(historyArray)

      // send a JSON object as the response with a status code of 200
    } catch (e) {
      res.status(404).json({ error: "history not found: " + e });
    }
  });

  router.get("/api/people/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if(isNaN(id)){
      return res.status(400).json({error:"id is not valid"})
    }
    try{
      const redisExist = await client.existsAsync(id);
      if(redisExist === 1){
        console.log("in cache")
        await keepLast20(id);
        const redisData = await client.getAsync(id);
        console.log(redisData)
        return res.status(200).json(JSON.parse(redisData));
      }else{
        console.log("find in the disk");
        const dataInfo = await data.getById(id);
        console.log(dataInfo)
        await keepLast20(id);

        await client.setAsync(id,JSON.stringify(dataInfo))
        return res.status(200).json(dataInfo);
      }
    }catch(e){
      return res.status(500).json({error: "In get /:id " + e});
    }
  
  });

  module.exports = router;



