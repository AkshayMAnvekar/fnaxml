import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import formidable from 'formidable';
import XLSX from 'xlsx';
import multer from 'multer';

// var storage = multer.diskStorage({
//   destination: function (req, file, callback) {
//     callback(null, './uploads');
//   },
//   filename: function (req, file, callback) {
//     callback(null, file.fieldname + '-' + Date.now());
//   }
// });
var storage = multer.memoryStorage()
var upload = multer({ storage: storage }).single('userPhoto');

// import pd from 'pretty-data';
const pd = require('pretty-data').pd;

var MyFunction = require('../xml.js');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const CURRENT_WORKING_DIR = process.cwd();

app.use(express.static(path.join(CURRENT_WORKING_DIR, 'public')));

app.get('/test', (req, res)=>{
      res.send('My page');
})
app.get('/test1', (req, res)=>{
      res.send('My page 2');
})
app.get('/getfile1', (req, res)=>{
      console.log(req.query)
      res.send('My page 2');
})
app.post('/getfile', (req, res)=>{
  upload(req, res, function (err) {
    if (err) {
      return res.end("Error uploading file.");
    }
    var workbook = MyFunction(`${req.file.originalname}`);
    return res.download(
      workbook
     )
    res.end("File is uploaded");
  });
})

app.get('*', (req, res)=>{
  res.send('My web page');
})

const PORT = process.env.PORT || 3000
app.listen(PORT);
