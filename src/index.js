import './style.css';
import downloadPage from './downloadPage.html';
import saveCSV from './download';
import showTableAndReturnParseData from './upload';
import { sortChineseArray, checkSortedArrayEqual } from './utils';

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

function findAvailableTitle(csvArray) {
  if (!Array.isArray(csvArray) || csvArray.length === 0) return -1;
  const availableTitles = [
    ['編號', '級別', '重量', '顆數', '品名', '單顆重量'],
    ['編號', '售價', '重量', '顆數', '品名', '單顆重量'],
  ];

  let tittle = [];
  // reverse array
  const reverse = csvArray.reverse();
  while (reverse.length > 0) {
    let matchArrayLength = false;
    let matchArrayItem = false;

    let cell = reverse.pop();
    // filter the '', \r, \n string
    cell = cell.filter((v) => v !== '' && v !== '\r' && v !== '\n');
    console.log(cell);

    // check array length is match availableTitles
    availableTitles.forEach((v) => {
      if (v.length === cell.length) matchArrayLength = true;
    });
    if (!matchArrayLength) continue;
    console.log({ matchArrayLength, matchArrayItem });

    // when length equal, check the array items
    const sortedCell = sortChineseArray(cell);

    for (const element of availableTitles) {
      const sortedAvailableTitles = sortChineseArray(element);
      if (sortedAvailableTitles) {
        const flag = checkSortedArrayEqual(sortedCell, sortedAvailableTitles);
        if (flag) {
          matchArrayItem = flag;
          tittle = sortedCell;
          break;
        }
      }
    }
    console.log({ matchArrayLength, matchArrayItem });

    if (matchArrayLength && matchArrayItem) break;
  }
  console.log('after find', tittle, reverse);
  return {
    tittle,
    items: reverse.reverse(),
  };
}

const uploadBtn = document.getElementById('upload');
uploadBtn.addEventListener('click', async () => {
  const parse = await showTableAndReturnParseData();
  // console.log(parse);
  // filter unavailable title
  findAvailableTitle(parse);
});
