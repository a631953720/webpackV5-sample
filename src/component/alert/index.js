export function hideAlert() {
  const alert = document.getElementById('page-alert');
  alert.className = 'page-alert';
}

let timerId;

export function showSuccessAlert(text) {
  clearTimeout(timerId);
  const alert = document.getElementById('page-alert');
  alert.innerHTML = text;
  alert.className = 'page-alert show success';
  timerId = setTimeout(hideAlert, 2000);
}

export function showErrorAlert(text) {
  clearTimeout(timerId);
  const alert = document.getElementById('page-alert');
  alert.innerHTML = text;
  alert.className = 'page-alert show error';
  timerId = setTimeout(hideAlert, 2000);
}
