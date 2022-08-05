export default function showTableAndReturnParseData() {
  return new Promise((res, rej) => {
    const fileUpload = document.getElementById('fileUpload');
    const fileName = fileUpload.files[0].name;
    console.log('is csv', fileName.slice(-4) === '.csv');
    const parse = [];

    if (typeof FileReader === 'undefined') {
      alert('此瀏覽器不支援HTML5');
      rej('This browser does not support HTML5.');
      return;
    }

    if (fileName.slice(-4) !== '.csv') {
      if (fileName.slice(-5) === '.xlsx') alert('請先將.xlsx另存新檔為.csv檔案，並選擇用逗號分隔');
      else alert('請上傳.csv類型的檔案');
      rej('Please upload a valid CSV file.');
      return;
    }

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
      res({ parse, fileName: fileName.slice(0, -4) });
    };
    reader.readAsText(fileUpload.files[0]);
  });
}
