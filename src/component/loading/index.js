import loadingSmallHTML from './loading.small.html';

export function addLoadingElement(element, style = '', className = '') {
  const div = document.createElement('div');
  div.className = 'lds-wrapper';
  div.id = 'lds-wrapper-small';
  div.innerHTML = loadingSmallHTML;
  div.style = style;
  div.className += className;
  element.appendChild(div);
  return div;
}

export function removeLoadingElement(element) {
  // element是某個元素，因此不會有 getElementById 的方法可用
  // const d = document.getElementById('lds-wrapper-small');
  const d = element.getElementsByClassName('lds-wrapper')[0];
  element.removeChild(d);
}
