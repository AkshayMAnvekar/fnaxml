module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./server/compare.js":
/*!***************************!*\
  !*** ./server/compare.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var XLSX = __webpack_require__(/*! xlsx */ \"xlsx\");\n\nvar stringSimilarity = __webpack_require__(/*! string-similarity */ \"string-similarity\");\n\nvar fs = __webpack_require__(/*! fs */ \"fs\");\n\nvar xl = __webpack_require__(/*! excel4node */ \"excel4node\");\n\nasync function MyCompare(theExcelFile) {\n  var compareWB = new xl.Workbook();\n  var style = compareWB.createStyle({\n    font: {\n      color: '#000000',\n      size: 12\n    },\n    numberFormat: '$#,##0.00; ($#,##0.00); -'\n  });\n  var styleNoMatch = compareWB.createStyle({\n    font: {\n      color: '#000000',\n      size: 12\n    },\n    fill: {\n      // §18.8.20 fill (Fill)\n      type: 'pattern',\n      // Currently only 'pattern' is implemented. Non-implemented option is 'gradient'\n      patternType: 'solid',\n      //§18.18.55 ST_PatternType (Pattern Type)\n      // bgColor: '#FF0000' // HTML style hex value. defaults to black\n      fgColor: '#FF0000' // HTML style hex value. defaults to black.\n\n    },\n    numberFormat: '$#,##0.00; ($#,##0.00); -'\n  });\n  var WSoptions = {\n    'sheetFormat': {\n      'defaultColWidth': 30 // 'defaultRowHeight': 30\n\n    }\n  };\n  var compareWS = compareWB.addWorksheet('Comparison Result', WSoptions);\n  var cWorkBook = XLSX.readFile('Extracted.xlsx');\n  var extWS = cWorkBook.Sheets['Extracted Data'];\n  var extJson = XLSX.utils.sheet_to_json(extWS);\n  var pmWS = cWorkBook.Sheets['Sheet1'];\n  var pmJson = XLSX.utils.sheet_to_json(pmWS);\n  var i = 2;\n\n  for (let Que of extJson) {\n    Que.Q = Que.Q.replace(/\\[(.*)\\]/g, \"\");\n    var qNo = Que.Q.match(/(\\d{1,2}-\\d{1,3})/g);\n    qNo[0] = qNo[0].replace(/\\b0+/g, \"\");\n\n    for (let pmQ of pmJson) {\n      var pmQNo = pmQ.Q.match(/(\\d{1,2}-\\d{1,3})/g);\n\n      if (qNo[0] === pmQNo[0]) {\n        var LORes = LoCheck(Que.LO, pmQ.LO);\n        var TopicRes = TopicCheck(Que.Topic, pmQ.Topic);\n        var AacsbRes = AacsbCheck(Que.AACSB, pmQ.AACSB);\n        var BBRes = BbCheck(Que.BB, pmQ.BB);\n        var FNRes = FnCheck(Que.FN, pmQ.FN);\n        var BloomsRes = BloomsCheck(Que.Blooms, pmQ.Blooms);\n        var DiffRes = DifficultyCheck(Que.Difficulty, pmQ.Difficulty);\n        var TimeRes = TimeCheck(Que.Time, pmQ.Time); // console.log(LORes);\n\n        console.log(qNo[0], pmQNo[0]);\n        compareWS.cell(i, 1).string(Que.Q).style(style);\n        compareWS.cell(i, 2).string(`Extracted Data: ${LORes['extract']}\\r\\nProblem Map Data: ${LORes['PM']}\\r\\nMatch: ${LORes['Result']}`).style(LORes['Result'] >= 0.95 ? style : styleNoMatch);\n        compareWS.cell(i, 3).string(`Extracted Data: ${TopicRes['extract']}\\r\\nProblem Map Data: ${TopicRes['PM']}\\r\\nMatch: ${TopicRes['Result']}`).style(TopicRes['Result'] >= 0.95 ? style : styleNoMatch);\n        compareWS.cell(i, 4).string(`Extracted Data: ${AacsbRes['extract']}\\r\\nProblem Map Data: ${AacsbRes['PM']}\\r\\nMatch: ${AacsbRes['Result']}`).style(AacsbRes['Result'] >= 0.95 ? style : styleNoMatch);\n        compareWS.cell(i, 5).string(`Extracted Data: ${BBRes['extract']}\\r\\nProblem Map Data: ${BBRes['PM']}\\r\\nMatch: ${BBRes['Result']}`).style(BBRes['Result'] >= 0.95 ? style : styleNoMatch);\n        compareWS.cell(i, 6).string(`Extracted Data: ${FNRes['extract']}\\r\\nProblem Map Data: ${FNRes['PM']}\\r\\nMatch: ${FNRes['Result']}`).style(FNRes['Result'] >= 0.95 ? style : styleNoMatch);\n        compareWS.cell(i, 7).string(`Extracted Data: ${BloomsRes['extract']}\\r\\nProblem Map Data: ${BloomsRes['PM']}\\r\\nMatch: ${BloomsRes['Result']}`).style(BloomsRes['Result'] >= 0.95 ? style : styleNoMatch);\n        compareWS.cell(i, 8).string(`Extracted Data: ${DiffRes['extract']}\\r\\nProblem Map Data: ${DiffRes['PM']}\\r\\nMatch: ${DiffRes['Result']}`).style(DiffRes['Result'] >= 0.95 ? style : styleNoMatch);\n        compareWS.cell(i, 9).string(`Extracted Data: ${TimeRes['extract']}\\r\\nProblem Map Data: ${TimeRes['PM']}\\r\\nMatch: ${TimeRes['Result']}`).style(TimeRes['Result'] >= 0.95 ? style : styleNoMatch);\n      }\n    } // console.log(qNo, Que.Q);\n\n\n    i++;\n  }\n\n  console.log(\"Comp St\");\n  compareWB.write('./Comparison.xlsx');\n  console.log(\"Comp End\");\n}\n\nfunction LastWord(words) {\n  var n = words.split(\" \");\n  return n[n.length - 1];\n}\n\nfunction hasNumbers(t) {\n  var regex = /\\d/g;\n  return regex.test(t);\n}\n\nfunction MatchArray(a, b) {\n  var result = {};\n  b = b.replace(/  +/g, ',');\n  b = b.replace('\\r\\n', ',');\n  a = a.trim();\n  b = b.trim();\n  x = a.split(/[,;]/g).sort();\n  y = b.split(/[,;]/g).sort();\n  x = x.filter(Boolean);\n  y = y.filter(Boolean);\n\n  for (i = 0; i < x.length; i++) {\n    x[i] = x[i].trim();\n  }\n\n  for (i = 0; i < x.length; i++) {\n    y[i] = y[i].trim();\n  }\n\n  x = x.sort();\n  y = y.sort();\n  result['extract'] = x.toString();\n  result['PM'] = y.toString();\n  result['Result'] = stringSimilarity.compareTwoStrings(x.toString(), y.toString()); // console.log(x, ',', y,',',':',result)\n\n  return result;\n}\n\nfunction LoCheck(extLO, pmLO) {\n  var a = extLO.match(/(\\d{1,2}-\\d{1,3})/g);\n  var b = pmLO.match(/(\\d{1,2}-\\d{1,3})/g);\n  return MatchArray(a.toString(), b.toString());\n}\n\nfunction TopicCheck(extTop, pmTop) {\n  var a = extTop;\n  var b = pmTop;\n  return MatchArray(a, b);\n}\n\nfunction AacsbCheck(extAA, pmAA) {\n  var a = extAA;\n  var b = pmAA;\n  return MatchArray(a, b);\n}\n\nfunction BbCheck(extBB, pmBB) {\n  var a = extBB;\n  var b = pmBB;\n  return MatchArray(a, b);\n}\n\nfunction FnCheck(extFN, pmFN) {\n  var a = extFN;\n  var b = pmFN;\n  return MatchArray(a, b);\n}\n\nfunction BloomsCheck(extBloom, pmBloom) {\n  var a = extBloom;\n  var b = pmBloom;\n\n  if (hasNumbers(a)) {\n    a = LastWord(a);\n  }\n\n  if (hasNumbers(b)) {\n    b = LastWord(b);\n  }\n\n  return MatchArray(a, b);\n}\n\nfunction DifficultyCheck(extDiff, pmDiff) {\n  var a = extDiff;\n  var b = pmDiff;\n\n  if (hasNumbers(a)) {\n    a = LastWord(a);\n  }\n\n  if (hasNumbers(b)) {\n    b = LastWord(b);\n  }\n\n  return MatchArray(a, b);\n}\n\nfunction TimeCheck(extTime, pmTime) {\n  var a = extTime.match(/(\\d{1,3})/g);\n  var b = pmTime.match(/(\\d{1,3})/g); // console.log(parseInt(a[a.length - 1]), parseInt(b[b.length - 1]));\n  // MatchArray (a, b)\n\n  var result = {};\n  result['extract'] = parseInt(a[a.length - 1]);\n  result['PM'] = parseInt(b[b.length - 1]);\n  result['Result'] = result['extract'] === result['PM'] ? 1 : 0; // console.log('time',result)\n\n  return result;\n}\n\nmodule.exports = MyCompare;\n\n//# sourceURL=webpack:///./server/compare.js?");

