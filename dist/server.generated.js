module.exports=function(e){var t={};function r(l){if(t[l])return t[l].exports;var n=t[l]={i:l,l:!1,exports:{}};return e[l].call(n.exports,n,n.exports,r),n.l=!0,n.exports}return r.m=e,r.c=t,r.d=function(e,t,l){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:l})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var l=Object.create(null);if(r.r(l),Object.defineProperty(l,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)r.d(l,n,function(t){return e[t]}.bind(null,n));return l},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="/dist/",r(r.s=4)}([function(e,t){e.exports=require("xlsx")},function(e,t){e.exports=require("fs")},function(e,t){e.exports=require("excel4node")},function(e,t){e.exports=require("string-similarity")},function(e,t,r){r(5),e.exports=r(6)},function(e,t){e.exports=require("babel-polyfill")},function(e,t,r){const l=r(7),n=r(8),o=r(9),a=(r(10),r(0),r(11)),i=r(12);var s=a.memoryStorage(),c=a({storage:s}).single("userPhoto");const u=l();u.use(o.urlencoded({extended:!1})),u.use(o.json());const p=process.cwd();u.use(l.static(n.join(p,"public"))),u.get("/test",(e,t)=>{t.send("My page")}),u.get("/test1",(e,t)=>{t.send("My page 2")}),u.get("/getfile1",(e,t)=>{console.log(e.query),t.send("My page 2")}),u.post("/getfile",(e,t)=>{c(e,t,(async function(r){if(r)return t.end("Error uploading file.");console.log("Call");var l=await i(`${e.file.originalname}`);return console.log("Result",l),t.download(l)}))}),u.get("*",(e,t)=>{t.send("My web page")});const d=process.env.PORT||3e3;u.listen(d)},function(e,t){e.exports=require("express")},function(e,t){e.exports=require("path")},function(e,t){e.exports=require("body-parser")},function(e,t){e.exports=require("formidable")},function(e,t){e.exports=require("multer")},function(e,t,r){const l=r(1),n=r(13),o=(r(2),r(14)),a=(r(15),r(0)),i=(r(3),r(16));var s=2;async function c(e){return new Promise(t=>setTimeout(t,e))}async function u(e,t){var r=a.readFile("Extracted.xlsx"),o=r.Sheets["Extracted Data"];console.log(e);var i=new n.Parser;l.readFile(e,(async function(e,t){i.parseString(t,(async function(e,t){let n=JSON.stringify(t,null,2);l.writeFileSync("xml.json",n),l.writeFileSync("xml.txt",t),t.questionSet.question.forEach((async function(e){var t={LO:"",topic:"",AACSB:"",BB:"",FN:"",blooms:"",difficulty:"",time:"",type:"",gradable:""};t.qtype=e.type.toString(),t.LODescription="",t.title=e.title.toString();var r=e.questionProperties[0];for(individualProperty of r.property)"customType"===individualProperty.$.name&&(""!=individualProperty.$.value&&(t.qtype=individualProperty.$.value),console.log(t.title,t.qtype));e.categories.forEach((function(e){e.internal_category.forEach((function(e){var r=e.title.toString();r.includes("Learning Objective:")&&(""!==t.LO&&(t.LO+=", "),t.LO+=r.replace(/(.*)(\d{2,3})(-)(\d{2,3})(.*)/g,"$2$3$4")),r.includes("Learning Objective:")&&(""!==t.LODescription&&(t.LODescription+=";"),t.LODescription+=r.replace(/(.*)(\d{2,3})(-)(\d{2,3})(.*)/g,"$2$3$4 $5")),r.includes("Topic:")&&(""!==t.topic&&(t.topic+=", "),t.topic+=r.replace(/Topic: /g,"")),r.includes("AACSB:")&&(""!==t.AACSB&&(t.AACSB+=", "),t.AACSB+=r.replace(/AACSB: /g,"")),r.includes("AICPA: BB")&&(""!==t.BB&&(t.BB+=", "),t.BB+=r.replace(/AICPA: BB /g,"")),r.includes("AICPA: FN")&&(""!==t.FN&&(t.FN+=", "),t.FN+=r.replace(/AICPA: FN /g,"")),r.includes("Blooms:")&&(""!==t.blooms&&(t.blooms+=", "),t.blooms+=r.replace(/Blooms: /g,"")),r.includes("Difficulty:")&&(""!==t.difficulty&&(t.difficulty+=", "),t.difficulty+=r.replace(/Difficulty: /g,"")),r.includes("Est Time:")&&(""!==t.time&&(t.time+=", "),t.time+=r.replace(/Est Time: /g,"")),r.includes("Type:")&&(""!==t.type&&(t.type+=", "),t.type+=r.replace(/Type: /g,"")),r.includes("Gradable:")&&(""!==t.gradable&&(t.gradable+=", "),t.gradable+=r.replace(/Gradable: /g,""))}))}));var l=[[`${t.title}`,`${t.LO}`,`${t.topic}`,`${t.AACSB}`,`${t.BB}`,`${t.FN}`,`${t.blooms}`,`${t.difficulty}`,`${t.time}`,`${t.type}`,`${t.qtype}`,`${t.gradable}`,`${t.LODescription}`]];a.utils.sheet_add_aoa(o,l,{origin:`A${s}`}),s++})),await a.writeFileSync(r,"Extracted.xlsx"),console.log("Done")}))})),t("./Comparison.xlsx")}e.exports=async function(e){var t=new o(e).getEntries();for await(const e of t){if(await c(2e3),console.log(e.entryName),"xlsx"==e.entryName.split(".").pop()){var r=a.readFile(e.entryName),n=r.SheetNames[0],s=r.Sheets[n],p=a.readFile("ExcelTemplate.xlsx");a.utils.book_append_sheet(p,s,n);var d=r.SheetNames[1],f=r.Sheets[d];await a.writeFileSync(p,"Extracted.xlsx");p=a.readFile("Extracted.xlsx");a.utils.book_append_sheet(p,f,d);let t=JSON.stringify(a.utils.sheet_to_json(s),null,2);l.writeFileSync("PM.json",t),await a.writeFileSync(p,"Extracted.xlsx")}"xml"==e.entryName.split(".").pop()&&await u(e.entryName,(function(e){console.log(e)}))}await c(2e3),await i("Extracted.xlsx"),await c(2e3);var g=new o;return g.addLocalFile("./Comparison.xlsx"),g.addLocalFile("./Extracted.xlsx"),g.writeZip("./Output.zip"),await c(2e3),"./Output.zip"}},function(e,t){e.exports=require("xml2js")},function(e,t){e.exports=require("adm-zip")},function(e,t){e.exports=require("exceljs")},function(e,t,r){const l=r(0),n=r(3),o=(r(1),r(2));function a(e){var t=e.split(" ");return t[t.length-1]}function i(e){return/\d/g.test(e)}function s(e,t){var r={};t=(t=t.replace(/  +/g,",")).replace("\r\n",","),e=e.trim(),t=t.trim();var l=e.split(/[,;]/g).sort(),o=t.split(/[,;]/g).sort();l=l.filter(Boolean),o=o.filter(Boolean);for(var a=0;a<l.length;a++)l[a]=l[a].trim();for(a=0;a<l.length;a++)o[a]=o[a].trim();return l=l.sort(),o=o.sort(),r.extract=l.toString(),r.PM=o.toString(),r.Result=n.compareTwoStrings(l.toString(),o.toString()),r}function u(e,t){return s(e,t)}function p(e,t){return s(e,t)}function f(e,t){return s(e,t)}function g(e,t){return s(e,t)}function y(e,t){return s(e,t)}function x(e,t){var r=e.toUpperCase(),l=t.toUpperCase(),n={};return n.extract=r,n.PM=l,n.Result=1,r.includes("ESSAY")&&l.includes("AUTO")&&(n.Result=0),n}function m(e,t){var r=e.charAt(0);r=r.toUpperCase();var l=t.toUpperCase(),n={};return n.extract=r,n.PM=l,n.Result=0,"B"===l?"S"!==r&&"A"!==r||(n.Result=1):r===l&&(n.Result=1),n}function $(e,t){var r=e,l=t;return i(r)&&(r=a(r)),i(l)&&(l=a(l)),s(r,l)}function h(e,t){var r=e,l={extract:"",PM:"",Result:0};if(e.includes(";")){var n=r.split(/[;]/g).sort();for(var o of n){for(var a of t)if(c=o,d=a.LODescription,c===d){var i=s(o,a.LODescription.replace(/\s{2,}/g," "));""!==l.extract&&(l.extract+=", "),""!==l.PM&&(l.PM+=", "),l.extract+=i.extract,l.PM+=i.PM,l.Result=l.Result+i.Result}l.Result>1&&(l.Result=l.Result/2)}}else for(var a of t)e.replace(/(.*)(\d{2,3})(-)(\d{2,3})(.*)/g,"$2$3$4")===a.LODescription.replace(/(.*)(\d{2,3})(-)(\d{2,3})(.*)/g,"$2$3$4")&&(l=s(e,a.LODescription.replace(/\s{2,}/g," ")));return l}function b(e,t){var r=e,l=t;return i(r)&&(r=a(r)),i(l)&&(l=a(l)),s(r,l)}function R(e,t){var r=e.match(/(\d{1,3})/g),l=t.match(/(\d{1,3})/g),n={};return n.extract=e,n.PM=t,r.length>1&&l.length>1?r[r.length-1]===l[l.length-1]&&r[0]===l[0]?n.Result=1:n.Result=0:n.Result=parseInt(r[r.length-1])===parseInt(l[l.length-1])?1:0,n}e.exports=async function(e){var t=new o.Workbook,r=t.createStyle({font:{color:"#000000",size:12},numberFormat:"$#,##0.00; ($#,##0.00); -"}),n=t.createStyle({font:{bold:!0,color:"#000000",size:12},fill:{type:"pattern",patternType:"solid",fgColor:"#00B8FF"},numberFormat:"$#,##0.00; ($#,##0.00); -"}),a=t.createStyle({font:{color:"#000000",size:12},fill:{type:"pattern",patternType:"solid",fgColor:"#FF0000"},numberFormat:"$#,##0.00; ($#,##0.00); -"}),i=t.createStyle({font:{color:"#000000",size:12},fill:{type:"pattern",patternType:"solid",fgColor:"#FFA500"},numberFormat:"$#,##0.00; ($#,##0.00); -"}),c=t.addWorksheet("Comparison Result",{sheetFormat:{defaultColWidth:30}});c.cell(1,1).string("Question").style(n),c.cell(1,2).string("LO").style(n),c.cell(1,3).string("Topic").style(n),c.cell(1,4).string("AACSB").style(n),c.cell(1,5).string("BB").style(n),c.cell(1,6).string("FN").style(n),c.cell(1,7).string("Blooms").style(n),c.cell(1,8).string("Difficulty").style(n),c.cell(1,9).string("Time").style(n),c.cell(1,10).string("Type").style(n),c.cell(1,11).string("Worksheet").style(n),c.cell(1,12).string("Gradable").style(n),c.cell(1,13).string("LODescription").style(n);var d,M,S,v,P=l.readFile("Extracted.xlsx"),D=P.Sheets["Extracted Data"],B=l.utils.sheet_to_json(D),F=P.Sheets.Sheet1,A=P.Sheets.Sheet2,O=l.utils.sheet_to_json(F),E=l.utils.sheet_to_json(A),w=2;for(let e of B){e.Q=e.Q.replace(/\[(.*)\]/g,"");var C=e.Q.match(/(\d{1,2}-\d{1,3})/g);C[0]=C[0].replace(/\b0+/g,"");for(let t of O){var T=t.Q.match(/(\d{1,2}-\d{1,3})/g);if(C[0]===T[0]){var L=(d=e.LO,M=t.LO,S=void 0,v=void 0,S=d.match(/(\d{1,2}-\d{1,3})/g),v=M.match(/(\d{1,2}-\d{1,3})/g),s(S.toString(),v.toString())),q=u(e.Topic,t.Topic),_=p(e.AACSB,t.AACSB),j=f(e.BB,t.BB),N=g(e.FN,t.FN),k=$(e.Blooms,t.Blooms),z=b(e.Difficulty,t.Difficulty),W=R(e.Time,t.Time),I=m(e.Type,t.Type),Q=y(e.Worksheet,t.Worksheet),U=x(e.Gradable,t.Worksheet),G=h(e.LODescription,E);c.cell(w,1).string(e.Q).style(r),c.cell(w,2).string(`Extracted Data: ${L.extract}\r\nProblem Map Data: ${L.PM}\r\nMatch: ${L.Result}`).style(1===L.Result?r:L.Result>=.95?i:a),c.cell(w,3).string(`Extracted Data: ${q.extract}\r\nProblem Map Data: ${q.PM}\r\nMatch: ${q.Result}`).style(1===q.Result?r:q.Result>=.95?i:a),c.cell(w,4).string(`Extracted Data: ${_.extract}\r\nProblem Map Data: ${_.PM}\r\nMatch: ${_.Result}`).style(1===_.Result?r:_.Result>=.95?i:a),c.cell(w,5).string(`Extracted Data: ${j.extract}\r\nProblem Map Data: ${j.PM}\r\nMatch: ${j.Result}`).style(1===j.Result?r:j.Result>=.95?i:a),c.cell(w,6).string(`Extracted Data: ${N.extract}\r\nProblem Map Data: ${N.PM}\r\nMatch: ${N.Result}`).style(1===N.Result?r:N.Result>=.95?i:a),c.cell(w,7).string(`Extracted Data: ${k.extract}\r\nProblem Map Data: ${k.PM}\r\nMatch: ${k.Result}`).style(1===k.Result?r:k.Result>=.95?i:a),c.cell(w,8).string(`Extracted Data: ${z.extract}\r\nProblem Map Data: ${z.PM}\r\nMatch: ${z.Result}`).style(1===z.Result?r:z.Result>=.95?i:a),c.cell(w,9).string(`Extracted Data: ${W.extract}\r\nProblem Map Data: ${W.PM}\r\nMatch: ${W.Result}`).style(1===W.Result?r:W.Result>=.95?i:a),c.cell(w,10).string(`Extracted Data: ${I.extract}\r\nProblem Map Data: ${I.PM}\r\nMatch: ${I.Result}`).style(1===I.Result?r:I.Result>=.95?i:a),c.cell(w,11).string(`Extracted Data: ${Q.extract}\r\nProblem Map Data: ${Q.PM}\r\nMatch: ${Q.Result}`).style(1===Q.Result?r:Q.Result>=.95?i:a),c.cell(w,12).string(`Extracted Data: ${U.extract}\r\nProblem Map Data: ${U.PM}\r\nMatch: ${U.Result}`).style(1===U.Result?r:U.Result>=.95?i:a),c.cell(w,13).string(`Extracted Data: ${G.extract}\r\nProblem Map Data: ${G.PM}\r\nMatch: ${G.Result}`).style(1===G.Result?r:G.Result>=.95?i:a)}}w++}console.log("Comp St"),t.write("./Comparison.xlsx"),console.log("Comp End")}}]);