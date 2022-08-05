function hideTitle(hideIndex = -1, title = []) {
  if (hideIndex < 0) {
    console.error('hideIndex < 0');
    return [];
  }
  return [title[0].filter((_, i) => i !== hideIndex)];
}

function hideItemByTitleIndex(hideIndex = -1, data = []) {
  if (hideIndex < 0) {
    console.error('hideIndex < 0');
    return [];
  }
  return data.map((items) => items.filter((_, i) => i !== hideIndex));
}

function hideItemByIdList(hideList = [], data = []) {
  const newData = [];
  let isMatchId = false;
  data.forEach((cell) => {
    const id = cell[0];
    // 例如當 id = 1 被配對到，會打開isMatchId flag
    // 下次回圈第二個元素的第一個id欄位可以是空的
    // 直到 id 有值為止，才會關掉flag
    if (isMatchId && id) isMatchId = false;
    // 編號在陣列元素當中的第一個
    const find = hideList.find((hideId) => hideId === id);
    if (find) isMatchId = true;

    if (!find && !isMatchId) newData.push(cell);
  });
  return newData;
}

function CSVDataBuilder({ hideItem = '', hideIndexList = [], title = [], data = [] }) {
  // generate new array
  let newTitle = title.map((v) => v);
  let newData = data.map((v) => v);
  try {
    if (hideItem) {
      // title array only have one item
      const findTitleIndex = newTitle[0].findIndex((t) => t === hideItem);

      // hide by title
      if (findTitleIndex > -1) {
        newTitle = hideTitle(findTitleIndex, newTitle);
        newData = hideItemByTitleIndex(findTitleIndex, newData);
      }
      console.log({ newTitle, newData });
      // hide items by id list
      newData = hideItemByIdList(hideIndexList, newData);
      console.log({ newTitle, newData });
    }
    return newTitle.concat(newData);
  } catch (error) {
    console.error(error);
    return undefined;
  }
}

export default function saveCSV({ hideItem = '', hideIndexList = [], title = [], data = [] }) {
  const csvData = CSVDataBuilder({ hideItem, hideIndexList, title, data });
  console.log('CSVDataBuilder', csvData);

  if (csvData) {
    const csvContent = csvData.map((e) => e.join(',')).join('\n');
    const link = document.createElement('a');
    link.setAttribute('href', 'data:text/csv;charset=utf-8,%EF%BB%BF' + encodeURI(csvContent));
    link.setAttribute('download', 'test');
    link.click();
  }
}
