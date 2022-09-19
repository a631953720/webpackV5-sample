import trash from '../assets/icons8-trash-60.svg';
import support from '../assets/icons8-support.svg';
import add from '../assets/add_icon.svg';

export function trashIcon() {
  const img = document.createElement('img');
  img.src = trash;
  img.alt = 'trash';
  return img;
}

export function supportIcon() {
  const img = document.createElement('img');
  img.src = support;
  img.alt = 'support';
  return img;
}

export function addIcon() {
  const img = document.createElement('img');
  img.src = add;
  img.alt = 'add';
  return img;
}