/***/ }),

/***/ "./server/server.js":
/*!**************************!*\
  !*** ./server/server.js ***!
  \**************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var body_parser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! body-parser */ \"body-parser\");\n/* harmony import */ var body_parser__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(body_parser__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var formidable__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! formidable */ \"formidable\");\n/* harmony import */ var formidable__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(formidable__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var xlsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! xlsx */ \"xlsx\");\n/* harmony import */ var xlsx__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(xlsx__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var multer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! multer */ \"multer\");\n/* harmony import */ var multer__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(multer__WEBPACK_IMPORTED_MODULE_5__);\n\n\n\n\n\n\n\nconst pd = __webpack_require__(/*! pretty-data */ \"pretty-data\").pd; // import pd from 'pretty-data';\n\n\nvar MyFunction = __webpack_require__(/*! ./xml.js */ \"./server/xml.js\"); // var storage = multer.diskStorage({\n//   destination: function (req, file, callback) {\n//     callback(null, './uploads');\n//   },\n//   filename: function (req, file, callback) {\n//     callback(null, file.fieldname + '-' + Date.now());\n//   }\n// });\n\n\nvar storage = multer__WEBPACK_IMPORTED_MODULE_5___default.a.memoryStorage();\nvar upload = multer__WEBPACK_IMPORTED_MODULE_5___default()({\n  storage: storage\n}).single('userPhoto');\nconst app = express__WEBPACK_IMPORTED_MODULE_0___default()();\napp.use(body_parser__WEBPACK_IMPORTED_MODULE_2___default.a.urlencoded({\n  extended: false\n}));\napp.use(body_parser__WEBPACK_IMPORTED_MODULE_2___default.a.json());\nconst CURRENT_WORKING_DIR = process.cwd();\napp.use(express__WEBPACK_IMPORTED_MODULE_0___default.a.static(path__WEBPACK_IMPORTED_MODULE_1___default.a.join(CURRENT_WORKING_DIR, 'public')));\napp.get('/test', (req, res) => {\n  res.send('My page');\n});\napp.get('/test1', (req, res) => {\n  res.send('My page 2');\n});\napp.get('/getfile1', (req, res) => {\n  console.log(req.query);\n  res.send('My page 2');\n});\napp.post('/getfile', (req, res) => {\n  upload(req, res, async function (err) {\n    if (err) {\n      return res.end(\"Error uploading file.\");\n    }\n\n    console.log(\"Call\");\n    var workbook = await MyFunction(`${req.file.originalname}`);\n    console.log(\"Result\", workbook);\n    return res.download(workbook);\n    res.end(\"File is uploaded\");\n  });\n});\napp.get('*', (req, res) => {\n  res.send('My web page');\n});\nconst PORT = process.env.PORT || 3000;\napp.listen(PORT);\n\n//# sourceURL=webpack:///./server/server.js?");

