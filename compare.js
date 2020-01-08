var XLSX = require('xlsx');
var stringSimilarity = require('string-similarity');
var fs = require('fs')

async function MyCompare(theExcelFile) {
  var cWorkBook = XLSX.readFile('XML.xlsx');
  var extWS = cWorkBook.Sheets['Extracted Data'];
  var extJson = XLSX.utils.sheet_to_json(extWS);
  var pmWS = cWorkBook.Sheets['Sheet1'];
  var pmJson = XLSX.utils.sheet_to_json(pmWS);
  var i = 1;
  for (let Que of extJson) {
    Que.Q = Que.Q.replace(/\[(.*)\]/g, "");
    var qNo = Que.Q.match(/(\d{1,2}-\d{1,3})/g);
    qNo[0] = qNo[0].replace(/\b0+/g, "");
    for (let pmQ of pmJson) {
      var pmQNo = pmQ.Q.match(/(\d{1,2}-\d{1,3})/g);
      if(qNo[0] === pmQNo[0]) {
        console.log(qNo[0],pmQNo[0]);
        LoCheck(Que.LO,pmQ.LO);
        TopicCheck(Que.Topic,pmQ.Topic)
        AacsbCheck(Que.AACSB, pmQ.AACSB)
        BbCheck(Que.BB, pmQ.BB)
        FnCheck(Que.FN, pmQ.FN)
        BloomsCheck(Que.Blooms, pmQ.Blooms)
        DifficultyCheck(Que.Difficulty, pmQ.Difficulty)
        TimeCheck(Que.Time, pmQ.Time)
      }
    }
    // console.log(qNo, Que.Q);
    // i++;
  }
}

function LastWord(words) {
  var n = words.split(" ");
  return n[n.length - 1];
}

function hasNumbers(t) {
  var regex = /\d/g;
  return regex.test(t);
}    

async function LoCheck (extLO, pmLO) {
  var a = extLO.match(/(\d{1,2}-\d{1,3})/g);
  var b = pmLO.match(/(\d{1,2}-\d{1,3})/g);
  console.log(a,b);
}

async function TopicCheck(extTop, pmTop) {
  var a = extTop;
  var b = pmTop;
  console.log(a, b);
}

async function AacsbCheck(extAA, pmAA) {
  var a = extAA;
  var b = pmAA;
  console.log(a, b);
}

async function BbCheck(extBB, pmBB) {
  var a = extBB;
  var b = pmBB;
  console.log(a, b);
}

async function FnCheck(extFN, pmFN) {
  var a = extFN;
  var b = pmFN;
  console.log(a, b);
}

async function BloomsCheck(extBloom, pmBloom) {
  var a = extBloom;
  var b = pmBloom;
  if(hasNumbers(a)) {
    a = LastWord(a);
  }
  if (hasNumbers(b)) {
    b = LastWord(b);
  }
  console.log(a, b);
}

async function DifficultyCheck(extDiff, pmDiff) {
  var a = extDiff;
  var b = pmDiff;
  if (hasNumbers(a)) {
    a = LastWord(a);
  }
  if (hasNumbers(b)) {
    b = LastWord(b);
  }
  console.log(a, b);
}

async function TimeCheck(extTime, pmTime) {
  var a = extTime;
  var b = pmTime;
  console.log(a, b);
}

module.exports = MyCompare;
