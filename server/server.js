import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import formidable from 'formidable';
import XLSX from 'xlsx';
import multer from 'multer';
// const pd = require('pretty-data').pd;
// import pd from 'pretty-data';
// var MyFunction = require('./xml.js');
// import MyFunction from './xml.js';

// var storage = multer.diskStorage({
//   destination: function (req, file, callback) {
//     callback(null, './uploads');
//   },
//   filename: function (req, file, callback) {
//     callback(null, file.fieldname + '-' + Date.now());
//   }
// });

//xml.js
// const fs = require('fs');
import fs from 'fs';
import xml2js from 'xml2js';
import excel from 'excel4node';
import AdmZip from 'adm-zip';
import ExcelJS from 'exceljs';
// import XLSX from 'xlsx';
import stringSimilarity from 'string-similarity';
// import MyCompare from './compare.js';
// var MyCompare = require('./compare.js');
// import XLSX from 'xlsx';

// var workBookFinal = XLSX.readFile('ExcelTemplate.xlsx'); //XLSX.utils.book_new();
// // fs.unlinkSync('./Extracted.xlsx');
// XLSX.writeFile(workBookFinal, 'Extracted.xlsx');
var i = 2, j = 1;

async function sleep(millis) {
  return new Promise(resolve => setTimeout(resolve, millis));
}

function compressFile(filename, callback) {
  var compress = zlib.createGzip(),
    input = fs.createReadStream(filename),
    output = fs.createWriteStream(filename + '.gz');

  input.pipe(compress).pipe(output);

  if (callback) {
    output.on('end', callback);
  }
}

async function MyFunction(theZipFile) {
  var zip = new AdmZip(theZipFile);
  var zipEntries = zip.getEntries();// an array of ZipEntry records
  // zipEntries.forEach(async function(zipEntry) {
  for await (const zipEntry of zipEntries) {
    await sleep(1000);
    console.log(zipEntry.entryName); // outputs zip entries information
    if (zipEntry.entryName.split('.').pop() == "xlsx") {
      var pmWorkbook = XLSX.readFile(zipEntry.entryName);
      var first_sheet_name = pmWorkbook.SheetNames[0];
      var pmWorksheet = pmWorkbook.Sheets[first_sheet_name];
      var workBook1 = XLSX.readFile('ExcelTemplate.xlsx');
      XLSX.utils.book_append_sheet(workBook1, pmWorksheet, first_sheet_name);
      let pmData = JSON.stringify(XLSX.utils.sheet_to_json(pmWorksheet), null, 2);
      // console.log(data);
      fs.writeFileSync('PM.json', pmData);
      await XLSX.writeFile(workBook1, 'Extracted.xlsx');
      // console.log(XLSX.utils.sheet_to_json(pmWorksheet));
    }
    if (zipEntry.entryName.split('.').pop() == "xml") {
      await MyXmlFunction(zipEntry.entryName, function (a) {
        console.log(a);
      })
    }

  }
  await sleep(1000);
  await MyCompare('Extracted.xlsx');
  await sleep(1000);
  var OutputZip = new AdmZip();
  OutputZip.addLocalFile("./Comparison.xlsx");
  OutputZip.addLocalFile("./Extracted.xlsx");
  OutputZip.writeZip("./Output.zip");
  // var CWorkbook = XLSX.readFile('Comparison.xlsx');
  // var Compare_sheet_name = CWorkbook.SheetNames[0];
  // var CWorksheet = CWorkbook.Sheets[Compare_sheet_name];
  // var workBookFinal = XLSX.readFile('Extracted.xlsx');
  // XLSX.utils.book_append_sheet(workBookFinal, CWorksheet, Compare_sheet_name);
  // await XLSX.writeFile(workBookFinal, 'Extracted.xlsx');
  await sleep(1000);
  return './Output.zip';
}