/***/ }),

/***/ "./server/xml.js":
/*!***********************!*\
  !*** ./server/xml.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// const fs = require('fs');\nvar fs = __webpack_require__(/*! fs */ \"fs\"),\n    xml2js = __webpack_require__(/*! xml2js */ \"xml2js\");\n\nvar excel = __webpack_require__(/*! excel4node */ \"excel4node\");\n\nvar AdmZip = __webpack_require__(/*! adm-zip */ \"adm-zip\"),\n    ExcelJS = __webpack_require__(/*! exceljs */ \"exceljs\");\n\nvar XLSX = __webpack_require__(/*! xlsx */ \"xlsx\");\n\nvar stringSimilarity = __webpack_require__(/*! string-similarity */ \"string-similarity\");\n\nvar MyCompare = __webpack_require__(/*! ./compare.js */ \"./server/compare.js\"); // var workBookFinal = XLSX.readFile('ExcelTemplate.xlsx'); //XLSX.utils.book_new();\n// // fs.unlinkSync('./Extracted.xlsx');\n// XLSX.writeFile(workBookFinal, 'Extracted.xlsx');\n\n\nvar i = 2,\n    j = 1;\n\nasync function sleep(millis) {\n  return new Promise(resolve => setTimeout(resolve, millis));\n}\n\nfunction compressFile(filename, callback) {\n  var compress = zlib.createGzip(),\n      input = fs.createReadStream(filename),\n      output = fs.createWriteStream(filename + '.gz');\n  input.pipe(compress).pipe(output);\n\n  if (callback) {\n    output.on('end', callback);\n  }\n}\n\nasync function MyFunction(theZipFile) {\n  var zip = new AdmZip(theZipFile);\n  var zipEntries = zip.getEntries(); // an array of ZipEntry records\n  // zipEntries.forEach(async function(zipEntry) {\n\n  for await (const zipEntry of zipEntries) {\n    await sleep(1000);\n    console.log(zipEntry.entryName); // outputs zip entries information\n\n    if (zipEntry.entryName.split('.').pop() == \"xlsx\") {\n      var pmWorkbook = XLSX.readFile(zipEntry.entryName);\n      var first_sheet_name = pmWorkbook.SheetNames[0];\n      var pmWorksheet = pmWorkbook.Sheets[first_sheet_name];\n      var workBook1 = XLSX.readFile('ExcelTemplate.xlsx');\n      XLSX.utils.book_append_sheet(workBook1, pmWorksheet, first_sheet_name);\n      let pmData = JSON.stringify(XLSX.utils.sheet_to_json(pmWorksheet), null, 2); // console.log(data);\n\n      fs.writeFileSync('PM.json', pmData);\n      await XLSX.writeFile(workBook1, 'Extracted.xlsx'); // console.log(XLSX.utils.sheet_to_json(pmWorksheet));\n    }\n\n    if (zipEntry.entryName.split('.').pop() == \"xml\") {\n      await MyXmlFunction(zipEntry.entryName, function (a) {\n        console.log(a);\n      });\n    }\n  }\n\n  await sleep(1000);\n  await MyCompare('Extracted.xlsx');\n  await sleep(1000);\n  var OutputZip = new AdmZip();\n  OutputZip.addLocalFile(\"./Comparison.xlsx\");\n  OutputZip.addLocalFile(\"./Extracted.xlsx\");\n  OutputZip.writeZip(\"./Output.zip\"); // var CWorkbook = XLSX.readFile('Comparison.xlsx');\n  // var Compare_sheet_name = CWorkbook.SheetNames[0];\n  // var CWorksheet = CWorkbook.Sheets[Compare_sheet_name];\n  // var workBookFinal = XLSX.readFile('Extracted.xlsx');\n  // XLSX.utils.book_append_sheet(workBookFinal, CWorksheet, Compare_sheet_name);\n  // await XLSX.writeFile(workBookFinal, 'Extracted.xlsx');\n\n  await sleep(1000);\n  return './Output.zip';\n}\n\nasync function MyXmlFunction(theFile, callback) {\n  var workBookTemp = XLSX.readFile('Extracted.xlsx');\n  var ws = workBookTemp.Sheets['Extracted Data']; // console.log(XLSX.utils.sheet_to_json(ws));\n\n  console.log(theFile);\n  var parser = new xml2js.Parser();\n  fs.readFile(theFile, async function (err, data) {\n    parser.parseString(data, async function (err, result) {\n      // console.dir(result);\n      let data = JSON.stringify(result, null, 2); // console.log(data);\n\n      fs.writeFileSync('xml.json', data);\n      fs.writeFileSync('xml.txt', result);\n      var quest = result.questionSet;\n      var que = quest.question;\n      que.forEach(async function (value) {\n        var tags = {};\n        tags['LO'] = ``;\n        tags['topic'] = ``;\n        tags['AACSB'] = ``;\n        tags['BB'] = ``;\n        tags['FN'] = ``;\n        tags['blooms'] = ``;\n        tags['difficulty'] = ``;\n        tags['time'] = ``;\n        tags['title'] = value.title.toString(); // console.log(\"value.title\");\n\n        value.categories.forEach(function (value1) {\n          value1.internal_category.forEach(function (value2) {\n            var tag = value2.title.toString();\n\n            if (tag.includes(\"Learning Objective:\")) {\n              if (tags['LO'] !== '') {\n                tags['LO'] += ', ';\n              }\n\n              tags['LO'] += tag.replace(/(.*)(\\d{2,3})(-)(\\d{2,3})(.*)/g, '$2$3$4');\n            }\n\n            if (tag.includes(\"Topic:\")) {\n              if (tags['topic'] !== '') {\n                tags['topic'] += ', ';\n              }\n\n              tags['topic'] += tag.replace(/Topic: /g, '');\n            }\n\n            if (tag.includes(\"AACSB:\")) {\n              if (tags['AACSB'] !== '') {\n                tags['AACSB'] += ', ';\n              }\n\n              tags['AACSB'] += tag.replace(/AACSB: /g, '');\n            }\n\n            if (tag.includes(\"AICPA: BB\")) {\n              if (tags['BB'] !== '') {\n                tags['BB'] += ', ';\n              }\n\n              tags['BB'] += tag.replace(/AICPA: BB /g, '');\n            }\n\n            if (tag.includes(\"AICPA: FN\")) {\n              if (tags['FN'] !== '') {\n                tags['FN'] += ', ';\n              }\n\n              tags['FN'] += tag.replace(/AICPA: FN /g, '');\n            }\n\n            if (tag.includes(\"Blooms:\")) {\n              if (tags['blooms'] !== '') {\n                tags['blooms'] += ', ';\n              }\n\n              tags['blooms'] += tag.replace(/Blooms: /g, '');\n            }\n\n            if (tag.includes(\"Difficulty:\")) {\n              if (tags['difficulty'] !== '') {\n                tags['difficulty'] += ', ';\n              }\n\n              tags['difficulty'] += tag.replace(/Difficulty: /g, '');\n            }\n\n            if (tag.includes(\"Est Time:\")) {\n              if (tags['time'] !== '') {\n                tags['time'] += ', ';\n              }\n\n              tags['time'] += tag.replace(/Est Time: /g, '');\n            }\n          });\n        });\n        var rowVal = [[`${tags.title}`, `${tags.LO}`, `${tags.topic}`, `${tags.AACSB}`, `${tags.BB}`, `${tags.FN}`, `${tags.blooms}`, `${tags.difficulty}`, `${tags.time}`]];\n        XLSX.utils.sheet_add_aoa(ws, rowVal, {\n          origin: `A${i}`\n        });\n        i++;\n      }); // console.log(XLSX.utils.sheet_to_json(ws));\n\n      await XLSX.writeFile(workBookTemp, 'Extracted.xlsx');\n      console.log('Done');\n    });\n  });\n  callback('./Comparison.xlsx');\n}\n\nmodule.exports = MyFunction;\n\n//# sourceURL=webpack:///./server/xml.js?");

