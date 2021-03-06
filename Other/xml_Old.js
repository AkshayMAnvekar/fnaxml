// const fs = require('fs');
import fs from 'fs';
import xml2js from 'xml2js';
import excel from 'excel4node';
import AdmZip from 'adm-zip';
import ExcelJS from 'exceljs';
import XLSX from 'xlsx';
import stringSimilarity from 'string-similarity';
import MyCompare from './compare.js';
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
  fs.readFile(theFile, async function(err, data) {
    parser.parseString(data, async function (err, result) {
      // console.dir(result);
      let data = JSON.stringify(result, null, 2);
      // console.log(data);
      fs.writeFileSync('xml.json', data);
      fs.writeFileSync('xml.txt', result);
      var quest = result.questionSet;
      var que = quest.question
      que.forEach(async function(value) {
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
        value.categories.forEach(function(value1) {
          value1.internal_category.forEach(function(value2) {
            var tag = value2.title.toString();
            if(tag.includes("Learning Objective:")) {
              if(tags['LO'] !== '') {
                tags['LO'] += ', ';
              }
              console.log(tag)
              tags['LO'] += tag.replace(/(.*)(\d{2,3})(-)(\d{2,3})(.*)/g,'$2$3$4');
            }
            if(tag.includes("Topic:")) {
              if(tags['topic'] !== '') {
                tags['topic'] += ', ';
              }
              tags['topic'] += tag.replace(/Topic: /g,'');
            }
            if(tag.includes("AACSB:")) {
              if(tags['AACSB'] !== '') {
                tags['AACSB'] += ', ';
              }
              tags['AACSB'] += tag.replace(/AACSB: /g,'');
            }
            if(tag.includes("AICPA: BB")) {
              if(tags['BB'] !== '') {
                tags['BB'] += ', ';
              }
              tags['BB'] += tag.replace(/AICPA: BB /g,'');
            }
            if(tag.includes("AICPA: FN")) {
              if(tags['FN'] !== '') {
                tags['FN'] += ', ';
              }
              tags['FN'] += tag.replace(/AICPA: FN /g,'');
            }
            if(tag.includes("Blooms:")) {
              if(tags['blooms'] !== '') {
                tags['blooms'] += ', ';
              }
              tags['blooms'] += tag.replace(/Blooms: /g,'');
            }
            if(tag.includes("Difficulty:")) {
              if(tags['difficulty'] !== '') {
                tags['difficulty'] += ', ';
              }
              tags['difficulty'] += tag.replace(/Difficulty: /g,'');
            }
            if(tag.includes("Est Time:")) {
              if(tags['time'] !== '') {
                tags['time'] += ', ';
              }
              tags['time'] += tag.replace(/Est Time: /g,'');
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
        ] ];
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

// module.exports = MyFunction;
export default MyFunction;
