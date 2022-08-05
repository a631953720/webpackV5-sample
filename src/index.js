import './style.css';
import downloadPage from './downloadPage.html';

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
  data.forEach((v) => {
    // 編號在陣列元素當中的第一個
    const find = hideList.find((hide) => hide === v[0]);
    if (!find) newData.push(v);
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

function saveCSV({ hideItem = '', hideIndexList = [], title = [], data = [] }) {
  const csvData = CSVDataBuilder({ hideItem, hideIndexList, title, data });
  console.log('CSVDataBuilder', csvData);

  const csvContent = csvData.map((e) => e.join(',')).join('\n');
  const link = document.createElement('a');
  link.setAttribute('href', 'data:text/csv;charset=utf-8,%EF%BB%BF' + encodeURI(csvContent));
  link.setAttribute('download', 'test');
  link.click();
}

// add page into body
document.body.innerHTML = downloadPage;
const btn = document.getElementById('save');

btn.addEventListener('click', () => {
  const title = [['編號', '等級', '價格', '重量']];
  const data = [
    ['1', 'A', '123456', '66 72 33 56 44 37.2'],
    ['2', 'B', '234567', '11 22 33 77 55'],
    ['3', 'C', '345678', '77 55 66 77 12 47'],
    ['4', 'A', '456789', '123 456 789 45'],
    ['5', 'A', '987654', '11'],
    ['6', 'V', '876543', '11 22 74'],
  ];
  saveCSV({ hideItem: '等級', title, data, hideIndexList: ['1', '3'] });
});

function showTableAndReturnParseData() {
  return new Promise((res, rej) => {
    const fileUpload = document.getElementById('fileUpload');
    console.log('is csv', fileUpload.files[0].name.slice(-4) === '.csv');
    const parse = [];
    if (fileUpload.files[0].name.slice(-4) === '.csv') {
      if (typeof FileReader !== 'undefined') {
        const reader = new FileReader();
        reader.onload = function (e) {
          const table = document.createElement('table');
          const rows = e.target.result.split('\n');
          for (const element of rows) {
            const cells = element.split(',');
            // console.log('cells', cells);
            parse.push(Array.from(cells));

            // create table
            if (cells.length > 1) {
              const row = table.insertRow(-1);
              for (const element of cells) {
                const cell = row.insertCell(-1);
                cell.innerHTML = element;
              }
            }
          }
          const dvCSV = document.getElementById('dvCSV');
          dvCSV.innerHTML = '';
          dvCSV.appendChild(table);
          res(parse);
        };
        reader.readAsText(fileUpload.files[0]);
      } else {
        alert('This browser does not support HTML5.');
        rej('This browser does not support HTML5.');
      }
    } else {
      alert('Please upload a valid CSV file.');
      rej('Please upload a valid CSV file.');
    }
  });
}

const uploadBtn = document.getElementById('upload');
uploadBtn.addEventListener('click', async () => {
  // const file = document.getElementById('uploadFile').files[0];
  // console.log(file);
  // console.log(papa.parse(file, {
  //   download: true
  // }));
  const parse = await showTableAndReturnParseData();
  console.log(parse);
});
