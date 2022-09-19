export function calAndSetDialogWrapperHeight() {
  const wrapper = document.getElementById('dialog-wrapper');
  const title = document.getElementById('dialog-title');
  const control = document.getElementById('dialog-control');

  const content = document.getElementById('dialog-content');
  // 扣掉元素高度，還有預設的dialog padding 25 跟 title margin top, bottom 的 10 px
  const h = wrapper.offsetHeight - title.offsetHeight - control.offsetHeight - 25 * 2 - 10 * 2;
  content.style = `height: ${h}px; max-height: ${h}px`;
}

export function showDialog() {
  const dialog = document.getElementById('dialog-overlay');
  dialog.style = 'display: block';
}

export function removeDialog() {
  const dialog = document.getElementById('dialog-overlay');
  dialog.style = 'display: none';

  const dialogContent = document.getElementById('dialog-content');
  dialogContent.innerHTML = '';
}

export function addHTMLToDialog(html) {
  const dialogContent = document.getElementById('dialog-content');
  dialogContent.innerHTML = html;
}

export function setDialogTitle(title = '') {
  const dialogContent = document.getElementById('dialog-title');
  dialogContent.innerHTML = title;
}

export function buildDialog({ html = '', title = 'title', okOnClick = () => {}, cancelOnClick = () => {} }) {
  function render() {
    showDialog();
    calAndSetDialogWrapperHeight();
    setDialogTitle(title);
    addHTMLToDialog(html);

    const ok = document.getElementById('dialog-ok');
    ok.onclick = okOnClick;
    const cancel = document.getElementById('dialog-cancel');
    cancel.onclick = cancelOnClick;
  }

  function remove() {
    removeDialog();

    const ok = document.getElementById('dialog-ok');
    ok.onclick = null;
    const cancel = document.getElementById('dialog-cancel');
    cancel.onclick = null;
  }

  return {
    render,
    remove,
  };
}
