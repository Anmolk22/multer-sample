var express = require("express"),
    app = express(),
    mongoClient = require("mongodb").MongoClient,
    assert = require("assert"),
    mongoRoutes = require("./routes/mongo_routes"),
    bodyParser = require("body-parser");

const url = "mongodb://localhost:27017";

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(function (req, res, next) {

    //set headers to allow cross origin request.
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });


mongoRoutes(mongoClient, url, app);
app.listen(3000, ()=> {
    console.log("Server has been started");
})