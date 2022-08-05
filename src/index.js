import './css/style.css';
import $ from 'jquery';
import downloadPage from './html/downloadPage.html';
import saveCSV from './download';
import showTableAndReturnParseData from './upload';
import { convertCSVData, generateListByTitle } from './handleCSVData';
import { defaultHideTitle } from './constants/env';

// https://api.jquery.com/ready/#ready-handler-handler
$(() => {
  console.log('load!!!');
  // add page into body
  document.body.innerHTML = downloadPage;

  const state = {
    CSVData: {
      title: [],
      items: [],
    },
    hideTitle: defaultHideTitle,
    hideIdList: [],
    isInit: false,
  };

  const uploadBtn = document.getElementById('upload');

  uploadBtn.addEventListener('click', async () => {
    const parse = await showTableAndReturnParseData();
    const { title, items } = convertCSVData(parse);

    if (title.length < 1 || items.length < 1) {
      alert('轉換CSV異常');
      console.log('uploadBtn', { title, items });
    }
    state.CSVData = {
      title,
      items,
    };

    console.log(generateListByTitle(title, items, '編號'));
    const idList = generateListByTitle(title, items, '編號');

    // init hide title list
    const titleSelector = document.getElementById('titleList');
    titleSelector.innerHTML = '<option>不刪除</option>';
    title.forEach((t) => {
      if (t !== '編號' && t !== '單顆重量') titleSelector.innerHTML += `<option>${t}</option>`;
    });

    // init hide id list
    const idSelector = document.getElementById('idList');
    idSelector.innerHTML = '';
    idList.forEach((id) => {
      idSelector.innerHTML += `<option>${id}</option>`;
    });

    // only init at first time after this condition
    if (state.isInit) return;

    // init selector event handler
    $('#titleList').on('change', () => {
      $('#titleList option:selected').each(function () {
        // this 為觸發此function的元素
        state.hideTitle = $(this).text();
        console.log(state);
      });
    });

    $('#idList').on('change', () => {
      const selects = [];
      $('#idList option:selected').each(function () {
        // this 為觸發此function的元素
        const id = $(this).text();
        selects.push(id);
      });
      state.hideIdList = selects;
      console.log(state);
    });

    state.isInit = true;
  });

  $('#downloadFile').on('click', () => {
    const { CSVData } = state;
    const { title, items } = CSVData;
    if (title.length && items.length) {
      // 一開始設計的時候，title為一個二維陣列
      saveCSV({ hideItem: state.hideTitle, hideIndexList: state.hideIdList, title: [title], data: items });
    }
  });
});

// test code
// const title = [['編號', '等級', '價格', '重量']];
// const data = [
//   ['1', 'A', '123456', '66 72 33 56 44 37.2'],
//   ['', '', '', '11 22 33 77 55'],
//   ['2', 'B', 'C11', '11 22 33 77 55'],
//   ['', '', '', '11 22 33 77 55'],
//   ['', '', '', '11 22 33 77 55'],
//   ['3', 'B', 'C11', '11 22 33 77 55'],
//   ['', '', '', '11 22 33 77 55'],
//   ['', '', '', '11 22 33 77 55'],
//   ['', '', '', '11 22 33 77 55'],
//   ['', '', '', '11 22 33 77 55'],
//   ['', 'B', 'C11', '11 22 33 77 55'],
//   ['4', 'B', 'C11', '11 22 33 77 55'],
// ];
// saveCSV({ hideItem: '等級', title, data, hideIndexList: ['1'] });
