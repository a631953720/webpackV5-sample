import './style.css';
import downloadPage from './downloadPage.html';
import saveCSV from './download';
import showTableAndReturnParseData from './upload';
import convertCSVData from "./convertCSVData";

// add page into body
document.body.innerHTML = downloadPage;
const btn = document.getElementById('save');

btn.addEventListener('click', () => {
  const title = [['編號', '等級', '價格', '重量']];
  const data = [
    ['1', 'A', '123456', '66 72 33 56 44 37.2'],
    ['', '', '', '11 22 33 77 55'],
    ['2', 'B', 'C11', '11 22 33 77 55'],
  ];
  saveCSV({ hideItem: '等級', title, data, hideIndexList: ['1', '3'] });
});



const uploadBtn = document.getElementById('upload');
uploadBtn.addEventListener('click', async () => {
  const parse = await showTableAndReturnParseData();
  const { title, items } = convertCSVData(parse);
  if (title.length > 0 && items.length > 0) {
    saveCSV({ hideItem: '級別', title: [title], data: items, hideIndexList: ['1', '2', '3'] });
  }
});

// const title = [['編號', '等級', '價格', '重量']];
// const data = [
//   ['1', 'A', '123456', '66 72 33 56 44 37.2'],
//   ['', '', '', '11 22 33 77 55'],
//   ['2', 'B', 'C11', '11 22 33 77 55'],
//   ['', '', '', '11 22 33 77 55'],
//   ['', '', '', '11 22 33 77 55'],
//   ['3', 'B', 'C11', '11 22 33 77 55'],
//   ['', '', '', '11 22 33 77 55'],
//   ['', '', '', '11 22 33 77 55'],
//   ['', '', '', '11 22 33 77 55'],
//   ['', '', '', '11 22 33 77 55'],
//   ['', 'B', 'C11', '11 22 33 77 55'],
//   ['4', 'B', 'C11', '11 22 33 77 55'],
// ];
// saveCSV({ hideItem: '等級', title, data, hideIndexList: ['1'] });
