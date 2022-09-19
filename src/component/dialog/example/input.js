import { buildDialog } from '..';
import inputHTML from './input.html';

function getSchedulerFormValues() {
  const form = document.getElementById('scheduler-form').elements;

  const schedulerType = form.schedulerType.value;
  const startTime = form.startTime.value;
  const endTime = form.endTime.value;
  const CMD = form.CMD.value;
  const status = form.status.checked;

  return {
    schedulerType,
    startTime,
    endTime,
    CMD,
    status
  };
}

function setSchedulerFormValues(data) {
  const { schedulerType, startTime, endTime, status, CMD } = data;
  const form = document.getElementById('scheduler-form').elements;
  console.log({ schedulerType, startTime, endTime, status, CMD });
  form.schedulerType.value = schedulerType;
  form.startTime.value = startTime;
  form.endTime.value = endTime;
  form.CMD.value = CMD;
  form.status.checked = status;
  console.log(getSchedulerFormValues());
}

function initEventListener() {
  const form = document.getElementById('scheduler-form');

  // 避免Enter直接提交
  form.onkeydown = (e) => {
    const k = e.key;
    if (k === 'Enter') {
      e.preventDefault();
      return false;
    }
  };
}

export default function inputDialog() {
  const dialog = buildDialog({
    html: inputHTML,
    title: '新增排程',
    okOnClick: () => {
      console.log(getSchedulerFormValues());
    },
    cancelOnClick: () => {
      dialog.remove();
    },
  });
  return dialog;
}