async function MyXmlFunction(theFile, callback) {

  var workBookTemp = XLSX.readFile('Extracted.xlsx');
  var ws = workBookTemp.Sheets['Extracted Data'];
  // console.log(XLSX.utils.sheet_to_json(ws));

  console.log(theFile);
  var parser = new xml2js.Parser();
  fs.readFile(theFile, async function (err, data) {
    parser.parseString(data, async function (err, result) {
      // console.dir(result);
      let data = JSON.stringify(result, null, 2);
      // console.log(data);
      fs.writeFileSync('xml.json', data);
      fs.writeFileSync('xml.txt', result);
      var quest = result.questionSet;
      var que = quest.question
      que.forEach(async function (value) {
        var tags = {};
        tags['LO'] = ``;
        tags['topic'] = ``;
        tags['AACSB'] = ``;
        tags['BB'] = ``;
        tags['FN'] = ``;
        tags['blooms'] = ``;
        tags['difficulty'] = ``;
        tags['time'] = ``;
        tags['title'] = value.title.toString();
        // console.log("value.title");
        value.categories.forEach(function (value1) {
          value1.internal_category.forEach(function (value2) {
            var tag = value2.title.toString();
            if (tag.includes("Learning Objective:")) {
              if (tags['LO'] !== '') {
                tags['LO'] += ', ';
              }
              tags['LO'] += tag.replace(/(.*)(\d{2,3})(-)(\d{2,3})(.*)/g, '$2$3$4');
            }
            if (tag.includes("Topic:")) {
              if (tags['topic'] !== '') {
                tags['topic'] += ', ';
              }
              tags['topic'] += tag.replace(/Topic: /g, '');
            }
            if (tag.includes("AACSB:")) {
              if (tags['AACSB'] !== '') {
                tags['AACSB'] += ', ';
              }
              tags['AACSB'] += tag.replace(/AACSB: /g, '');
            }
            if (tag.includes("AICPA: BB")) {
              if (tags['BB'] !== '') {
                tags['BB'] += ', ';
              }
              tags['BB'] += tag.replace(/AICPA: BB /g, '');
            }
            if (tag.includes("AICPA: FN")) {
              if (tags['FN'] !== '') {
                tags['FN'] += ', ';
              }
              tags['FN'] += tag.replace(/AICPA: FN /g, '');
            }
            if (tag.includes("Blooms:")) {
              if (tags['blooms'] !== '') {
                tags['blooms'] += ', ';
              }
              tags['blooms'] += tag.replace(/Blooms: /g, '');
            }
            if (tag.includes("Difficulty:")) {
              if (tags['difficulty'] !== '') {
                tags['difficulty'] += ', ';
              }
              tags['difficulty'] += tag.replace(/Difficulty: /g, '');
            }
            if (tag.includes("Est Time:")) {
              if (tags['time'] !== '') {
                tags['time'] += ', ';
              }
              tags['time'] += tag.replace(/Est Time: /g, '');
            }
            if (tag.includes("Type:")) {
              if (tags['type'] !== '') {
                tags['type'] += ', ';
              }
              tags['type'] += tag.replace(/Type: /g, '');
            }
            if (tag.includes("Gradable:")) {
              if (tags['gradable'] !== '') {
                tags['gradable'] += ', ';
              }
              tags['gradable'] += tag.replace(/Gradable: /g, '');
            }
          });
        });

        var rowVal = [
          [
            `${tags.title}`,
            `${tags.LO}`,
            `${tags.topic}`,
            `${tags.AACSB}`,
            `${tags.BB}`,
            `${tags.FN}`,
            `${tags.blooms}`,
            `${tags.difficulty}`,
            `${tags.time}`
          ]];
        XLSX.utils.sheet_add_aoa(ws, rowVal, { origin: `A${i}` });
        i++;
      });
      // console.log(XLSX.utils.sheet_to_json(ws));
      await XLSX.writeFile(workBookTemp, 'Extracted.xlsx');
      console.log('Done');
    });
  });
  callback('./Comparison.xlsx')
}
//xml.js

//Compare.js
// import XLSX from 'xlsx';
// import stringSimilarity from 'string-similarity';
// import fs from 'fs';
// import xl from 'excel4node';


