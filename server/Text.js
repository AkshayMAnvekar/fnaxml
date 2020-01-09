var AdmZip = require('adm-zip'), ExcelJS = require('exceljs');

var fileName = './XML.xlsx';
var workbook = new ExcelJS.Workbook();
workbook.xlsx.readFile(fileName)
    .then(function () {
        console.log(workbook);
        var worksheet = workbook.getWorksheet(1);
        console.log(worksheet);
        var row = worksheet.getRow(5).values;
        console.log(row);
    });

