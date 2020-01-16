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

eval("const XLSX = __webpack_require__(/*! xlsx */ \"xlsx\");\n\nconst stringSimilarity = __webpack_require__(/*! string-similarity */ \"string-similarity\");\n\nconst fs = __webpack_require__(/*! fs */ \"fs\");\n\nconst excel = __webpack_require__(/*! excel4node */ \"excel4node\");\n\nasync function MyCompare(theExcelFile) {\n  var compareWB = new excel.Workbook();\n  var style = compareWB.createStyle({\n    font: {\n      color: '#000000',\n      size: 12\n    },\n    numberFormat: '$#,##0.00; ($#,##0.00); -'\n  });\n  var styleHeader = compareWB.createStyle({\n    font: {\n      bold: true,\n      color: '#000000',\n      size: 12\n    },\n    fill: {\n      // §18.8.20 fill (Fill)\n      type: 'pattern',\n      // Currently only 'pattern' is implemented. Non-implemented option is 'gradient'\n      patternType: 'solid',\n      //§18.18.55 ST_PatternType (Pattern Type)\n      // bgColor: '#FF0000' // HTML style hex value. defaults to black\n      fgColor: '#00B8FF' // HTML style hex value. defaults to black.\n\n    },\n    numberFormat: '$#,##0.00; ($#,##0.00); -'\n  });\n  var styleNoMatch = compareWB.createStyle({\n    font: {\n      color: '#000000',\n      size: 12\n    },\n    fill: {\n      // §18.8.20 fill (Fill)\n      type: 'pattern',\n      // Currently only 'pattern' is implemented. Non-implemented option is 'gradient'\n      patternType: 'solid',\n      //§18.18.55 ST_PatternType (Pattern Type)\n      // bgColor: '#FF0000' // HTML style hex value. defaults to black\n      fgColor: '#FF0000' // HTML style hex value. defaults to black.\n\n    },\n    numberFormat: '$#,##0.00; ($#,##0.00); -'\n  });\n  var stylePartialMatch = compareWB.createStyle({\n    font: {\n      color: '#000000',\n      size: 12\n    },\n    fill: {\n      // §18.8.20 fill (Fill)\n      type: 'pattern',\n      // Currently only 'pattern' is implemented. Non-implemented option is 'gradient'\n      patternType: 'solid',\n      //§18.18.55 ST_PatternType (Pattern Type)\n      // bgColor: '#FF0000' // HTML style hex value. defaults to black\n      fgColor: '#FFA500' // HTML style hex value. defaults to black.\n\n    },\n    numberFormat: '$#,##0.00; ($#,##0.00); -'\n  });\n  var WSoptions = {\n    'sheetFormat': {\n      'defaultColWidth': 30 // 'defaultRowHeight': 30\n\n    }\n  };\n  var compareWS = compareWB.addWorksheet('Comparison Result', WSoptions);\n  compareWS.cell(1, 1).string('Question').style(styleHeader);\n  compareWS.cell(1, 2).string('LO').style(styleHeader);\n  compareWS.cell(1, 3).string('Topic').style(styleHeader);\n  compareWS.cell(1, 4).string('AACSB').style(styleHeader);\n  compareWS.cell(1, 5).string('BB').style(styleHeader);\n  compareWS.cell(1, 6).string('FN').style(styleHeader);\n  compareWS.cell(1, 7).string('Blooms').style(styleHeader);\n  compareWS.cell(1, 8).string('Difficulty').style(styleHeader);\n  compareWS.cell(1, 9).string('Time').style(styleHeader);\n  compareWS.cell(1, 10).string('Type').style(styleHeader);\n  compareWS.cell(1, 11).string('Worksheet').style(styleHeader);\n  compareWS.cell(1, 12).string('Gradable').style(styleHeader);\n  compareWS.cell(1, 13).string('LODescription').style(styleHeader);\n  var cWorkBook = XLSX.readFile('./Output/Extracted.xlsx');\n  var extWS = cWorkBook.Sheets['Extracted Data'];\n  var extJson = XLSX.utils.sheet_to_json(extWS);\n  var pmWS = cWorkBook.Sheets['Sheet1'];\n  var pmWS2 = cWorkBook.Sheets['Sheet2'];\n  var pmJson = XLSX.utils.sheet_to_json(pmWS);\n  var pmJson2 = XLSX.utils.sheet_to_json(pmWS2); // console.log(pmJson2);\n\n  var i = 2;\n\n  for (let Que of extJson) {\n    Que.Q = Que.Q.replace(/\\[(.*)\\]/g, \"\");\n    var qNo = Que.Q.match(/(\\d{1,2}-\\d{1,3})/);\n\n    if (qNo !== null) {\n      qNo[0] = qNo[0].replace(/\\b0+/g, \"\");\n    }\n\n    for (let pmQ of pmJson) {\n      var pmQNo = pmQ.Q.match(/(\\d{1,2}-\\d{1,3})/g);\n\n      if (qNo !== null) {\n        pmQNo[0] = pmQNo[0].replace(/\\b0+/g, \"\");\n      }\n\n      if (qNo !== null) {\n        if (qNo[0] === pmQNo[0]) {\n          // console.log('Test',qNo[0],pmQNo);\n          compareWS.cell(i, 1).string(`Extracted Q Title:${Que.Q}\\r\\nProblem Map Q Title:${pmQ.Q}`).style(style);\n\n          if (typeof Que.LO !== 'undefined' && typeof pmQ.LO !== 'undefined') {\n            var LORes = LoCheck(Que.LO, pmQ.LO);\n            compareWS.cell(i, 2).string(`Extracted Data: ${LORes['extract']}\\r\\nProblem Map Data: ${LORes['PM']}\\r\\nMatch: ${LORes['Result']}`).style(LORes['Result'] === 1 ? style : LORes['Result'] >= 0.95 ? stylePartialMatch : styleNoMatch);\n          }\n\n          if (typeof Que.Topic !== 'undefined' && typeof pmQ.Topic !== 'undefined') {\n            var TopicRes = TopicCheck(Que.Topic, pmQ.Topic);\n            compareWS.cell(i, 3).string(`Extracted Data: ${TopicRes['extract']}\\r\\nProblem Map Data: ${TopicRes['PM']}\\r\\nMatch: ${TopicRes['Result']}`).style(TopicRes['Result'] === 1 ? style : TopicRes['Result'] >= 0.95 ? stylePartialMatch : styleNoMatch);\n          }\n\n          if (typeof Que.AACSB !== 'undefined' && typeof pmQ.AACSB !== 'undefined') {\n            var AacsbRes = AacsbCheck(Que.AACSB, pmQ.AACSB);\n            compareWS.cell(i, 4).string(`Extracted Data: ${AacsbRes['extract']}\\r\\nProblem Map Data: ${AacsbRes['PM']}\\r\\nMatch: ${AacsbRes['Result']}`).style(AacsbRes['Result'] === 1 ? style : AacsbRes['Result'] >= 0.95 ? stylePartialMatch : styleNoMatch);\n          }\n\n          if (typeof Que.BB !== 'undefined' && typeof pmQ.BB !== 'undefined') {\n            var BBRes = BbCheck(Que.BB, pmQ.BB);\n            compareWS.cell(i, 5).string(`Extracted Data: ${BBRes['extract']}\\r\\nProblem Map Data: ${BBRes['PM']}\\r\\nMatch: ${BBRes['Result']}`).style(BBRes['Result'] === 1 ? style : BBRes['Result'] >= 0.95 ? stylePartialMatch : styleNoMatch);\n          }\n\n          if (typeof Que.FN !== 'undefined' && typeof pmQ.FN !== 'undefined') {\n            var FNRes = FnCheck(Que.FN, pmQ.FN);\n            compareWS.cell(i, 6).string(`Extracted Data: ${FNRes['extract']}\\r\\nProblem Map Data: ${FNRes['PM']}\\r\\nMatch: ${FNRes['Result']}`).style(FNRes['Result'] === 1 ? style : FNRes['Result'] >= 0.95 ? stylePartialMatch : styleNoMatch);\n          }\n\n          if (typeof Que.Blooms !== 'undefined' && typeof pmQ.Blooms !== 'undefined') {\n            var BloomsRes = BloomsCheck(Que.Blooms, pmQ.Blooms);\n            compareWS.cell(i, 7).string(`Extracted Data: ${BloomsRes['extract']}\\r\\nProblem Map Data: ${BloomsRes['PM']}\\r\\nMatch: ${BloomsRes['Result']}`).style(BloomsRes['Result'] === 1 ? style : BloomsRes['Result'] >= 0.95 ? stylePartialMatch : styleNoMatch);\n          }\n\n          if (typeof Que.Difficulty !== 'undefined' && typeof pmQ.Difficulty !== 'undefined') {\n            var DiffRes = DifficultyCheck(Que.Difficulty, pmQ.Difficulty);\n            compareWS.cell(i, 8).string(`Extracted Data: ${DiffRes['extract']}\\r\\nProblem Map Data: ${DiffRes['PM']}\\r\\nMatch: ${DiffRes['Result']}`).style(DiffRes['Result'] === 1 ? style : DiffRes['Result'] >= 0.95 ? stylePartialMatch : styleNoMatch);\n          }\n\n          if (typeof Que.Time !== 'undefined' && typeof pmQ.Time !== 'undefined') {\n            var TimeRes = TimeCheck(Que.Time, pmQ.Time);\n            compareWS.cell(i, 9).string(`Extracted Data: ${TimeRes['extract']}\\r\\nProblem Map Data: ${TimeRes['PM']}\\r\\nMatch: ${TimeRes['Result']}`).style(TimeRes['Result'] === 1 ? style : TimeRes['Result'] >= 0.95 ? stylePartialMatch : styleNoMatch);\n          }\n\n          if (typeof Que.Type !== 'undefined' && typeof pmQ.Type !== 'undefined') {\n            var TypeRes = TypeCheck(Que.Type, pmQ.Type);\n            compareWS.cell(i, 10).string(`Extracted Data: ${TypeRes['extract']}\\r\\nProblem Map Data: ${TypeRes['PM']}\\r\\nMatch: ${TypeRes['Result']}`).style(TypeRes['Result'] === 1 ? style : TypeRes['Result'] >= 0.95 ? stylePartialMatch : styleNoMatch);\n          }\n\n          if (typeof Que.Worksheet !== 'undefined' && typeof pmQ.Worksheet !== 'undefined') {\n            var qTypeRes = qTypeCheck(Que.Worksheet, pmQ.Worksheet);\n            compareWS.cell(i, 11).string(`Extracted Data: ${qTypeRes['extract']}\\r\\nProblem Map Data: ${qTypeRes['PM']}\\r\\nMatch: ${qTypeRes['Result']}`).style(qTypeRes['Result'] === 1 ? style : qTypeRes['Result'] >= 0.95 ? stylePartialMatch : styleNoMatch);\n          }\n\n          if (typeof Que.Gradable !== 'undefined' && typeof pmQ.Worksheet !== 'undefined') {\n            var GraRes = GraCheck(Que.Gradable, pmQ.Worksheet);\n            compareWS.cell(i, 12).string(`Extracted Data: ${GraRes['extract']}\\r\\nProblem Map Data: ${GraRes['PM']}\\r\\nMatch: ${GraRes['Result']}`).style(GraRes['Result'] === 1 ? style : GraRes['Result'] >= 0.95 ? stylePartialMatch : styleNoMatch);\n          }\n\n          if (typeof Que.LODescription !== 'undefined' && typeof pmJson2 !== 'undefined') {\n            var LoDesRes = LoDesCheck(Que.LODescription, pmJson2);\n            compareWS.cell(i, 13).string(`Extracted Data: ${LoDesRes['extract']}\\r\\nProblem Map Data: ${LoDesRes['PM']}\\r\\nMatch: ${LoDesRes['Result']}`).style(LoDesRes['Result'] === 1 ? style : LoDesRes['Result'] >= 0.95 ? stylePartialMatch : styleNoMatch);\n          }\n        }\n      }\n    }\n\n    i++;\n  }\n\n  console.log(\"Comparison write Start\");\n  compareWB.write('./Output/Comparison.xlsx');\n  console.log(\"Comparison write End\");\n}\n\nfunction LastWord(words) {\n  var n = words.split(\" \");\n  return n[n.length - 1];\n}\n\nfunction hasNumbers(t) {\n  var regex = /\\d/g;\n  return regex.test(t);\n}\n\nfunction MatchArray(a, b) {\n  var result = {};\n  b = b.replace(/  +/g, ',');\n  b = b.replace('\\r\\n', ',');\n  a = a.trim();\n  b = b.trim();\n  var x = a.split(/[,;]/g).sort();\n  var y = b.split(/[,;]/g).sort();\n  x = x.filter(Boolean);\n  y = y.filter(Boolean);\n\n  for (var i = 0; i < x.length; i++) {\n    x[i] = x[i].trim();\n  }\n\n  for (i = 0; i < x.length; i++) {\n    y[i] = y[i].trim();\n  }\n\n  x = x.sort();\n  y = y.sort();\n  result['extract'] = x.toString();\n  result['PM'] = y.toString();\n  result['Result'] = stringSimilarity.compareTwoStrings(x.toString(), y.toString()); // console.log(x, ',', y,',',':',result)\n\n  return result;\n}\n\nfunction LoCheck(extLO, pmLO) {\n  var a = extLO.match(/(\\d{1,2}-\\d{1,3})/g);\n  var b = pmLO.match(/(\\d{1,2}-\\d{1,3})/g);\n  return MatchArray(a.toString(), b.toString());\n}\n\nfunction TopicCheck(extTop, pmTop) {\n  var a = extTop;\n  var b = pmTop;\n  return MatchArray(a, b);\n}\n\nfunction AacsbCheck(extAA, pmAA) {\n  var a = extAA;\n  var b = pmAA;\n  return MatchArray(a, b);\n}\n\nfunction BbCheck(extBB, pmBB) {\n  var a = extBB;\n  var b = pmBB;\n  return MatchArray(a, b);\n}\n\nfunction FnCheck(extFN, pmFN) {\n  var a = extFN;\n  var b = pmFN;\n  return MatchArray(a, b);\n}\n\nfunction qTypeCheck(extQt, pmQt) {\n  var a = extQt;\n  var b = pmQt;\n  return MatchArray(a, b);\n}\n\nfunction GraCheck(extGra, pmGra) {\n  var a = extGra.toUpperCase();\n  var b = pmGra.toUpperCase();\n  var result = {};\n  result['extract'] = a;\n  result['PM'] = b;\n  result['Result'] = 1; // console.log('Grade:',a);\n\n  if (a === '') {\n    result['Result'] = 0;\n  }\n\n  if (a.includes('ESSAY') && b.includes('AUTO')) {\n    result['Result'] = 0;\n  }\n\n  if (!a.includes('ESSAY') && b.includes('MANUAL')) {\n    result['Result'] = 0.975;\n  }\n\n  return result;\n}\n\nfunction TypeCheck(extType, pmType) {\n  var a = extType.charAt(0);\n  a = a.toUpperCase();\n  var b = pmType.toUpperCase();\n  var result = {};\n  result['extract'] = a;\n  result['PM'] = b;\n  result['Result'] = 0;\n\n  if (b === 'B') {\n    if (a === 'S' || a === 'A') {\n      result['Result'] = 1;\n    }\n  } else if (a === b) {\n    result['Result'] = 1;\n  } // if(a.toUpperCase() === b.toUpperCase()) {\n  //   result['Result'] = 1;\n  // }\n  // result['Result'] = (result['extract'] === result['PM']) ? 1 : 0;\n  // console.log('time',result)\n\n\n  return result;\n}\n\nfunction BloomsCheck(extBloom, pmBloom) {\n  var a = extBloom;\n  var b = pmBloom;\n\n  if (hasNumbers(a)) {\n    a = LastWord(a);\n  }\n\n  if (hasNumbers(b)) {\n    b = LastWord(b);\n  }\n\n  return MatchArray(a, b);\n}\n\nfunction LoDesCheck(extLoD, pmLoD) {\n  var a = extLoD;\n  var b = pmLoD; // console.log(a,b)\n  // console.log(a);\n\n  var result = {};\n  result['extract'] = '';\n  result['PM'] = '';\n  result['Result'] = 0.0;\n\n  if (extLoD.includes(';')) {\n    var x = a.split(/[;]/g).sort(); // console.log(\"Mul\")\n\n    for (var ext of x) {\n      for (var lod of pmLoD) {\n        c = ext;\n        d = lod['LODescription']; // console.log('mul', ext)\n\n        var e = c.match(/(\\d{1,2}-\\d{1,3})/);\n        var f = d.match(/(\\d{1,2}-\\d{1,3})/g);\n\n        if (e[0].replace(/\\b0+/g, \"\") === f[0].replace(/\\b0+/g, \"\")) {\n          // console.log('Test', ext, lod['LODescription'])\n          var g = ext.replace(/(\\d{1,2}-\\d{1,3})(.*)/g, \"$2\");\n          var h = lod['LODescription'].replace(/\\s{2,}/g, ' ');\n          h = h.replace(/(.*)(\\d{1,2}-\\d{1,3})(.*)/g, \"$3\"); // console.log('Test', g, h)\n\n          var val = MatchArray(g.trim(), h.trim());\n\n          if (result['extract'] !== '') {\n            result['extract'] += ', ';\n          }\n\n          if (result['PM'] !== '') {\n            result['PM'] += ', ';\n          } // if (result['Result'] !== '') {\n          //   result['Result'] += ', ';\n          // }\n\n\n          result['extract'] += val['extract'];\n          result['PM'] += val['PM'];\n          result['Result'] = result['Result'] + val['Result'];\n        }\n      }\n\n      if (result['Result'] > 1) {\n        result['Result'] = result['Result'] / 2;\n      }\n    } // console.log(x, typeof x);\n    //   }\n    // }\n\n  } else {\n    for (var lod of pmLoD) {\n      // console.log(c)\n      // console.log(\"Sin\", extLoD)\n      var k = extLoD.match(/(\\d{1,2}-\\d{1,3})/);\n      var l = lod['LODescription'].match(/(\\d{1,2}-\\d{1,3})/g); // console.log('Test', k, l)\n      // if (extLoD.replace(/(.*)(\\d{2,3})(-)(\\d{2,3})(.*)/g, '$2$3$4') === lod['LODescription'].replace(/(.*)(\\d{2,3})(-)(\\d{2,3})(.*)/g, '$2$3$4')) {\n\n      if (k[0].replace(/\\b0+/g, \"\") === l[0].replace(/\\b0+/g, \"\")) {\n        var m = extLoD.replace(/(\\d{1,2}-\\d{1,3})(.*)/g, \"$2\");\n        var n = lod['LODescription'].replace(/\\s{2,}/g, ' ');\n        n = n.replace(/(.*)(\\d{1,2}-\\d{1,3})(.*)/g, \"$3\");\n        console.log('Test', m, n); // var val = MatchArray(m, n)\n        // result = MatchArray(extLoD, lod['LODescription'].replace(/\\s{2,}/g, ' '))\n\n        result = MatchArray(m.trim(), n.trim());\n      } // var temp = MatchArray(a, b)\n      // if(temp['Result'] > 0.95 ) {\n      // result = temp;\n      // }\n      // console.log(lod, typeof lod);\n\n    }\n  }\n\n  return result;\n}\n\nfunction DifficultyCheck(extDiff, pmDiff) {\n  var a = extDiff;\n  var b = pmDiff;\n\n  if (hasNumbers(a)) {\n    a = LastWord(a);\n  }\n\n  if (hasNumbers(b)) {\n    b = LastWord(b);\n  }\n\n  return MatchArray(a, b);\n}\n\nfunction TimeCheck(extTime, pmTime) {\n  var a = extTime.match(/(\\d{1,3})/g);\n  var b = pmTime.match(/(\\d{1,3})/g); // console.log(parseInt(a[a.length - 1]), parseInt(b[b.length - 1]));\n  // MatchArray (a, b)\n\n  var result = {};\n  result['extract'] = extTime;\n  result['PM'] = pmTime;\n\n  if (a.length > 1 && b.length > 1) {\n    if (a[a.length - 1] === b[b.length - 1] && a[0] === b[0]) {\n      result['Result'] = 1;\n    } else {\n      result['Result'] = 0;\n    }\n  } else {\n    result['Result'] = parseInt(a[a.length - 1]) === parseInt(b[b.length - 1]) ? 1 : 0;\n  } // console.log('time',result)\n\n\n  return result;\n}\n\nmodule.exports = MyCompare;\n\n//# sourceURL=webpack:///./server/compare.js?");

