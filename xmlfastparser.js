var fastXmlParser = require('fast-xml-parser');
var xmlData = `/Volumes/Akshay/MyScripts/JS/node/xml/T_13570164659527725.xml`

var jsonObj = fastXmlParser.parse(xmlData);

/* upto 2.9.x
var options = {
    attrPrefix : "@_",
    attrNodeName: false,
    textNodeName : "#text",
    ignoreNonTextNodeAttr : true,
    ignoreTextNodeAttr : true,
    ignoreNameSpace : true,
    ignoreRootElement : false,
    textNodeConversion : true,
    textAttrConversion : false,
    arrayMode : false
};
*/
//from 3.0.0
var options = {
    attributeNamePrefix : "@_",
    attrNodeName: "attr", //default is 'false'
    textNodeName : "#text",
    ignoreAttributes : true,
    ignoreNameSpace : false,
    allowBooleanAttributes : false,
    parseNodeValue : true,
    parseAttributeValue : false,
    trimValues: true,
    decodeHTMLchar: false,
    cdataTagName: "__cdata", //default is 'false'
    cdataPositionChar: "\\c",
};
if(fastXmlParser.validate(xmlData)=== true){//optional
    var jsonObj = fastXmlParser.parse(xmlData,options);
    console.log(jsonObj)

}

//Intermediate obj
var tObj = fastXmlParser.getTraversalObj(xmlData,options);
var jsonObj = fastXmlParser.convertToJson(tObj,options);
console.log(jsonObj)
