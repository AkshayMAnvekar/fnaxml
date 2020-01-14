const AdmZip = require('adm-zip');

var OutputZip = new AdmZip();
OutputZip.addLocalFile("../Temp/PM.xlsx");
OutputZip.addLocalFile("../Temp/T_13570164663185081.xml");
OutputZip.addLocalFile("../Temp/T_13570164663205524.xml");
// OutputZip.addLocalFile("../Temp/T_13570164663208954.xml");
OutputZip.addLocalFile("../Temp/T_13570164663290414.xml");
OutputZip.addLocalFile("../Temp/T_13570164663290517.xml");
OutputZip.writeZip("../Other/Archive.zip");
