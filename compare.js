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

      }
    }
    // console.log(qNo, Que.Q);
    // i++;
  }
}

module.exports = MyCompare;
