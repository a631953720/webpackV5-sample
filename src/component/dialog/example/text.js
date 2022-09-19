import { buildDialog } from '..';
import textHTML from './text.html';

export default function textDialog() {
  const dialog = buildDialog({
    html: textHTML,
    title: '文字測試',
    okOnClick: async () => {
      alert('ok')
      dialog.remove();
    },
    cancelOnClick: () => {
      alert('cancel')
      dialog.remove();
    },
  });
  return dialog;
} 
