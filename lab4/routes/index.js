const redisRoutes = require("./redisRoutes");

const construterMethod=app=>{
    app.use("/",redisRoutes);
    app.use("*",(req,res)=>{
        res.sendStatus(404).json({error:"not found"})
    });
}

module.exports=construterMethod;