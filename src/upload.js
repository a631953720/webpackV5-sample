export default function showTableAndReturnParseData() {
  return new Promise((res, rej) => {
    const fileUpload = document.getElementById('fileUpload');
    console.log('is csv', fileUpload.files[0].name.slice(-4) === '.csv');
    const parse = [];

    if (typeof FileReader === 'undefined') {
      alert('此瀏覽器不支援HTML5');
      rej('This browser does not support HTML5.');
      return;
    }

    if (fileUpload.files[0].name.slice(-4) !== '.csv') {
      if (fileUpload.files[0].name.slice(-5) === '.xlsx') alert('請先將.xlsx另存新檔為.csv檔案，並選擇用逗號分隔');
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
      res(parse);
    };
    reader.readAsText(fileUpload.files[0]);
  });
}
