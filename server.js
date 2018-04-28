var express = require('express'),
  multer = require('multer'),
  app = express(),
  storage = multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, './uploads');
    },
    filename: function (req, file, callback) {
      callback(null, file.fieldname + '-' + Date.now());
    },
    size: 10000
  }),
  esClient = require("elasticsearch"),
  mongooseClient = require("mongoose"),
  bodyParser = require("body-parser")
  Task = require("./schema/task.schema");

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(function (req, res, next) {

  //set headers to allow cross origin request.
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
var DIR = './uploads/';

var upload = multer({ dest: DIR }).single('file');
var routes = require("./routes/task.routes");
routes(app, upload);

app.listen(3000, () => {
  console.log("Server Started")
})