// init state
const initState = {
  dataSchema: [],
  dataSchemaJsonColumn: { Location: true },
  widgetSchema: [],
  widgetSchemaJsonColumn: { SettingStr: true },
  currentFileName: "",
};

const fileNameMap = {
  data: "data",
  widget: "widget"
};

const allowFiles = {
  [fileNameMap.data]: true,
  [fileNameMap.widget]: true,
};

const jsonTypeHeaderMap = {
  [fileNameMap.data]: initState.dataSchemaJsonColumn,
  [fileNameMap.widget]: initState.widgetSchemaJsonColumn,
};

// utils
function getGlobalVariable(target) {
  console.trace(`get global variable: ${target}`);
  return initState[target];
}

function setGlobalVariable(target, value) {
  console.trace(`set global variable: ${target}, value: ${value}`);
  initState[target] = value;
}

function download(data, fileName) {
  const element = document.createElement("a");
  element.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(String(data))
  );
  element.setAttribute("download", fileName);

  element.style.display = "none";
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

function convertData({ origin, newData }) {
  if (typeof origin === "boolean") return newData.toLowerCase() === "true";
  if (typeof origin === "number") return Number(newData);
  return newData;
}

function initAllPage() {
  const wrapper = document.getElementById("data-table-wrapper");
  const dataTable = document.getElementById("data-table");
  const tbody = dataTable.getElementsByTagName("tbody")[0];
  tbody.innerHTML = "";
  wrapper.style = "display: none";
}

function prettier(data) {
  try {
    return JSON.stringify(JSON.parse(data), null, 2);
  } catch {
    return data;
  }
}

function reversePrettier(data) {
  try {
    return JSON.stringify(JSON.parse(data));
  } catch {
    return data;
  }
}

function trGenerator(index, dataKeyList = [], element) {
  const fileName = getGlobalVariable("currentFileName");
  const map = jsonTypeHeaderMap[fileName];
  let html = "";

  dataKeyList.forEach((dataKey) => {
    const v = element[dataKey] !== null ? element[dataKey] : "";
    // 有設定檔來決定說是否為json格式
    if (map && map[dataKey]) {
      html += `<td data-idx="${index}" data-key="${dataKey}" data-type="json">${prettier(v)}</td>`;
    } else {
      html += `<td data-idx="${index}" data-key="${dataKey}">${prettier(v)}</td>`;
    }
  });

  return html;
}

function tdOnClick(e, dataName) {
  const target = e.target;
  const data = getGlobalVariable(dataName)[target.dataset.idx];

  // replace to input element
  let input;
  target.innerHTML = "";
  if (target.dataset.type === "json") {
    input = document.createElement("textarea");
    input.type = "text";
    input.value = prettier(data[target.dataset.key]);
    input.style = "width: 300px; height: 200px";
  } else {
    input = document.createElement("input");
    input.type = "text";
    input.value = data[target.dataset.key];
  }
  target.appendChild(input);
  input.focus();

  // 防止事件冒泡
  input.onclick = (e) => {
    e.stopPropagation();
  };

  function updateData(e) {
    // const target = e.target;
    console.log(target, dataName, target.dataset.idx);
    const data = getGlobalVariable(dataName)[target.dataset.idx];

    const newData = convertData({
      origin: data[target.dataset.key],
      newData: e.target.value,
    });
    if (target.dataset.type === "json") {
      data[target.dataset.key] = reversePrettier(newData);
    } else {
      data[target.dataset.key] = newData;
    }
    target.innerHTML = newData;
    console.log(
      "update",
      getGlobalVariable(dataName)[target.dataset.idx]
    );
  }

  input.onkeydown = (e) => {
    if (e.key === "Enter") updateData(e);
  };
}

function onFileLoad(wrapper, tableEl, dataName) {
  // const wrapper = document.getElementById("widget-table-wrapper");
  const jsonFile = document.querySelector("#json-file");
  // const widgetTable = document.getElementById("widget-table");
  const tbody = tableEl.getElementsByTagName("tbody")[0];

  if (!jsonFile.value.length) return;

  const reader = new FileReader();

  reader.onload = (e) => {
    const str = e.target.result;
    const schema = JSON.parse(str);
    setGlobalVariable(dataName, schema);

    for (let i = 0; i < schema.length; i++) {
      const tr = document.createElement("tr");
      const element = schema[i];
      const keyList = Object.keys(element);

      tr.innerHTML = trGenerator(i, keyList, element);

      const tds = tr.getElementsByTagName("td");
      Array.from(tds).forEach((td) => {
        td.onclick = (e) => {
          tdOnClick(e, dataName);
        };
      });

      tbody.appendChild(tr);
    }

    wrapper.style = "";
  };

  reader.readAsText(jsonFile.files[0]);
}

// generator
function generateDataSchemaTable() {
  const wrapper = document.getElementById("data-table-wrapper");
  const dataTable = document.getElementById("data-table");
  onFileLoad(wrapper, dataTable, "dataSchema");
}

function generateWidgetSchemaTable() {
  const wrapper = document.getElementById("widget-table-wrapper");
  const widgetTable = document.getElementById("widget-table");
  onFileLoad(wrapper, widgetTable, "widgetSchema");
}

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
    const name = file.name.split(".json")[0].toLowerCase();
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
    const dataSchema = getGlobalVariable("dataSchema");

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
