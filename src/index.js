import './css/index.css'
import 'normalize.css';
import inputDialog from './component/dialog/example/input';
import textDialog from './component/dialog/example/text';
import { showErrorAlert, showSuccessAlert } from './component/alert';
import { addLoadingElement, removeLoadingElement } from './component/loading';

function init() {
  const root = document.getElementById('root');
  const box = document.getElementById('box');
  const dialog1 = textDialog();
  const dialog2 = inputDialog();

  const textDialogBtn = document.createElement('button');
  const inputDialogBtn = document.createElement('button');
  const successAlertBtn = document.createElement('button');
  const errorAlertBtn = document.createElement('button');
  const addLoadingBtn = document.createElement('button');
  const removeLoadingBtn = document.createElement('button');
  const addAllPageLoadingBtn = document.createElement('button');

  textDialogBtn.innerHTML = '打開文字Dialog';
  textDialogBtn.addEventListener('click', () => {
    dialog1.render();
  });
  root.appendChild(textDialogBtn);

  inputDialogBtn.innerHTML = '打開有input元素的dialog';
  inputDialogBtn.addEventListener('click', () => {
    dialog2.render();
  });
  root.appendChild(inputDialogBtn);

  successAlertBtn.innerHTML = '打開 success alert';
  successAlertBtn.addEventListener('click', () => {
    showSuccessAlert('123');
  });
  root.appendChild(successAlertBtn);

  errorAlertBtn.innerHTML = '打開 error alert';
  errorAlertBtn.addEventListener('click', () => {
    showErrorAlert('456');
  });
  root.appendChild(errorAlertBtn);

  addAllPageLoadingBtn.innerHTML = '打開全頁的loading動畫'
  addAllPageLoadingBtn.addEventListener('click', () => {
    const body = document.body;
    addLoadingElement(body, 'background-color: rgba(0,0,0,0.12);');
    setTimeout(() => removeLoadingElement(body), 2000);
  });
  root.appendChild(addAllPageLoadingBtn);

  addLoadingBtn.innerHTML = '打開loading動畫';
  addLoadingBtn.addEventListener('click', () => {
    addLoadingElement(box, 'background-color: rgba(0,0,0,0.12);');
  });
  root.before(addLoadingBtn);

  removeLoadingBtn.innerHTML = '關閉loading動畫';
  removeLoadingBtn.addEventListener('click', () => {
    removeLoadingElement(box);
  });
  root.before(removeLoadingBtn);
}
window.onload = () => {
  init();
};
