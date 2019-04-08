const express = require("express");
// const bodyParser = require("body-parser");
const app = express();
const configRoutes = require("./routes");// you need an index in folder

// app.use(bodyParser.json());// the object we reference in router.post function
configRoutes(app);// apply the app.use(..)

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:3000");
});
