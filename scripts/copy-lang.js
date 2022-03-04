const fs = require("fs");
const path = require("path");

const INPUT_PATH = "../node_modules/@subsocial/i18n/examples";
const OUTPUT_PATH = "../src/i18n";

const inputFolderPath = path.join(__dirname, INPUT_PATH);
const outputFolderPath = path.join(__dirname, OUTPUT_PATH);

const files = fs.readdirSync(inputFolderPath);

files.forEach((file) => resolveFile(file));

function resolveFile(file) {
  try {
    const data = fs.readFileSync(inputFolderPath + "/" + file);
    const langObj = JSON.parse(data);

    iterate(langObj);

    const stringify = JSON.stringify(langObj, null, 2);

    fs.writeFileSync(outputFolderPath + "/" + file, stringify);

    console.log(`File ${file} saved in directory ${outputFolderPath}`);
  } catch (e) {
    console.error(e);
  }
}

function iterate(obj) {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (typeof obj[key] === "object") {
        iterate(obj[key]);
      } else {
        const value = obj[key].replace(/{/g, "{{").replace(/}/g, "}}");
        obj[key] = value;
      }
    }
  }
}
