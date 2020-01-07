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

/***/ "./server/server.js":
/*!**************************!*\
  !*** ./server/server.js ***!
  \**************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var body_parser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! body-parser */ \"body-parser\");\n/* harmony import */ var body_parser__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(body_parser__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var formidable__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! formidable */ \"formidable\");\n/* harmony import */ var formidable__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(formidable__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var xlsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! xlsx */ \"xlsx\");\n/* harmony import */ var xlsx__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(xlsx__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var multer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! multer */ \"multer\");\n/* harmony import */ var multer__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(multer__WEBPACK_IMPORTED_MODULE_5__);\n\n\n\n\n\n\n\nconst pd = __webpack_require__(/*! pretty-data */ \"pretty-data\").pd; // import pd from 'pretty-data';\n\n\nvar MyFunction = __webpack_require__(/*! ../xml.js */ \"./xml.js\"); // var storage = multer.diskStorage({\n//   destination: function (req, file, callback) {\n//     callback(null, './uploads');\n//   },\n//   filename: function (req, file, callback) {\n//     callback(null, file.fieldname + '-' + Date.now());\n//   }\n// });\n\n\nvar storage = multer__WEBPACK_IMPORTED_MODULE_5___default.a.memoryStorage();\nvar upload = multer__WEBPACK_IMPORTED_MODULE_5___default()({\n  storage: storage\n}).single('userPhoto');\nconst app = express__WEBPACK_IMPORTED_MODULE_0___default()();\napp.use(body_parser__WEBPACK_IMPORTED_MODULE_2___default.a.urlencoded({\n  extended: false\n}));\napp.use(body_parser__WEBPACK_IMPORTED_MODULE_2___default.a.json());\nconst CURRENT_WORKING_DIR = process.cwd();\napp.use(express__WEBPACK_IMPORTED_MODULE_0___default.a.static(path__WEBPACK_IMPORTED_MODULE_1___default.a.join(CURRENT_WORKING_DIR, 'public')));\napp.get('/test', (req, res) => {\n  res.send('My page');\n});\napp.get('/test1', (req, res) => {\n  res.send('My page 2');\n});\napp.get('/getfile1', (req, res) => {\n  console.log(req.query);\n  res.send('My page 2');\n});\napp.post('/getfile', (req, res) => {\n  upload(req, res, async function (err) {\n    if (err) {\n      return res.end(\"Error uploading file.\");\n    }\n\n    console.log(\"Call\");\n    var workbook = await MyFunction(`${req.file.originalname}`);\n    console.log(\"Result\", workbook);\n    return res.download(workbook);\n    res.end(\"File is uploaded\");\n  });\n});\napp.get('*', (req, res) => {\n  res.send('My web page');\n});\nconst PORT = process.env.PORT || 3000;\napp.listen(PORT);\n\n//# sourceURL=webpack:///./server/server.js?");

/***/ }),

