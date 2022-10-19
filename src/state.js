// init state
const initState = {
  dataSchema: [],
  dataSchemaJsonColumn: { Location: true },
  widgetSchema: [],
  widgetSchemaJsonColumn: { SettingStr: true },
  currentFileName: "",
};

export const fileNameMap = {
  data: "data",
  widget: "widget"
};

export const allowFiles = {
  [fileNameMap.data]: true,
  [fileNameMap.widget]: true,
};

export const jsonTypeHeaderMap = {
  [fileNameMap.data]: initState.dataSchemaJsonColumn,
  [fileNameMap.widget]: initState.widgetSchemaJsonColumn,
};

export function getGlobalVariable(target) {
  console.trace(`get global variable: ${target}`);
  return initState[target];
}

export function setGlobalVariable(target, value) {
  console.trace(`set global variable: ${target}, value: ${value}`);
  initState[target] = value;
}
