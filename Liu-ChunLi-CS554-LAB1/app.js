const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const configRoutes = require("./routes");// you need an index in folder

app.use(bodyParser.json());// the object we reference in router.post function


app.use(function(request, response, next) {
  const body = JSON.stringify(request.body)
  const http = request.method;
  const fulUrl = request.protocol + '://' + request.get('host') + request.originalUrl;

  console.log(`====================MiddleWare 1=======================
  ${body}is requesting ${fulUrl} and the HTTP verb is ${http}`)
  
  next();
});


let pathsAccessed = {}, totalNumberOfRequests = 0;
app.use(function(request, response, next) {
  totalNumberOfRequests++;
  const fulUrl = request.protocol + '://' + request.get('host') + request.originalUrl;
  if (!pathsAccessed[fulUrl]) pathsAccessed[fulUrl] = 0
    pathsAccessed[fulUrl]++;
  
  console.log(`======================MiddleWare 2==========================
the total number of requests is ${totalNumberOfRequests}
There have now been ${pathsAccessed[fulUrl]} requests made to ${fulUrl}`);

  for (let aPath in pathsAccessed) {
    aPath, pathsAccessed[aPath]
    console.log("there have now been " +  pathsAccessed[aPath] + " requests made to " + aPath)
  }
  next();
});


configRoutes(app);// apply the app.use(..)

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:3000");
});



