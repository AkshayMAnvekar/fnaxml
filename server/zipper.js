const AdmZip = require('adm-zip');

var OutputZip = new AdmZip();
OutputZip.addLocalFile("./PM.xlsx");
OutputZip.addLocalFile("./T_13570164659527725.xml");
OutputZip.addLocalFile("./T_13570164659530813.xml");
OutputZip.writeZip("./Archive.zip");
