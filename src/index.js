import './index.css';
import { allowFiles, fileNameMap, getGlobalVariable, setGlobalVariable } from "./state";
import { download, initAllPage } from './utils';
import { generateDataSchemaTable, generateWidgetSchemaTable } from './generator';

// constants
const fileHandleMap = {
  [fileNameMap.data]: generateDataSchemaTable,
  [fileNameMap.widget]: generateWidgetSchemaTable,
};
const fileDataMap = {
  [fileNameMap.data]: () => getGlobalVariable("dataSchema"),
  [fileNameMap.widget]: () => getGlobalVariable("widgetSchema"),
};

function init() {
  const jsonFile = document.querySelector("#json-file");
  jsonFile.onchange = (e) => {
    const file = e.target.files[0];
    const name = file.name.split(".json")[0];
    console.log(`file name: ${name}`);

    if (!allowFiles[name]) {
      alert("不支援的檔案");
      return;
    }

    setGlobalVariable("currentFileName", name);
  };

  const uploadBtn = document.getElementById("json-upload");
  uploadBtn.onclick = () => {
    const fileName = getGlobalVariable("currentFileName");

    if (typeof fileHandleMap[fileName] === "function") {
      initAllPage();
      return fileHandleMap[fileName]();
    } else {
      alert("找不到對應的處理");
    }
  };

  const saveBtn = document.getElementById("json-save");
  saveBtn.onclick = () => {
    const fileName = getGlobalVariable("currentFileName");

    if (typeof fileDataMap[fileName] !== "function") {
      alert("找不到對應的資料");
      return;
    }

    download(
      JSON.stringify(fileDataMap[fileName](), null, 2),
      `${fileName}.json`
    );
  };
}

init();
