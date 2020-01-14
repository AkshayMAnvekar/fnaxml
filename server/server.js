const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const formidable = require('formidable');
const XLSX = require('xlsx');
const multer = require('multer');
const fs = require('fs');

// const pd = require('pretty-data').pd;
// import pd from 'pretty-data';
const MyFunction = require('./xml.js');
// import MyFunction from './xml.js';

// var storage = multer.diskStorage({
//   destination: function (req, file, callback) {
//     callback(null, './uploads');
//   },
//   filename: function (req, file, callback) {
//     callback(null, file.fieldname + '-' + Date.now());
//   }
// });
var storage = multer.memoryStorage()
// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'public/uploads')
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.fieldname + '-' + Date.now())
//   }
// })
var upload = multer({ storage: storage }).single('myFile');

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
// app.post('/ExcelTemplate', (req, res) => {
//   upload(req, res, async function (err) {
//     if (err) {
//       return res.end("Error uploading file.");
//     }
//     console.log("Template");

//     return res.download(
//       './public/ExcelTemplate.xlsx'
//     )
//     res.end("File is uploaded");
//   });
//   console.log(req.query)
// });
app.post('/getfile', (req, res)=>{
  upload(req, res, async function (err) {
    if (err) {
      return res.end("Error uploading file.");
    }
    console.log("MyFunction Call");
    console.log(req.file.buffer)
    console.log("File Wirter Call");
    // var workbook = await MyFunction(`${req.file.originalname}`);
    // fs.writeFileSync(req.file.buffer, 'Archive.zip');
    console.log("File Wirter Close");
    // var workbook = MyFunction(`${req.file.originalname}`);
    var workbook = await MyFunction(req.file.buffer);
    console.log("Result", workbook);
    return res.download(
      workbook
    )
    res.end("File is uploaded");
  });
})
// app.post('/getfile', upload.single('myFile'), (req, res, next) => {
//   const file = req.file
//   if (!file) {
//     const error = new Error('Please upload a file')
//     error.httpStatusCode = 400
//     return next(error)
//   }
//   console.log("MyFunction Call");
//   console.log(req.file.originalname)
//   // var workbook = await MyFunction(`${req.file.originalname}`);
//   var workbook = MyFunction(`${req.file.originalname}`);

//   console.log("Result", workbook);
//   return res.download(
//     workbook
//   )
//   res.end("File is uploaded");
// })

app.get('*', (req, res)=>{
  res.send('My web page');
})

const PORT = process.env.PORT || 3000
app.listen(PORT);
