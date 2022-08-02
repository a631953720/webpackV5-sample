import './style.css';
import downloadPage from './downloadPage.html';

function saveCSV () {
  // (A) ARRAY OF DATA
  const array = [
    ["Job", "job@doe.com", "123456"],
    ["Joe", "joe@doe.com", "234567"],
    ["Joi", "joi@doe.com", "345678"],
    ["Jon", "jon@doe.com", "456789"],
    ["Jou", "jou@doe.com", "987654"],
    ["Joy", "joy@doe.com", "876543"],
  ];
 
  // (B) ARRAY TO CSV STRING
  let csv = "";
  for (let row of array) {
    for (let col of row) { csv += col + ","; }
    csv += "\r\n";
  }
 
  // (C) CREATE BLOB OBJECT
  const myBlob = new Blob([csv], {type: "text/csv"});
 
  // (D) CREATE DOWNLOAD LINK
  const url = window.URL.createObjectURL(myBlob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "demo.csv";
 
  // (E) "FORCE DOWNLOAD"
  // NOTE: MAY NOT ALWAYS WORK DUE TO BROWSER SECURITY
  // BETTER TO LET USERS CLICK ON THEIR OWN
  anchor.click();
  window.URL.revokeObjectURL(url);
  anchor.remove();
}

document.body.innerHTML = downloadPage;
const btn = document.getElementById("save");

btn.addEventListener("click", saveCSV);
