export function onLoading() {
  const e = document.getElementById('overlay');
  e.setAttribute('style', 'display: unset');
}

export function closeLoading() {
  const e = document.getElementById('overlay');
  e.setAttribute('style', 'display: none');
}