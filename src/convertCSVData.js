import { sortChineseArray, checkSortedArrayEqual } from './utils';

export default function convertCSVData(csvArray) {
  if (!Array.isArray(csvArray) || csvArray.length === 0)
    return {
      title: [],
      items: [],
    };
  const availableTitles = [
    ['編號', '級別', '重量', '顆數', '品名', '單顆重量'],
    ['編號', '售價', '重量', '顆數', '品名', '單顆重量'],
  ];

  let title = [];
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
          title = sortedCell;
          break;
        }
      }
    }
    console.log({ matchArrayLength, matchArrayItem });

    if (matchArrayLength && matchArrayItem) break;
  }
  console.log('after find', title, reverse);
  return {
    title,
    items: reverse.reverse(),
  };
}
