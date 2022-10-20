// init state
const initState = {
  dataSchema: [],
  dataSchemaJsonColumn: { Location: true },
  widgetSchema: [],
  widgetSchemaJsonColumn: { SettingStr: true },
  dynamicSchema: [],
  currentFileName: "",
};

export const fileNameMap = {
  data: "Data",
  widget: "Widget",
  widgetBranchList: "WidgetBranchList",
};

export const allowFiles = Object.values(fileNameMap).reduce((accu, curr) => {
  accu[curr] = true;
  return accu;
}, {});

console.log(allowFiles);

export const jsonTypeHeaderMap = {
  [fileNameMap.data]: initState.dataSchemaJsonColumn,
  [fileNameMap.widget]: initState.widgetSchemaJsonColumn,
};

/**
 * 取得暫存變數
 * @date 2022-10-20
 * @param {keyof typeof initState} target
 * @returns {any}
 */
export function getGlobalVariable(target) {
  console.trace(`get global variable: ${target}`);
  return initState[target];
}

/**
 * 更新暫存變數，不會做任何檢查!!!
 * @date 2022-10-20
 * @param {keyof typeof initState} target
 * @param {any} value
 * @returns {void}
 */
export function setGlobalVariable(target, value) {
  console.trace(`set global variable: ${target}, value: ${value}`);
  initState[target] = value;
}
