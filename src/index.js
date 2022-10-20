import './index.css';
import { allowFiles, fileNameMap, getGlobalVariable, setGlobalVariable } from "./state";
import { download, initAllPage } from './utils';
import { generateDataSchemaTable, generateWidgetSchemaTable, generateDynamicSchemaTable } from './generator';

// constants
const fileHandleMap = {
  [fileNameMap.data]: generateDataSchemaTable,
  [fileNameMap.widget]: generateWidgetSchemaTable,
  [fileNameMap.widgetBranchList]: generateDynamicSchemaTable,
};

const fileDataMap = {
  [fileNameMap.data]: () => getGlobalVariable("dataSchema"),
  [fileNameMap.widget]: () => getGlobalVariable("widgetSchema"),
  [fileNameMap.widgetBranchList]: () => getGlobalVariable("dynamicSchema"),
};

function init() {
  const jsonFile = document.querySelector("#json-file");
  jsonFile.onchange = (e) => {
    const file = e.target.files[0];
    const name = file.name.split(".json")[0];
    console.log(`file name: ${name}`);

    // if (!allowFiles[name]) {
    //   alert("不支援的檔案");
    //   return;
    // }

    setGlobalVariable("currentFileName", name);
  };

  const uploadBtn = document.getElementById("json-upload");
  uploadBtn.onclick = () => {
    const fileName = getGlobalVariable("currentFileName");

    initAllPage();
    if (typeof fileHandleMap[fileName] === "function") {
      return fileHandleMap[fileName]();
    } else {
      generateDynamicSchemaTable()
      // alert("找不到對應的處理");
    }
  };

  const saveBtn = document.getElementById("json-save");
  saveBtn.onclick = () => {
    const fileName = getGlobalVariable("currentFileName");

    if (typeof fileDataMap[fileName] !== "function") {
      // alert("找不到對應的資料");
      download(
        JSON.stringify(getGlobalVariable("dynamicSchema"), null, 2),
        `${fileName}.json`
      );
    } else {
      download(
        JSON.stringify(fileDataMap[fileName](), null, 2),
        `${fileName}.json`
      );
    }
  };
}

init();