async function MyCompare(theExcelFile) {

  var compareWB = new excel.Workbook();
  var style = compareWB.createStyle({
    font: {
      color: '#000000',
      size: 12,
    },
    numberFormat: '$#,##0.00; ($#,##0.00); -',
  });
  var styleNoMatch = compareWB.createStyle({
    font: {
      color: '#000000',
      size: 12,
    },
    fill: { // §18.8.20 fill (Fill)
      type: 'pattern', // Currently only 'pattern' is implemented. Non-implemented option is 'gradient'
      patternType: 'solid', //§18.18.55 ST_PatternType (Pattern Type)
      // bgColor: '#FF0000' // HTML style hex value. defaults to black
      fgColor: '#FF0000' // HTML style hex value. defaults to black.
    },
    numberFormat: '$#,##0.00; ($#,##0.00); -',
  });
  var WSoptions = {
    'sheetFormat': {
      'defaultColWidth': 30,
      // 'defaultRowHeight': 30
    },
  };
  var compareWS = compareWB.addWorksheet('Comparison Result', WSoptions);

  var cWorkBook = XLSX.readFile('Extracted.xlsx');
  var extWS = cWorkBook.Sheets['Extracted Data'];
  var extJson = XLSX.utils.sheet_to_json(extWS);
  var pmWS = cWorkBook.Sheets['Sheet1'];
  var pmJson = XLSX.utils.sheet_to_json(pmWS);
  var i = 2;
  for (let Que of extJson) {
    Que.Q = Que.Q.replace(/\[(.*)\]/g, "");
    var qNo = Que.Q.match(/(\d{1,2}-\d{1,3})/g);
    qNo[0] = qNo[0].replace(/\b0+/g, "");

    for (let pmQ of pmJson) {
      var pmQNo = pmQ.Q.match(/(\d{1,2}-\d{1,3})/g);
      if (qNo[0] === pmQNo[0]) {
        var LORes = LoCheck(Que.LO, pmQ.LO)
        var TopicRes = TopicCheck(Que.Topic, pmQ.Topic)
        var AacsbRes = AacsbCheck(Que.AACSB, pmQ.AACSB)
        var BBRes = BbCheck(Que.BB, pmQ.BB)
        var FNRes = FnCheck(Que.FN, pmQ.FN)
        var BloomsRes = BloomsCheck(Que.Blooms, pmQ.Blooms)
        var DiffRes = DifficultyCheck(Que.Difficulty, pmQ.Difficulty)
        var TimeRes = TimeCheck(Que.Time, pmQ.Time)
        // console.log(LORes);
        console.log(qNo[0], pmQNo[0]);
        compareWS.cell(i, 1)
          .string(Que.Q)
          .style(style);
        compareWS.cell(i, 2)
          .string(`Extracted Data: ${LORes['extract']}\r\nProblem Map Data: ${LORes['PM']}\r\nMatch: ${LORes['Result']}`)
          .style(((LORes['Result'] >= 0.95) ? style : styleNoMatch));
        compareWS.cell(i, 3)
          .string(`Extracted Data: ${TopicRes['extract']}\r\nProblem Map Data: ${TopicRes['PM']}\r\nMatch: ${TopicRes['Result']}`)
          .style(((TopicRes['Result'] >= 0.95) ? style : styleNoMatch));
        compareWS.cell(i, 4)
          .string(`Extracted Data: ${AacsbRes['extract']}\r\nProblem Map Data: ${AacsbRes['PM']}\r\nMatch: ${AacsbRes['Result']}`)
          .style(((AacsbRes['Result'] >= 0.95) ? style : styleNoMatch));
        compareWS.cell(i, 5)
          .string(`Extracted Data: ${BBRes['extract']}\r\nProblem Map Data: ${BBRes['PM']}\r\nMatch: ${BBRes['Result']}`)
          .style(((BBRes['Result'] >= 0.95) ? style : styleNoMatch));
        compareWS.cell(i, 6)
          .string(`Extracted Data: ${FNRes['extract']}\r\nProblem Map Data: ${FNRes['PM']}\r\nMatch: ${FNRes['Result']}`)
          .style(((FNRes['Result'] >= 0.95) ? style : styleNoMatch));
        compareWS.cell(i, 7)
          .string(`Extracted Data: ${BloomsRes['extract']}\r\nProblem Map Data: ${BloomsRes['PM']}\r\nMatch: ${BloomsRes['Result']}`)
          .style(((BloomsRes['Result'] >= 0.95) ? style : styleNoMatch));
        compareWS.cell(i, 8)
          .string(`Extracted Data: ${DiffRes['extract']}\r\nProblem Map Data: ${DiffRes['PM']}\r\nMatch: ${DiffRes['Result']}`)
          .style(((DiffRes['Result'] >= 0.95) ? style : styleNoMatch));
        compareWS.cell(i, 9)
          .string(`Extracted Data: ${TimeRes['extract']}\r\nProblem Map Data: ${TimeRes['PM']}\r\nMatch: ${TimeRes['Result']}`)
          .style(((TimeRes['Result'] >= 0.95) ? style : styleNoMatch));
      }
    }
    // console.log(qNo, Que.Q);
    i++;
  }
  console.log("Comp St")
  compareWB.write('./Comparison.xlsx');
  console.log("Comp End")

}

