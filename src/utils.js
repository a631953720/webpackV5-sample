export function download(data, fileName) {
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

export function convertData({ origin, newData }) {
  if (typeof origin === "boolean") return newData.toLowerCase() === "true";
  if (typeof origin === "number") return Number(newData);
  return newData;
}

export function prettier(data) {
  try {
    return JSON.stringify(JSON.parse(data), null, 2);
  } catch {
    return data;
  }
}

export function reversePrettier(data) {
  try {
    return JSON.stringify(JSON.parse(data));
  } catch {
    return data;
  }
}

export function initAllPage() {
  const wrapper = document.getElementsByClassName("table-wrapper");

  Array.from(wrapper).forEach((element) => {
    const tbody = element.getElementsByTagName("tbody")[0];
    tbody.innerHTML = "";
    element.style = "display: none";
  });
}