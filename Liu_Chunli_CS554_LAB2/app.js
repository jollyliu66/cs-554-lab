const express = require('express');
const app = express();
const static = express.static(__dirname + '/public'); // this means absolutly path
 app.use(static);

 app.use("/*",(req,res)=>{
     res.status(404).json({error:"404 not found"});
 
 });

 app.listen(8080,()=>{
	 console.log("We've now got a server!");
     console.log("Your routes will be running on http://localhost:8080/");
 })

