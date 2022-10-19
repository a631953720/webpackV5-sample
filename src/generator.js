import { getGlobalVariable, setGlobalVariable, jsonTypeHeaderMap } from "./state";
import { convertData, prettier, reversePrettier } from './utils';

function trGenerator(index, dataKeyList = [], element) {
  const fileName = getGlobalVariable("currentFileName");
  const map = jsonTypeHeaderMap[fileName];
  let html = "";

  dataKeyList.forEach((dataKey) => {
    const v = element[dataKey] !== null ? element[dataKey] : "";
    // 有設定檔來決定說是否為json格式
    if (map && map[dataKey]) {
      // html += `<td><pre class="pretty-json" data-idx="${index}" data-key="${dataKey}" data-type="json">${prettier(v)}</pre></td>`;
      // 因為click 的 target 會在pre元素上，所以把屬性都掛在上面
      html += `<td class="pretty-json"><pre data-idx="${index}" data-key="${dataKey}" data-type="json">${prettier(v)}</pre></td>`;
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
    input.value = prettier(data[target.dataset.key]);
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
export function generateDataSchemaTable() {
  const wrapper = document.getElementById("data-table-wrapper");
  const dataTable = document.getElementById("data-table");
  onFileLoad(wrapper, dataTable, "dataSchema");
}

export function generateWidgetSchemaTable() {
  const wrapper = document.getElementById("widget-table-wrapper");
  const widgetTable = document.getElementById("widget-table");
  onFileLoad(wrapper, widgetTable, "widgetSchema");
}