/***/ }),

/***/ "./server/server.js":
/*!**************************!*\
  !*** ./server/server.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const express = __webpack_require__(/*! express */ \"express\");\n\nconst path = __webpack_require__(/*! path */ \"path\");\n\nconst bodyParser = __webpack_require__(/*! body-parser */ \"body-parser\");\n\nconst formidable = __webpack_require__(/*! formidable */ \"formidable\");\n\nconst XLSX = __webpack_require__(/*! xlsx */ \"xlsx\");\n\nconst multer = __webpack_require__(/*! multer */ \"multer\");\n\nconst fs = __webpack_require__(/*! fs */ \"fs\"); // const pd = require('pretty-data').pd;\n// import pd from 'pretty-data';\n\n\nconst MyFunction = __webpack_require__(/*! ./xml.js */ \"./server/xml.js\"); // import MyFunction from './xml.js';\n// var storage = multer.diskStorage({\n//   destination: function (req, file, callback) {\n//     callback(null, './uploads');\n//   },\n//   filename: function (req, file, callback) {\n//     callback(null, file.fieldname + '-' + Date.now());\n//   }\n// });\n\n\nvar storage = multer.memoryStorage(); // var storage = multer.diskStorage({\n//   destination: function (req, file, cb) {\n//     cb(null, 'public/uploads')\n//   },\n//   filename: function (req, file, cb) {\n//     cb(null, file.fieldname + '-' + Date.now())\n//   }\n// })\n\nvar upload = multer({\n  storage: storage\n}).single('myFile');\nconst app = express();\napp.use(bodyParser.urlencoded({\n  extended: false\n}));\napp.use(bodyParser.json());\nconst CURRENT_WORKING_DIR = process.cwd();\napp.use(express.static(path.join(CURRENT_WORKING_DIR, 'public')));\napp.get('/test', (req, res) => {\n  res.send('My page');\n});\napp.get('/test1', (req, res) => {\n  res.send('My page 2');\n});\napp.get('/getfile1', (req, res) => {\n  console.log(req.query);\n  res.send('My page 2');\n}); // app.post('/ExcelTemplate', (req, res) => {\n//   upload(req, res, async function (err) {\n//     if (err) {\n//       return res.end(\"Error uploading file.\");\n//     }\n//     console.log(\"Template\");\n//     return res.download(\n//       './public/ExcelTemplate.xlsx'\n//     )\n//     res.end(\"File is uploaded\");\n//   });\n//   console.log(req.query)\n// });\n\napp.post('/getfile', (req, res) => {\n  upload(req, res, async function (err) {\n    if (err) {\n      return res.end(\"Error uploading file.\");\n    }\n\n    console.log(\"MyFunction Call\"); // console.log(req.file.buffer)\n\n    console.log(\"File Writer Call\"); // var workbook = await MyFunction(`${req.file.originalname}`);\n    // fs.writeFileSync(req.file.buffer, 'Archive.zip');\n\n    console.log(\"File Writer Close\"); // var workbook = MyFunction(`${req.file.originalname}`);\n\n    var workbook = await MyFunction(req.file.buffer);\n    console.log(\"Result\", workbook);\n    return res.download(workbook);\n    res.end(\"File is uploaded\");\n  });\n}); // app.post('/getfile', upload.single('myFile'), (req, res, next) => {\n//   const file = req.file\n//   if (!file) {\n//     const error = new Error('Please upload a file')\n//     error.httpStatusCode = 400\n//     return next(error)\n//   }\n//   console.log(\"MyFunction Call\");\n//   console.log(req.file.originalname)\n//   // var workbook = await MyFunction(`${req.file.originalname}`);\n//   var workbook = MyFunction(`${req.file.originalname}`);\n//   console.log(\"Result\", workbook);\n//   return res.download(\n//     workbook\n//   )\n//   res.end(\"File is uploaded\");\n// })\n\napp.get('*', (req, res) => {\n  res.send('My web page');\n});\nconst PORT = process.env.PORT || 3000;\napp.listen(PORT);\n\n//# sourceURL=webpack:///./server/server.js?");

