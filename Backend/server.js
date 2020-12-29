var express = require("express");
var path = require("path");
var app = express();
var fs = require("fs");
var mongoose = require("mongoose");
var multer = require("multer");
var bodyParser = require("body-parser");
const cors = require("cors");
var uploadImage = require("./uploadImageSchema");
var categoryCollection = require("./categorySchema");
app.use(cors());

var upload = multer({ dest: "uploads/" });

app.use(express.static(path.join(__dirname, "uploads")));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());
mongoose.connect("mongodb://localhost:27017/myntradb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname + "-" + Date.now());
  },
});

var upload = multer({ storage: storage });

app.post("/uploadImage", upload.single("filedata"), async (req, res, next) => {
  console.log("req.body", req.body, req.body.category);

  if (req.file) {
    console.log("req.file.filename", req.file.filename);
    req.body.filename = req.file.filename;
    req.body.mimetype = req.file.mimetype;
    req.body.originalname = req.file.originalname;
    req.body.path = req.file.path;
    req.body.category = req.body.category;
    uploadImage.create(req.body, function (result) {
      console.log("new data arrived", req.body);
      res.send({ msg: "image saveds on datatbase!" });
    });
  }
});

app.post("/createCategory", (req, res) => {
  console.log("inside create category api", req.body.categoryName);
  categoryCollection.find(
    { category: req.body.categoryName },
    function (err, data) {
      if (data.length) {
        console.log("category exists!", data[0]);
        res.send(data[0]);
      } else {
        categoryCollection.create(
          { category: req.body.categoryName },
          function (err, result) {
            console.log("new category arrived", result);
            res.send(result);
          }
        );
      }
    }
  );
});

app.get("/getCategoryCollection", function (req, res) {
  console.log("inside get call of category collection ");
  categoryCollection
    .find({})
    .populate("album")
    .sort({ createdAt: -1 })
    .exec((err, data) => {
      if (err) throw err;
      else {
        console.log("display category data in get call@@@@", data);
        res.send(data);
      }
    });
});

app.get("/retrieveImage", function (req, res) {
  console.log("inside get call of display image ");
  uploadImage
    .find({})
    .sort({ createdAt: -1 })
    .exec((err, data) => {
      if (err) throw err;
      else {
        console.log("display image data in get call@@@@", data);
        res.send(data);
      }
    });
});

app.post("/retrieveAlbumImageApi", (req, res) => {
  console.log("category", req.body, req.body.category);

  uploadImage
    .find({ category: req.body.categoryId })
    .sort({ createdAt: -1 })
    .exec((err, data) => {
      if (err) throw err;
      else {
        console.log("data retrieveAlbumImageApi", data);
        res.send(data);
      }
    });
});

app.post("/retrieveAlbumFirstImageApi", (req, res) => {
  console.log("category of first image :::::::::::::", req.body);
  uploadImage
    .findOne({ category: req.body.category })
    .populate("category")
    .sort({ createdAt: -1 })
    .limit(1)
    .exec((err, data) => {
      if (err) throw err;
      else {
        console.log("data retrieveAlbumImageApi", data);
        res.send(data);
      }
    });
});

var server = app.listen(9002, () => {
  var host = server.address().address;
  var port = server.address().port;
  console.log("server is running at http://%s:%s", host, port);
});
