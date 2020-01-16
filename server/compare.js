const XLSX = require('xlsx');
const stringSimilarity = require('string-similarity');
const fs = require('fs');
const excel = require('excel4node');

async function MyCompare(theExcelFile) {

  var compareWB = new excel.Workbook();
  var style = compareWB.createStyle({
    font: {
      color: '#000000',
      size: 12,
    },
    numberFormat: '$#,##0.00; ($#,##0.00); -',
  });
  var styleHeader = compareWB.createStyle({
    font: {
      bold: true,
      color: '#000000',
      size: 12,
    },
    fill: { // §18.8.20 fill (Fill)
      type: 'pattern', // Currently only 'pattern' is implemented. Non-implemented option is 'gradient'
      patternType: 'solid', //§18.18.55 ST_PatternType (Pattern Type)
      // bgColor: '#FF0000' // HTML style hex value. defaults to black
      fgColor: '#00B8FF' // HTML style hex value. defaults to black.
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
  var stylePartialMatch = compareWB.createStyle({
    font: {
      color: '#000000',
      size: 12,
    },
    fill: { // §18.8.20 fill (Fill)
      type: 'pattern', // Currently only 'pattern' is implemented. Non-implemented option is 'gradient'
      patternType: 'solid', //§18.18.55 ST_PatternType (Pattern Type)
      // bgColor: '#FF0000' // HTML style hex value. defaults to black
      fgColor: '#FFA500' // HTML style hex value. defaults to black.
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
  compareWS.cell(1, 1)
    .string('Question')
    .style(styleHeader);
  compareWS.cell(1, 2)
    .string('LO')
    .style(styleHeader);
  compareWS.cell(1, 3)
    .string('Topic')
    .style(styleHeader);
  compareWS.cell(1, 4)
    .string('AACSB')
    .style(styleHeader);
  compareWS.cell(1, 5)
    .string('BB')
    .style(styleHeader);
  compareWS.cell(1, 6)
    .string('FN')
    .style(styleHeader);
  compareWS.cell(1, 7)
    .string('Blooms')
    .style(styleHeader);
  compareWS.cell(1, 8)
    .string('Difficulty')
    .style(styleHeader);
  compareWS.cell(1, 9)
    .string('Time')
    .style(styleHeader);
  compareWS.cell(1, 10)
    .string('Type')
    .style(styleHeader);
  compareWS.cell(1, 11)
    .string('Worksheet')
    .style(styleHeader);
  compareWS.cell(1, 12)
    .string('Gradable')
    .style(styleHeader);
  compareWS.cell(1, 13)
    .string('LODescription')
    .style(styleHeader);
  var cWorkBook = XLSX.readFile('./Output/Extracted.xlsx');
  var extWS = cWorkBook.Sheets['Extracted Data'];
  var extJson = XLSX.utils.sheet_to_json(extWS);
  var pmWS = cWorkBook.Sheets['Sheet1'];
  var pmWS2 = cWorkBook.Sheets['Sheet2'];
  var pmJson = XLSX.utils.sheet_to_json(pmWS);
  var pmJson2 = XLSX.utils.sheet_to_json(pmWS2);
  // console.log(pmJson2);
  var i = 2;
  for (let Que of extJson) {
    Que.Q = Que.Q.replace(/\[(.*)\]/g, "");
    var qNo = Que.Q.match(/(\d{1,2}-\d{1,3})/);
    if (qNo !== null) {
      qNo[0] = qNo[0].replace(/\b0+/g, "");
    }

    for (let pmQ of pmJson) {
      var pmQNo = pmQ.Q.match(/(\d{1,2}-\d{1,3})/g);
      if (qNo !== null) {
       pmQNo[0] = pmQNo[0].replace(/\b0+/g, "");
      }
      if (qNo !== null) {
        if (qNo[0] === pmQNo[0]) {
        // console.log('Test',qNo[0],pmQNo);

        compareWS.cell(i, 1)
          .string(`Extracted Q Title:${Que.Q}\r\nProblem Map Q Title:${pmQ.Q}`)
          .style(style);

        if (typeof Que.LO !== 'undefined' && typeof pmQ.LO !== 'undefined') {
          var LORes = LoCheck(Que.LO, pmQ.LO)
          compareWS.cell(i, 2)
            .string(`Extracted Data: ${LORes['extract']}\r\nProblem Map Data: ${LORes['PM']}\r\nMatch: ${LORes['Result']}`)
            .style(((LORes['Result'] === 1) ? style : ((LORes['Result'] >= 0.95) ? stylePartialMatch : styleNoMatch)));
        }

        if (typeof Que.Topic !== 'undefined' && typeof pmQ.Topic !== 'undefined') {
          var TopicRes = TopicCheck(Que.Topic, pmQ.Topic)
          compareWS.cell(i, 3)
            .string(`Extracted Data: ${TopicRes['extract']}\r\nProblem Map Data: ${TopicRes['PM']}\r\nMatch: ${TopicRes['Result']}`)
            .style(((TopicRes['Result'] === 1) ? style : ((TopicRes['Result'] >= 0.95) ? stylePartialMatch : styleNoMatch)));
        }

        if (typeof Que.AACSB !== 'undefined' && typeof pmQ.AACSB !== 'undefined') {
          var AacsbRes = AacsbCheck(Que.AACSB, pmQ.AACSB)
          compareWS.cell(i, 4)
            .string(`Extracted Data: ${AacsbRes['extract']}\r\nProblem Map Data: ${AacsbRes['PM']}\r\nMatch: ${AacsbRes['Result']}`)
            .style(((AacsbRes['Result'] === 1) ? style : ((AacsbRes['Result'] >= 0.95) ? stylePartialMatch : styleNoMatch)));
        }

        if (typeof Que.BB !== 'undefined' && typeof pmQ.BB !== 'undefined') {
          var BBRes = BbCheck(Que.BB, pmQ.BB)
          compareWS.cell(i, 5)
            .string(`Extracted Data: ${BBRes['extract']}\r\nProblem Map Data: ${BBRes['PM']}\r\nMatch: ${BBRes['Result']}`)
            .style(((BBRes['Result'] === 1) ? style : ((BBRes['Result'] >= 0.95) ? stylePartialMatch : styleNoMatch)));
        }

        if (typeof Que.FN !== 'undefined' && typeof pmQ.FN !== 'undefined') {
          var FNRes = FnCheck(Que.FN, pmQ.FN)
          compareWS.cell(i, 6)
            .string(`Extracted Data: ${FNRes['extract']}\r\nProblem Map Data: ${FNRes['PM']}\r\nMatch: ${FNRes['Result']}`)
            .style(((FNRes['Result'] === 1) ? style : ((FNRes['Result'] >= 0.95) ? stylePartialMatch : styleNoMatch)));
        }

        if (typeof Que.Blooms !== 'undefined' && typeof pmQ.Blooms !== 'undefined') {
          var BloomsRes = BloomsCheck(Que.Blooms, pmQ.Blooms)
          compareWS.cell(i, 7)
            .string(`Extracted Data: ${BloomsRes['extract']}\r\nProblem Map Data: ${BloomsRes['PM']}\r\nMatch: ${BloomsRes['Result']}`)
            .style(((BloomsRes['Result'] === 1) ? style : ((BloomsRes['Result'] >= 0.95) ? stylePartialMatch : styleNoMatch)));
        }

        if (typeof Que.Difficulty !== 'undefined' && typeof pmQ.Difficulty !== 'undefined') {
          var DiffRes = DifficultyCheck(Que.Difficulty, pmQ.Difficulty)
          compareWS.cell(i, 8)
            .string(`Extracted Data: ${DiffRes['extract']}\r\nProblem Map Data: ${DiffRes['PM']}\r\nMatch: ${DiffRes['Result']}`)
            .style(((DiffRes['Result'] === 1) ? style : ((DiffRes['Result'] >= 0.95) ? stylePartialMatch : styleNoMatch)));
        }

        if (typeof Que.Time !== 'undefined' && typeof pmQ.Time !== 'undefined') {
          var TimeRes = TimeCheck(Que.Time, pmQ.Time)
          compareWS.cell(i, 9)
            .string(`Extracted Data: ${TimeRes['extract']}\r\nProblem Map Data: ${TimeRes['PM']}\r\nMatch: ${TimeRes['Result']}`)
            .style(((TimeRes['Result'] === 1) ? style : ((TimeRes['Result'] >= 0.95) ? stylePartialMatch : styleNoMatch)));
        }

        if (typeof Que.Type !== 'undefined' && typeof pmQ.Type !== 'undefined') {
          var TypeRes = TypeCheck(Que.Type, pmQ.Type)
          compareWS.cell(i, 10)
            .string(`Extracted Data: ${TypeRes['extract']}\r\nProblem Map Data: ${TypeRes['PM']}\r\nMatch: ${TypeRes['Result']}`)
            .style(((TypeRes['Result'] === 1) ? style : ((TypeRes['Result'] >= 0.95) ? stylePartialMatch : styleNoMatch)));
        }

        if (typeof Que.Worksheet !== 'undefined' && typeof pmQ.Worksheet !== 'undefined') {
          var qTypeRes = qTypeCheck(Que.Worksheet, pmQ.Worksheet)
          compareWS.cell(i, 11)
            .string(`Extracted Data: ${qTypeRes['extract']}\r\nProblem Map Data: ${qTypeRes['PM']}\r\nMatch: ${qTypeRes['Result']}`)
            .style(((qTypeRes['Result'] === 1) ? style : ((qTypeRes['Result'] >= 0.95) ? stylePartialMatch : styleNoMatch)));
        }

        if (typeof Que.Gradable !== 'undefined' && typeof pmQ.Worksheet !== 'undefined') {
          var GraRes = GraCheck(Que.Gradable, pmQ.Worksheet)
          compareWS.cell(i, 12)
            .string(`Extracted Data: ${GraRes['extract']}\r\nProblem Map Data: ${GraRes['PM']}\r\nMatch: ${GraRes['Result']}`)
            .style(((GraRes['Result'] === 1) ? style : ((GraRes['Result'] >= 0.95) ? stylePartialMatch : styleNoMatch)));
        }

        if (typeof Que.LODescription !== 'undefined' && typeof pmJson2 !== 'undefined') {
          var LoDesRes = LoDesCheck(Que.LODescription, pmJson2)
          compareWS.cell(i, 13)
            .string(`Extracted Data: ${LoDesRes['extract']}\r\nProblem Map Data: ${LoDesRes['PM']}\r\nMatch: ${LoDesRes['Result']}`)
            .style(((LoDesRes['Result'] === 1) ? style : ((LoDesRes['Result'] >= 0.95) ? stylePartialMatch : styleNoMatch)));
        }
      }
      }
    }
    i++;
  }
  console.log("Comparison write Start")
  compareWB.write('./Output/Comparison.xlsx');
  console.log("Comparison write End")

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

function qTypeCheck(extQt, pmQt) {
  var a = extQt;
  var b = pmQt;
  return MatchArray(a, b)
}

function GraCheck(extGra, pmGra) {
  var a = extGra.toUpperCase();
  var b = pmGra.toUpperCase();
  var result = {};
  result['extract'] = a;
  result['PM'] = b;
  result['Result'] = 1;
  // console.log('Grade:',a);
  if (a === '') {
    result['Result'] = 0;
  }
  if (a.includes('ESSAY') && b.includes('AUTO')) {
    result['Result'] = 0;
  }
  if (!a.includes('ESSAY') && b.includes('MANUAL')) {
    result['Result'] = 0.975;
  }
  return result
}

function TypeCheck(extType, pmType) {
  var a = extType.charAt(0);
  a = a.toUpperCase();
  var b = pmType.toUpperCase();
  var result = {};
  result['extract'] = a;
  result['PM'] = b;
  result['Result'] = 0;
  if(b === 'B') {
    if(a === 'S' || a === 'A') {
      result['Result'] = 1;
    }
  }
  else if(a === b) {
    result['Result'] = 1;
  }
  // if(a.toUpperCase() === b.toUpperCase()) {
  //   result['Result'] = 1;
  // }
  // result['Result'] = (result['extract'] === result['PM']) ? 1 : 0;
  // console.log('time',result)
  return result;
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

function LoDesCheck(extLoD, pmLoD) {
  var a = extLoD;
  var b = pmLoD;
  // console.log(a,b)
  // console.log(a);
  var result = {};
  result['extract'] = '';
  result['PM'] = '';
  result['Result'] = 0.0;
  if(extLoD.includes(';')) {
    var x = a.split(/[;]/g).sort();
    // console.log("Mul")
    for (var ext of x) {
      for (var lod of pmLoD) {
        c = ext
        d = lod['LODescription']
        // console.log('mul', ext)
        
        var e = c.match(/(\d{1,2}-\d{1,3})/);
        var f = d.match(/(\d{1,2}-\d{1,3})/g);
        if (e[0].replace(/\b0+/g, "") === f[0].replace(/\b0+/g, "")) {
          // console.log('Test', ext, lod['LODescription'])
          var g = ext.replace(/(\d{1,2}-\d{1,3})(.*)/g, "$2")
          var h = lod['LODescription'].replace(/\s{2,}/g, ' ')
          h = h.replace(/(.*)(\d{1,2}-\d{1,3})(.*)/g, "$3")
          // console.log('Test', g, h)
          var val = MatchArray(g.trim(), h.trim())
          if (result['extract'] !== '') {
            result['extract'] += ', ';
          }

          if (result['PM'] !== '') {
            result['PM'] += ', ';
          }
          // if (result['Result'] !== '') {
          //   result['Result'] += ', ';
          // }
          result['extract'] += val['extract'];
          result['PM'] += val['PM'];
          result['Result'] = result['Result'] + val['Result'];
        }
      }
      if(result['Result'] > 1) {
        result['Result'] = result['Result']/2;
      }

    }
      // console.log(x, typeof x);
    //   }
    // }
  }
  else {
    for(var lod of pmLoD) {
      // console.log(c)
      // console.log("Sin", extLoD)
      var k = extLoD.match(/(\d{1,2}-\d{1,3})/);
      var l = lod['LODescription'].match(/(\d{1,2}-\d{1,3})/g);
      // console.log('Test', k, l)
      // if (extLoD.replace(/(.*)(\d{2,3})(-)(\d{2,3})(.*)/g, '$2$3$4') === lod['LODescription'].replace(/(.*)(\d{2,3})(-)(\d{2,3})(.*)/g, '$2$3$4')) {
      if (k[0].replace(/\b0+/g, "") === l[0].replace(/\b0+/g, "")) {
        var m = extLoD.replace(/(\d{1,2}-\d{1,3})(.*)/g, "$2")
        var n = lod['LODescription'].replace(/\s{2,}/g, ' ')
        n = n.replace(/(.*)(\d{1,2}-\d{1,3})(.*)/g, "$3")
        console.log('Test', m, n)
        // var val = MatchArray(m, n)
        // result = MatchArray(extLoD, lod['LODescription'].replace(/\s{2,}/g, ' '))
        result = MatchArray(m.trim(), n.trim())
      }
      // var temp = MatchArray(a, b)
      // if(temp['Result'] > 0.95 ) {
        // result = temp;
      // }
      // console.log(lod, typeof lod);
    }

  }
  return result;
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
  result['extract'] = extTime
  result['PM'] = pmTime
  if ((a.length > 1) && (b.length > 1)) {
    if ((a[a.length - 1] === b[b.length - 1]) && (a[0] === b[0])) {
      result['Result'] = 1;
    }
    else {
      result['Result'] = 0;
    }
  }
  else {
    result['Result'] = (parseInt(a[a.length - 1]) === parseInt(b[b.length - 1])) ? 1 : 0;
  }
  // console.log('time',result)
  return result;
}

module.exports = MyCompare;
