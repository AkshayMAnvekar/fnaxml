// const fs = require('fs');
var fs = require('fs'),
    xml2js = require('xml2js');
var excel = require('excel4node');


function MyFunction(theFile) {
  var workbook = new excel.Workbook();
  var worksheet = workbook.addWorksheet('Sheet 1');
  var style = workbook.createStyle({
    font: {
      // color: '#FF0800',
      size: 12
    },
    numberFormat: '$#,##0.00; ($#,##0.00); -'
  });


  var xml = theFile;
  console.log(xml);
  //__dirname + `/T_13570164659530813.xml`;
  var parser = new xml2js.Parser();
  fs.readFile(theFile, function(err, data) {
      parser.parseString(data, function (err, result) {
          // console.dir(result);
          let data = JSON.stringify(result, null, 2);
          fs.writeFileSync('xml.json', data);
          var i = 2, j = 1;
          var quest = result.questionSet;
          var que = quest.question
          worksheet.cell(1, 1).string('Q').style(style);
          worksheet.cell(1, 2).string('LO').style(style);
          worksheet.cell(1, 3).string('Topic').style(style);
          // worksheet.cell(1,18).string(tags.topic).style(style);
          worksheet.cell(1, 4).string('AACSB').style(style);
          worksheet.cell(1, 5).string('AICPA BB').style(style);
          worksheet.cell(1, 6).string('AICPA FN').style(style);
          worksheet.cell(1, 7).string('Blooms').style(style);
          worksheet.cell(1, 8).string('Difficulty').style(style);
          worksheet.cell(1, 9).string('Est Time').style(style);
          que.forEach(function(value) {
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
            console.log("value.title");
            value.categories.forEach(function(value1) {
              value1.internal_category.forEach(function(value2) {
                var tag = value2.title.toString();
                if(tag.includes("Learning Objective:")) {
                  if(tags['LO'] !== '') {
                    tags['LO'] += ', ';
                  }
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
              });
            });
            console.log(tags);
            worksheet.cell(i,1).string(tags.title).style(style);
            worksheet.cell(i,2).string(tags.LO).style(style);
            worksheet.cell(i,3).string(tags.topic).style(style);
            // worksheet.cell(i,18).string(tags.topic).style(style);
            worksheet.cell(i,4).string(tags.AACSB).style(style);
            worksheet.cell(i,5).string(tags.BB).style(style);
            worksheet.cell(i,6).string(tags.FN).style(style);
            worksheet.cell(i,7).string(tags.blooms).style(style);
            worksheet.cell(i,8).string(tags.difficulty).style(style);
            worksheet.cell(i,9).string(tags.time).style(style);
            i++;
          });
          // for(var q in que) {
            // console.log(q['categories'])
            // var cat = q['categories']
            // for(var id in cat.internal_category) {
            //   worksheet.cell(j,i).string(id).style(style);
            //   i++;
            // }
            // j++;
          // }
          workbook.write('Excel.xlsx');
          console.log('Done');
      });
  });
  return './Excel.xlsx';
}

module.exports = MyFunction;