/***/ "./xml.js":
/*!****************!*\
  !*** ./xml.js ***!
  \****************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// const fs = require('fs');\nvar fs = __webpack_require__(/*! fs */ \"fs\"),\n    xml2js = __webpack_require__(/*! xml2js */ \"xml2js\");\n\nvar excel = __webpack_require__(/*! excel4node */ \"excel4node\");\n\nvar AdmZip = __webpack_require__(/*! adm-zip */ \"adm-zip\"),\n    ExcelJS = __webpack_require__(/*! exceljs */ \"exceljs\");\n\nvar XLSX = __webpack_require__(/*! xlsx */ \"xlsx\");\n\nvar workBookFinal = XLSX.readFile('ExcelTemplate.xlsx'); //XLSX.utils.book_new(); \n\nXLSX.writeFile(workBookFinal, 'XML.xlsx');\nvar i = 2,\n    j = 1;\n\nasync function MyFunction(theZipFile) {\n  var zip = new AdmZip(theZipFile);\n  var zipEntries = zip.getEntries(); // an array of ZipEntry records\n  // iniWB = IniWorkBook(); // Initialise Workbook\n\n  zipEntries.forEach(async function (zipEntry) {\n    console.log(zipEntry.entryName); // outputs zip entries information\n\n    if (zipEntry.entryName.split('.').pop() == \"xlsx\") {\n      var pmWorkbook = XLSX.readFile(zipEntry.entryName);\n      var first_sheet_name = pmWorkbook.SheetNames[0];\n      var pmWorksheet = pmWorkbook.Sheets[first_sheet_name];\n      var workBook1 = XLSX.readFile('XML.xlsx');\n      XLSX.utils.book_append_sheet(workBook1, pmWorksheet, first_sheet_name);\n      let pmData = JSON.stringify(XLSX.utils.sheet_to_json(pmWorksheet), null, 2); // console.log(data);\n\n      fs.writeFileSync('PM.json', pmData);\n      await XLSX.writeFile(workBook1, 'XML.xlsx'); // console.log(XLSX.utils.sheet_to_json(pmWorksheet));\n    }\n\n    if (zipEntry.entryName.split('.').pop() == \"xml\") {\n      await MyXmlFunction(zipEntry.entryName, function (a) {\n        console.log(a);\n      });\n    }\n  });\n  return './XML.xlsx';\n}\n\nasync function MyXmlFunction(theFile, callback) {\n  var workBookTemp = XLSX.readFile('XML.xlsx');\n  var ws = workBookTemp.Sheets['Extracted Data'];\n  console.log(ws);\n  console.log(theFile);\n  var parser = new xml2js.Parser();\n  fs.readFile(theFile, async function (err, data) {\n    parser.parseString(data, async function (err, result) {\n      // console.dir(result);\n      let data = JSON.stringify(result, null, 2); // console.log(data);\n\n      fs.writeFileSync('xml.json', data);\n      fs.writeFileSync('xml.txt', result);\n      var quest = result.questionSet;\n      var que = quest.question;\n      que.forEach(async function (value) {\n        var tags = {};\n        tags['LO'] = ``;\n        tags['topic'] = ``;\n        tags['AACSB'] = ``;\n        tags['BB'] = ``;\n        tags['FN'] = ``;\n        tags['blooms'] = ``;\n        tags['difficulty'] = ``;\n        tags['time'] = ``;\n        tags['title'] = value.title.toString(); // console.log(\"value.title\");\n\n        value.categories.forEach(function (value1) {\n          value1.internal_category.forEach(function (value2) {\n            var tag = value2.title.toString();\n\n            if (tag.includes(\"Learning Objective:\")) {\n              if (tags['LO'] !== '') {\n                tags['LO'] += ', ';\n              }\n\n              tags['LO'] += tag.replace(/(.*)(\\d{2,3})(-)(\\d{2,3})(.*)/g, '$2$3$4');\n            }\n\n            if (tag.includes(\"Topic:\")) {\n              if (tags['topic'] !== '') {\n                tags['topic'] += ', ';\n              }\n\n              tags['topic'] += tag.replace(/Topic: /g, '');\n            }\n\n            if (tag.includes(\"AACSB:\")) {\n              if (tags['AACSB'] !== '') {\n                tags['AACSB'] += ', ';\n              }\n\n              tags['AACSB'] += tag.replace(/AACSB: /g, '');\n            }\n\n            if (tag.includes(\"AICPA: BB\")) {\n              if (tags['BB'] !== '') {\n                tags['BB'] += ', ';\n              }\n\n              tags['BB'] += tag.replace(/AICPA: BB /g, '');\n            }\n\n            if (tag.includes(\"AICPA: FN\")) {\n              if (tags['FN'] !== '') {\n                tags['FN'] += ', ';\n              }\n\n              tags['FN'] += tag.replace(/AICPA: FN /g, '');\n            }\n\n            if (tag.includes(\"Blooms:\")) {\n              if (tags['blooms'] !== '') {\n                tags['blooms'] += ', ';\n              }\n\n              tags['blooms'] += tag.replace(/Blooms: /g, '');\n            }\n\n            if (tag.includes(\"Difficulty:\")) {\n              if (tags['difficulty'] !== '') {\n                tags['difficulty'] += ', ';\n              }\n\n              tags['difficulty'] += tag.replace(/Difficulty: /g, '');\n            }\n\n            if (tag.includes(\"Est Time:\")) {\n              if (tags['time'] !== '') {\n                tags['time'] += ', ';\n              }\n\n              tags['time'] += tag.replace(/Est Time: /g, '');\n            }\n          });\n        });\n        var rowVal = [[`${tags.title}`, `${tags.LO}`, `${tags.topic}`, `${tags.AACSB}`, `${tags.BB}`, `${tags.FN}`, `${tags.blooms}`, `${tags.difficulty}`, `${tags.time}`]];\n        XLSX.utils.sheet_add_aoa(ws, rowVal, {\n          origin: `A${i}`\n        });\n        i++;\n      });\n      await XLSX.writeFile(workBookTemp, `XML.xlsx`);\n      console.log('Done');\n    });\n  });\n  callback('./Excel.xlsx');\n}\n\nmodule.exports = MyFunction;\n\n//# sourceURL=webpack:///./xml.js?");

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