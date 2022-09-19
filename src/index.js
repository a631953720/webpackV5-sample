import './css/index.css'
import 'normalize.css';
import inputDialog from './component/dialog/example/input';
import textDialog from './component/dialog/example/text';
import { showErrorAlert, showSuccessAlert } from './component/alert';

function init() {
  const root = document.getElementById('root');
  const dialog1 = textDialog();
  const dialog2 = inputDialog();

  const textDialogBtn = document.createElement('button');
  const inputDialogBtn = document.createElement('button');
  const successAlertBtn = document.createElement('button');
  const errorAlertBtn = document.createElement('button');

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
}
window.onload = () => {
  init();
};
