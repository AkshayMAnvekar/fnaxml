module.exports=function(e){var t={};function r(n){if(t[n])return t[n].exports;var a=t[n]={i:n,l:!1,exports:{}};return e[n].call(a.exports,a,a.exports,r),a.l=!0,a.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)r.d(n,a,function(t){return e[t]}.bind(null,a));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="/dist/",r(r.s=10)}([function(e,t){e.exports=require("xlsx")},function(e,t){e.exports=require("fs")},function(e,t){e.exports=require("express")},function(e,t){e.exports=require("body-parser")},function(e,t){e.exports=require("multer")},function(e,t){e.exports=require("adm-zip")},function(e,t){e.exports=require("path")},function(e,t){e.exports=require("xml2js")},function(e,t){e.exports=require("excel4node")},function(e,t){e.exports=require("string-similarity")},function(e,t,r){r(11),e.exports=r(12)},function(e,t){e.exports=require("babel-polyfill")},function(e,t,r){"use strict";r.r(t);var n=r(2),a=r.n(n),o=r(6),l=r.n(o),i=r(3),s=r.n(i),c=(r(13),r(0)),u=r.n(c),p=r(4),f=r.n(p),d=r(1),g=r.n(d),x=r(7),m=r.n(x),y=r(8),b=r.n(y),$=r(5),S=r.n($),h=(r(14),r(9)),M=r.n(h),v=2;async function B(e){return new Promise(t=>setTimeout(t,e))}async function P(e){var t=new S.a(e).getEntries();for await(const e of t){if(await B(1e3),console.log(e.entryName),"xlsx"==e.entryName.split(".").pop()){var r=u.a.readFile(e.entryName),n=r.SheetNames[0],a=r.Sheets[n],o=u.a.readFile("ExcelTemplate.xlsx");u.a.utils.book_append_sheet(o,a,n);let t=JSON.stringify(u.a.utils.sheet_to_json(a),null,2);g.a.writeFileSync("PM.json",t),await u.a.writeFile(o,"Extracted.xlsx")}"xml"==e.entryName.split(".").pop()&&await w(e.entryName,(function(e){console.log(e)}))}await B(1e3),await async function(e){var t=new b.a.Workbook,r=t.createStyle({font:{color:"#000000",size:12},numberFormat:"$#,##0.00; ($#,##0.00); -"}),n=t.createStyle({font:{color:"#000000",size:12},fill:{type:"pattern",patternType:"solid",fgColor:"#FF0000"},numberFormat:"$#,##0.00; ($#,##0.00); -"}),a=t.addWorksheet("Comparison Result",{sheetFormat:{defaultColWidth:30}}),o=u.a.readFile("Extracted.xlsx"),l=o.Sheets["Extracted Data"],i=u.a.utils.sheet_to_json(l),s=o.Sheets.Sheet1,c=u.a.utils.sheet_to_json(s),p=2;for(let e of i){e.Q=e.Q.replace(/\[(.*)\]/g,"");var f=e.Q.match(/(\d{1,2}-\d{1,3})/g);f[0]=f[0].replace(/\b0+/g,"");for(let t of c){var d=t.Q.match(/(\d{1,2}-\d{1,3})/g);if(f[0]===d[0]){var g=(v=e.LO,B=t.LO,P=void 0,w=void 0,P=v.match(/(\d{1,2}-\d{1,3})/g),w=B.match(/(\d{1,2}-\d{1,3})/g),E(P.toString(),w.toString())),x=D(e.Topic,t.Topic),m=C(e.AACSB,t.AACSB),y=R(e.BB,t.BB),$=O(e.FN,t.FN),S=j(e.Blooms,t.Blooms),h=N(e.Difficulty,t.Difficulty),M=T(e.Time,t.Time);console.log(f[0],d[0]),a.cell(p,1).string(e.Q).style(r),a.cell(p,2).string(`Extracted Data: ${g.extract}\r\nProblem Map Data: ${g.PM}\r\nMatch: ${g.Result}`).style(g.Result>=.95?r:n),a.cell(p,3).string(`Extracted Data: ${x.extract}\r\nProblem Map Data: ${x.PM}\r\nMatch: ${x.Result}`).style(x.Result>=.95?r:n),a.cell(p,4).string(`Extracted Data: ${m.extract}\r\nProblem Map Data: ${m.PM}\r\nMatch: ${m.Result}`).style(m.Result>=.95?r:n),a.cell(p,5).string(`Extracted Data: ${y.extract}\r\nProblem Map Data: ${y.PM}\r\nMatch: ${y.Result}`).style(y.Result>=.95?r:n),a.cell(p,6).string(`Extracted Data: ${$.extract}\r\nProblem Map Data: ${$.PM}\r\nMatch: ${$.Result}`).style($.Result>=.95?r:n),a.cell(p,7).string(`Extracted Data: ${S.extract}\r\nProblem Map Data: ${S.PM}\r\nMatch: ${S.Result}`).style(S.Result>=.95?r:n),a.cell(p,8).string(`Extracted Data: ${h.extract}\r\nProblem Map Data: ${h.PM}\r\nMatch: ${h.Result}`).style(h.Result>=.95?r:n),a.cell(p,9).string(`Extracted Data: ${M.extract}\r\nProblem Map Data: ${M.PM}\r\nMatch: ${M.Result}`).style(M.Result>=.95?r:n)}}p++}var v,B,P,w;console.log("Comp St"),t.write("./Comparison.xlsx"),console.log("Comp End")}(),await B(1e3);var l=new S.a;return l.addLocalFile("./Comparison.xlsx"),l.addLocalFile("./Extracted.xlsx"),l.writeZip("./Output.zip"),await B(1e3),"./Output.zip"}async function w(e,t){var r=u.a.readFile("Extracted.xlsx"),n=r.Sheets["Extracted Data"];console.log(e);var a=new m.a.Parser;g.a.readFile(e,(async function(e,t){a.parseString(t,(async function(e,t){let a=JSON.stringify(t,null,2);g.a.writeFileSync("xml.json",a),g.a.writeFileSync("xml.txt",t),t.questionSet.question.forEach((async function(e){var t={LO:"",topic:"",AACSB:"",BB:"",FN:"",blooms:"",difficulty:"",time:""};t.title=e.title.toString(),e.categories.forEach((function(e){e.internal_category.forEach((function(e){var r=e.title.toString();r.includes("Learning Objective:")&&(""!==t.LO&&(t.LO+=", "),t.LO+=r.replace(/(.*)(\d{2,3})(-)(\d{2,3})(.*)/g,"$2$3$4")),r.includes("Topic:")&&(""!==t.topic&&(t.topic+=", "),t.topic+=r.replace(/Topic: /g,"")),r.includes("AACSB:")&&(""!==t.AACSB&&(t.AACSB+=", "),t.AACSB+=r.replace(/AACSB: /g,"")),r.includes("AICPA: BB")&&(""!==t.BB&&(t.BB+=", "),t.BB+=r.replace(/AICPA: BB /g,"")),r.includes("AICPA: FN")&&(""!==t.FN&&(t.FN+=", "),t.FN+=r.replace(/AICPA: FN /g,"")),r.includes("Blooms:")&&(""!==t.blooms&&(t.blooms+=", "),t.blooms+=r.replace(/Blooms: /g,"")),r.includes("Difficulty:")&&(""!==t.difficulty&&(t.difficulty+=", "),t.difficulty+=r.replace(/Difficulty: /g,"")),r.includes("Est Time:")&&(""!==t.time&&(t.time+=", "),t.time+=r.replace(/Est Time: /g,"")),r.includes("Type:")&&(""!==t.type&&(t.type+=", "),t.type+=r.replace(/Type: /g,"")),r.includes("Gradable:")&&(""!==t.gradable&&(t.gradable+=", "),t.gradable+=r.replace(/Gradable: /g,""))}))}));var r=[[`${t.title}`,`${t.LO}`,`${t.topic}`,`${t.AACSB}`,`${t.BB}`,`${t.FN}`,`${t.blooms}`,`${t.difficulty}`,`${t.time}`]];u.a.utils.sheet_add_aoa(n,r,{origin:`A${v}`}),v++})),await u.a.writeFile(r,"Extracted.xlsx"),console.log("Done")}))})),t("./Comparison.xlsx")}function A(e){var t=e.split(" ");return t[t.length-1]}function F(e){return/\d/g.test(e)}function E(e,t){var r={};t=(t=t.replace(/  +/g,",")).replace("\r\n",","),e=e.trim(),t=t.trim();var n=e.split(/[,;]/g).sort(),a=t.split(/[,;]/g).sort();n=n.filter(Boolean),a=a.filter(Boolean);for(var o=0;o<n.length;o++)n[o]=n[o].trim();for(o=0;o<n.length;o++)a[o]=a[o].trim();return n=n.sort(),a=a.sort(),r.extract=n.toString(),r.PM=a.toString(),r.Result=M.a.compareTwoStrings(n.toString(),a.toString()),r}function D(e,t){return E(e,t)}function C(e,t){return E(e,t)}function R(e,t){return E(e,t)}function O(e,t){return E(e,t)}function j(e,t){var r=e,n=t;return F(r)&&(r=A(r)),F(n)&&(n=A(n)),E(r,n)}function N(e,t){var r=e,n=t;return F(r)&&(r=A(r)),F(n)&&(n=A(n)),E(r,n)}function T(e,t){var r=e.match(/(\d{1,3})/g),n=t.match(/(\d{1,3})/g),a={};return a.extract=parseInt(r[r.length-1]),a.PM=parseInt(n[n.length-1]),a.Result=a.extract===a.PM?1:0,a}var _=f.a.memoryStorage(),q=f()({storage:_}).single("userPhoto");const L=a()();L.use(s.a.urlencoded({extended:!1})),L.use(s.a.json());const I=process.cwd();L.use(a.a.static(l.a.join(I,"public"))),L.get("/test",(e,t)=>{t.send("My page")}),L.get("/test1",(e,t)=>{t.send("My page 2")}),L.get("/getfile1",(e,t)=>{console.log(e.query),t.send("My page 2")}),L.post("/getfile",(e,t)=>{q(e,t,(async function(r){if(r)return t.end("Error uploading file.");console.log("Call");var n=await P(`${e.file.originalname}`);return console.log("Result",n),t.download(n)}))}),L.get("*",(e,t)=>{t.send("My web page")});const z=process.env.PORT||3e3;L.listen(z)},function(e,t){e.exports=require("formidable")},function(e,t){e.exports=require("exceljs")}]);