/***/ }),

/***/ 0:
/*!***********************************************!*\
  !*** multi babel-polyfill ./server/server.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! babel-polyfill */\"babel-polyfill\");\nmodule.exports = __webpack_require__(/*! D:\\Work\\GIT\\Javascript\\fnaxml\\server\\server.js */\"./server/server.js\");\n\n\n//# sourceURL=webpack:///multi_babel-polyfill_./server/server.js?");

/***/ }),

/***/ "adm-zip":
/*!**************************!*\
  !*** external "adm-zip" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"adm-zip\");\n\n//# sourceURL=webpack:///external_%22adm-zip%22?");

/***/ }),

/***/ "babel-polyfill":
/*!*********************************!*\
  !*** external "babel-polyfill" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"babel-polyfill\");\n\n//# sourceURL=webpack:///external_%22babel-polyfill%22?");

/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"body-parser\");\n\n//# sourceURL=webpack:///external_%22body-parser%22?");

/***/ }),

/***/ "excel4node":
/*!*****************************!*\
  !*** external "excel4node" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"excel4node\");\n\n//# sourceURL=webpack:///external_%22excel4node%22?");

/***/ }),

/***/ "exceljs":
/*!**************************!*\
  !*** external "exceljs" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"exceljs\");\n\n//# sourceURL=webpack:///external_%22exceljs%22?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//# sourceURL=webpack:///external_%22express%22?");

/***/ }),

