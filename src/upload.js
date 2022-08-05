export default function showTableAndReturnParseData() {
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