function LastWord(words) {
  var n = words.split(" ");
  return n[n.length - 1];
}

function hasNumbers(t) {
  var regex = /\d/g;
  return regex.test(t);
}

function MatchArray(a, b) {

  var result = {};
  b = b.replace(/  +/g, ',');
  b = b.replace('\r\n', ',');
  a = a.trim();
  b = b.trim();
  var x = a.split(/[,;]/g).sort();
  var y = b.split(/[,;]/g).sort();
  x = x.filter(Boolean);
  y = y.filter(Boolean);
  for (var i = 0; i < x.length; i++) {
    x[i] = x[i].trim();
  }
  for (i = 0; i < x.length; i++) {
    y[i] = y[i].trim();
  }
  x = x.sort();
  y = y.sort();
  result['extract'] = x.toString();
  result['PM'] = y.toString();
  result['Result'] = stringSimilarity.compareTwoStrings(x.toString(), y.toString());
  // console.log(x, ',', y,',',':',result)
  return result;

}


function LoCheck(extLO, pmLO) {
  var a = extLO.match(/(\d{1,2}-\d{1,3})/g);
  var b = pmLO.match(/(\d{1,2}-\d{1,3})/g);
  return MatchArray(a.toString(), b.toString())
}

function TopicCheck(extTop, pmTop) {
  var a = extTop;
  var b = pmTop;
  return MatchArray(a, b)
}

function AacsbCheck(extAA, pmAA) {
  var a = extAA;
  var b = pmAA;
  return MatchArray(a, b)
}

function BbCheck(extBB, pmBB) {
  var a = extBB;
  var b = pmBB;
  return MatchArray(a, b)
}

function FnCheck(extFN, pmFN) {
  var a = extFN;
  var b = pmFN;
  return MatchArray(a, b)
}

function BloomsCheck(extBloom, pmBloom) {
  var a = extBloom;
  var b = pmBloom;
  if (hasNumbers(a)) {
    a = LastWord(a);
  }
  if (hasNumbers(b)) {
    b = LastWord(b);
  }
  return MatchArray(a, b)
}

function DifficultyCheck(extDiff, pmDiff) {
  var a = extDiff;
  var b = pmDiff;
  if (hasNumbers(a)) {
    a = LastWord(a);
  }
  if (hasNumbers(b)) {
    b = LastWord(b);
  }
  return MatchArray(a, b)
}

function TimeCheck(extTime, pmTime) {
  var a = extTime.match(/(\d{1,3})/g);
  var b = pmTime.match(/(\d{1,3})/g);
  // console.log(parseInt(a[a.length - 1]), parseInt(b[b.length - 1]));
  // MatchArray (a, b)
  var result = {};
  result['extract'] = parseInt(a[a.length - 1])
  result['PM'] = parseInt(b[b.length - 1])
  result['Result'] = (result['extract'] === result['PM']) ? 1 : 0;
  // console.log('time',result)
  return result;
}

//Compare.js
var storage = multer.memoryStorage()
var upload = multer({ storage: storage }).single('userPhoto');

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
  upload(req, res, async function (err) {
    if (err) {
      return res.end("Error uploading file.");
    }
    console.log("Call");
    var workbook = await MyFunction(`${req.file.originalname}`);
    console.log("Result", workbook);
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
