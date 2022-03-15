// 1- node wcat.js filename --> displays content of the given filepath

// to take input we use process.argv; this allows us to take input in node
let myinp = process.argv.slice(2);
// console.log(myinp);
// let str=myinp.join(" ");
// console.log(str);
const fs = require("fs");
let filesArr = [];
// to manage code for options ex -n -s -b
let optionsArr = [];

// files path in filesarr
let counter = 2;
while (counter >= 0) {
    if (myinp[0].charAt(0) == '-') {
        optionsArr.push(myinp[0]);
        myinp.shift();
    }
    counter--;
}
for (let i = 0; i < myinp.length; i++) {
    filesArr.push(myinp[i]);
}
// console.log("files to be read - "+filesArr);

// check if file exist?
for (let i = 0; i < filesArr.length; i++) {
    let doesExist = fs.existsSync(filesArr[i]);
    if (!doesExist) {
        console.log("file not present");
        // return;
        process.exit();
    }

}

// now lets read and append files
let content = "";
for (let i = 0; i < filesArr.length; i++) {
    let filecontent = fs.readFileSync(filesArr[i]);
    content += filecontent + "\n";
}

if (optionsArr.length == 3) { optionsArr.pop() }
if (optionsArr.includes("-s") && optionsArr[0] != "-s") {
     console.log("invalid command");
    //   return;
    process.exit();
     }
for (let i = 0; i < optionsArr.length; i++) {

    let todonow = optionsArr[i];

    // console.log("to do now = ", todonow);
    if (todonow === "-n") {
        // console.log("-n is here\n");
        content = isN(optionsArr, content);
    } else if (todonow === "-s") {
        // console.log("-s is here\n");
        content = isS(optionsArr, content);
    } else if (todonow === "-b") {
        // console.log("-b is here\n");
        content = isB(optionsArr, content);
    } else { console.log("invalid args") }

}

// console.log("i am reachable");
// console.log(optionsArr);
console.log(content);


// return;
process.exit();


function isN(optionsArr, content) {

    // managing for options array input of "-n"
    // if(optionsArr[0]=="-n"){
    let newcont = "";
    let ncount = 1;
    let contentarr = content.split("\n");
    // console.log(contentarr);
    for (let i = 0; i < contentarr.length - 1; i++) {
        newcont += ncount + " " + contentarr[i] + "\n";
        ncount++;
    }
    content = newcont;
   // optionsArr.shift();
    // console.log(content);
    return content;
    // }

}

function isS(optionsArr, content) {
    // managing for "-s";
    // let isPresent = optionsArr.includes("-s");
    // if(optionsArr[0]=="-s"){
    // console.log("displayed from -s\n",content);
    let sArr = content.split("\r\n");
    let tempArr = [];
    for (let i = 0; i < sArr.length; i++) {
        if (sArr[i] != "") {
            tempArr.push(sArr[i]);
        }
    }
    let tempcontent = ""
    for (let i = 0; i < tempArr.length; i++) {
        tempcontent += tempArr[i] + "\n";
    }
    content = tempcontent;

    // console.log(content);

   // optionsArr.shift();
    // console.log(content);
    return content;
    // }
}

function isB(optionsArr, content) {

    // managing for "-b";
    // if(optionsArr[0]=="-b"){
    let newcont = "";
    ncount = 1;
    let contentarr = content.split("\r\n");

    // console.log(contentarr);
    for (let i = 0; i < contentarr.length - 1; i++) {
        // newcont+=ncount+" "+contentarr[i]+"\n";
        // ncount++;
        if (contentarr[i] != "") {
            newcont += ncount + " " + contentarr[i] + "\n";
            ncount++;
        } else {
            newcont += contentarr[i] + "\n";
        }
    }
    content = newcont;
   // optionsArr.shift();
    // console.log(content);
    return content;
    // }

}


// done implementing 
