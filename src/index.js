import './style.css';
import downloadPage from './downloadPage.html';

function saveCSV() {
  const title = [['編號', '等級', '價格', '重量']];
  const data = [
    ['1', 'A', '123456', '66 72 33 56 44 37.2'],
    ['2', 'B', '234567', '11 22 33 77 55'],
    ['3', 'C', '345678', '77 55 66 77 12 47'],
    ['4', 'A', '456789', '123 456 789 45'],
    ['5', 'A', '987654', '11'],
    ['6', 'V', '876543', '11 22 74'],
  ];

  const csvData = title.concat(data);
  const csvContent = csvData.map((e) => e.join(',')).join('\n');
  const link = document.createElement('a');
  link.setAttribute('href', 'data:text/csv;charset=utf-8,%EF%BB%BF' + encodeURI(csvContent));
  link.setAttribute('download', 'test');
  link.click();
}

document.body.innerHTML = downloadPage;
const btn = document.getElementById('save');

btn.addEventListener('click', saveCSV);