/***/ }),

/***/ "./server/xml.js":
/*!***********************!*\
  !*** ./server/xml.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// const fs = require('fs');\nconst fs = __webpack_require__(/*! fs */ \"fs\");\n\nconst xml2js = __webpack_require__(/*! xml2js */ \"xml2js\");\n\nconst excel = __webpack_require__(/*! excel4node */ \"excel4node\");\n\nconst AdmZip = __webpack_require__(/*! adm-zip */ \"adm-zip\");\n\nconst ExcelJS = __webpack_require__(/*! exceljs */ \"exceljs\");\n\nconst XLSX = __webpack_require__(/*! xlsx */ \"xlsx\");\n\nconst stringSimilarity = __webpack_require__(/*! string-similarity */ \"string-similarity\"); // const MyCompare = require('./compare.js');\n\n\nconst MyCompare = __webpack_require__(/*! ./compare.js */ \"./server/compare.js\"); // const XLSX = require('xlsx');\n\n\nconst path = __webpack_require__(/*! path */ \"path\"); // var workBookFinal = XLSX.readFile('ExcelTemplate.xlsx'); //XLSX.utils.book_new();\n// // fs.unlinkSync('./Extracted.xlsx');\n// XLSX.writeFileSync(workBookFinal, './Output/Extracted.xlsx');\n\n\nvar i = 2,\n    j = 1;\n\nasync function sleep(millis) {\n  return new Promise(resolve => setTimeout(resolve, millis));\n}\n\nfunction compressFile(filename, callback) {\n  var compress = zlib.createGzip(),\n      input = fs.createReadStream(filename),\n      output = fs.createWriteStream(filename + '.gz');\n  input.pipe(compress).pipe(output);\n\n  if (callback) {\n    output.on('end', callback);\n  }\n}\n\nasync function folderClear() {\n  const directory = './Temp';\n  const directory1 = './Output';\n  fs.readdir(directory, (err, files) => {\n    if (err) throw err;\n\n    for (const file of files) {\n      fs.unlink(path.join(directory, file), err => {\n        if (err) throw err;\n      });\n    }\n  });\n  fs.readdir(directory1, (err, files) => {\n    if (err) throw err;\n\n    for (const file of files) {\n      fs.unlink(path.join(directory1, file), err => {\n        if (err) throw err;\n      });\n    }\n  });\n}\n\nasync function MyFunction(theZipFile) {\n  await folderClear();\n  await sleep(2000);\n  console.log(\"Opening Zip File\");\n  var zip = new AdmZip(theZipFile); // InputZip.writeZip(\"./Archive.zip\");\n  // var zip = new AdmZip(\"./Archive.zip\");\n\n  var zipEntries = zip.getEntries();\n  console.log(\"Parsing Zip File\");\n  zip.extractAllTo(\n  /*target path*/\n  \"./Temp/\",\n  /*overwrite*/\n  true);\n  var workBook1 = XLSX.readFile('ExcelTemplate.xlsx');\n  await XLSX.writeFileSync(workBook1, './Output/Extracted.xlsx'); // zipEntries.forEach(async function(zipEntry) {\n\n  for await (var zipEntry of zipEntries) {\n    await sleep(2000);\n    console.log(zipEntry.entryName); // outputs zip entries information\n\n    if (zipEntry.entryName.split('.').pop() == \"xlsx\") {\n      var pmWorkbook = XLSX.readFile('./Temp/' + zipEntry.entryName);\n      var first_sheet_name = pmWorkbook.SheetNames[0];\n      var pmWorksheet = pmWorkbook.Sheets[first_sheet_name];\n      var workBook2 = XLSX.readFile('./Output/Extracted.xlsx');\n      XLSX.utils.book_append_sheet(workBook2, pmWorksheet, first_sheet_name);\n      var sec_sheet_name = pmWorkbook.SheetNames[1];\n      var pmWorksheet2 = pmWorkbook.Sheets[sec_sheet_name];\n      await XLSX.writeFileSync(workBook2, './Output/Extracted.xlsx');\n      var workBook2 = XLSX.readFile('./Output/Extracted.xlsx');\n      XLSX.utils.book_append_sheet(workBook2, pmWorksheet2, sec_sheet_name);\n      let pmData = JSON.stringify(XLSX.utils.sheet_to_json(pmWorksheet), null, 2);\n      fs.writeFileSync('./Output/PM.json', pmData);\n      await XLSX.writeFileSync(workBook2, './Output/Extracted.xlsx');\n    }\n\n    if (zipEntry.entryName.split('.').pop() == \"xml\") {\n      await MyXmlFunction('./Temp/' + zipEntry.entryName, function (a) {\n        console.log('XML', a);\n      });\n    }\n  }\n\n  await sleep(2000);\n  console.log('Compare Start');\n  await MyCompare('./Output/Extracted.xlsx');\n  console.log('Compare End');\n  await sleep(2000);\n  var OutputZip = new AdmZip();\n  OutputZip.addLocalFile(\"./Output/Comparison.xlsx\");\n  OutputZip.addLocalFile(\"./Output/Extracted.xlsx\");\n  OutputZip.writeZip(\"./Output/Output.zip\");\n  await sleep(2000);\n  return './Output/Output.zip';\n}\n\nasync function MyXmlFunction(theFile, callback) {\n  console.log('Extracted read Start');\n  var workBookTemp = XLSX.readFile('./Output/Extracted.xlsx');\n  console.log('Extracted read End');\n  var ws = workBookTemp.Sheets['Extracted Data']; // console.log(XLSX.utils.sheet_to_json(ws));\n  // console.log(theFile);\n\n  var parser = new xml2js.Parser();\n  fs.readFile(theFile, async function (err, data) {\n    parser.parseString(data, async function (err, result) {\n      // console.dir(result);\n      let data = JSON.stringify(result, null, 2); // console.log(data);\n\n      fs.writeFileSync('./Output/xml.json', data);\n      fs.writeFileSync('./Output/xml.txt', result);\n      var quest = result.questionSet;\n      var que = quest.question;\n      que.forEach(async function (value) {\n        if (value.type.toString() != 'SB') {\n          var tags = {};\n          tags['LO'] = ``;\n          tags['topic'] = ``;\n          tags['AACSB'] = ``;\n          tags['BB'] = ``;\n          tags['FN'] = ``;\n          tags['blooms'] = ``;\n          tags['difficulty'] = ``;\n          tags['time'] = ``;\n          tags['type'] = ``;\n          tags['gradable'] = ``;\n          tags['qtype'] = value.type.toString();\n          tags['LODescription'] = ``;\n          tags['title'] = value.title.toString();\n          tags['EA'] = ' ';\n          var prop = value.questionProperties[0];\n          console.log(tags['title']);\n\n          for (individualProperty of prop.property) {\n            if (individualProperty['$'].name === 'customType') {\n              if (individualProperty['$'].value != '') {\n                tags['qtype'] = individualProperty['$'].value; // console.log(tags['title'], tags['qtype'])\n              }\n            }\n\n            if (value.type.toString() === 'WK') {\n              var worksheetTag = value.worksheet;\n              var answerset = worksheetTag[0].answers;\n              var externalAns = answerset[0].externalAnswer;\n              var essayAns = answerset[0].essayAnswer;\n\n              if (typeof essayAns === 'object') {\n                tags['EA'] = 'True';\n              }\n\n              if (typeof externalAns === 'object') {\n                for (indAnsProperty of externalAns[0].answerProperties[0].property) {\n                  if (indAnsProperty['$'].name === 'customType') {\n                    if (indAnsProperty['$'].value != '') {\n                      console.log(value.title.toString(), indAnsProperty['$'].value);\n                      tags['qtype'] = indAnsProperty['$'].value; // console.log('test',value.title,indAnsProperty['$'].value)\n                    }\n                  }\n                }\n              }\n            }\n          }\n\n          value.categories.forEach(function (value1) {\n            value1.internal_category.forEach(function (value2) {\n              var tag = value2.title.toString();\n\n              if (tag.includes(\"Learning Objective:\")) {\n                if (tags['LO'] !== '') {\n                  tags['LO'] += ', ';\n                }\n\n                tags['LO'] += tag.replace(/(.*)(\\d{2,3})(-)(\\d{2,3})(.*)/g, '$2$3$4');\n              }\n\n              if (tag.includes(\"Learning Objective:\")) {\n                if (tags['LODescription'] !== '') {\n                  tags['LODescription'] += ';';\n                }\n\n                tags['LODescription'] += tag.replace(/(.*)(\\d{2,3})(-)(\\d{2,3})(.*)/g, '$2$3$4 $5');\n              }\n\n              if (tag.includes(\"Topic:\")) {\n                if (tags['topic'] !== '') {\n                  tags['topic'] += ', ';\n                }\n\n                tags['topic'] += tag.replace(/Topic: /g, '');\n              }\n\n              if (tag.includes(\"AACSB:\")) {\n                if (tags['AACSB'] !== '') {\n                  tags['AACSB'] += ', ';\n                }\n\n                tags['AACSB'] += tag.replace(/AACSB: /g, '');\n              }\n\n              if (tag.includes(\"AICPA: BB\")) {\n                if (tags['BB'] !== '') {\n                  tags['BB'] += ', ';\n                }\n\n                tags['BB'] += tag.replace(/AICPA: BB /g, '');\n              }\n\n              if (tag.includes(\"AICPA: FN\")) {\n                if (tags['FN'] !== '') {\n                  tags['FN'] += ', ';\n                }\n\n                tags['FN'] += tag.replace(/AICPA: FN /g, '');\n              }\n\n              if (tag.includes(\"Blooms:\")) {\n                if (tags['blooms'] !== '') {\n                  tags['blooms'] += ', ';\n                }\n\n                tags['blooms'] += tag.replace(/Blooms: /g, '');\n              }\n\n              if (tag.includes(\"Difficulty:\")) {\n                if (tags['difficulty'] !== '') {\n                  tags['difficulty'] += ', ';\n                }\n\n                tags['difficulty'] += tag.replace(/Difficulty: /g, '');\n              }\n\n              if (tag.includes(\"Est Time:\")) {\n                if (tags['time'] !== '') {\n                  tags['time'] += ', ';\n                }\n\n                tags['time'] += tag.replace(/Est Time: /g, '');\n              }\n\n              if (tag.includes(\"Type:\")) {\n                if (tags['type'] !== '') {\n                  tags['type'] += ', ';\n                }\n\n                tags['type'] += tag.replace(/Type: /g, '');\n              }\n\n              if (tag.includes(\"Gradable:\")) {\n                if (tags['gradable'] !== '') {\n                  tags['gradable'] += ', ';\n                }\n\n                tags['gradable'] += tag.replace(/Gradable: /g, '');\n              }\n            });\n          });\n          var rowVal = [[`${tags.title}`, `${tags.LO}`, `${tags.topic}`, `${tags.AACSB}`, `${tags.BB}`, `${tags.FN}`, `${tags.blooms}`, `${tags.difficulty}`, `${tags.time}`, `${tags.type}`, `${tags.qtype}`, `${tags.gradable}`, `${tags.LODescription}`, `${tags.EA}`]];\n          XLSX.utils.sheet_add_aoa(ws, rowVal, {\n            origin: `A${i}`\n          });\n          i++;\n        }\n      }); // console.log(XLSX.utils.sheet_to_json(ws));\n\n      await XLSX.writeFileSync(workBookTemp, './Output/Extracted.xlsx');\n      await sleep(2000);\n      console.log('Done');\n    });\n  });\n  callback('./Comparison.xlsx');\n}\n\nmodule.exports = MyFunction;\n\n//# sourceURL=webpack:///./server/xml.js?");

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