/***/ "formidable":
/*!*****************************!*\
  !*** external "formidable" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"formidable\");\n\n//# sourceURL=webpack:///external_%22formidable%22?");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"fs\");\n\n//# sourceURL=webpack:///external_%22fs%22?");

/***/ }),

/***/ "multer":
/*!*************************!*\
  !*** external "multer" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"multer\");\n\n//# sourceURL=webpack:///external_%22multer%22?");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"path\");\n\n//# sourceURL=webpack:///external_%22path%22?");

/***/ }),

/***/ "pretty-data":
/*!******************************!*\
  !*** external "pretty-data" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"pretty-data\");\n\n//# sourceURL=webpack:///external_%22pretty-data%22?");

/***/ }),

/***/ "string-similarity":
/*!************************************!*\
  !*** external "string-similarity" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"string-similarity\");\n\n//# sourceURL=webpack:///external_%22string-similarity%22?");

/***/ }),

/***/ "xlsx":
/*!***********************!*\
  !*** external "xlsx" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"xlsx\");\n\n//# sourceURL=webpack:///external_%22xlsx%22?");

/***/ }),

/***/ "xml2js":
/*!*************************!*\
  !*** external "xml2js" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"xml2js\");\n\n//# sourceURL=webpack:///external_%22xml2js%22?");

/***/ })

/******/ });