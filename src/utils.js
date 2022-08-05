// https://www.wfublog.com/2018/10/chrome-javascript-chinese-sort.html

export function sortChineseArray(strArr) {
  if (!Array.isArray(strArr)) return undefined;
  return strArr.sort(function (a, b) {
    return a.localeCompare(b, 'zh-hant');
  });
}

export function checkSortedArrayEqual(arr1, arr2) {
  if (!Array.isArray(arr1) || !Array.isArray(arr2)) return false;
  let isDiff = false;
  for (let i = 0; i < arr1.length; i++) {
    const element = arr1[i];
    if (element !== arr2[i]) {
      isDiff=true;
      break;
    }
  }
  return isDiff === false;
}
