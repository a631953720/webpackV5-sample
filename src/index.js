'use strict'
import _ from 'lodash';

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.first = null;
    this.last = null;
    this.size = 0;
  }

  enqueue(value) {
    const newNode = new Node(value);
    if (this.size === 0) {
      this.first = newNode;
      this.last = newNode;
    } else {
      this.last.next = newNode;
      this.last = newNode;
    }
    this.size = this.size + 1;
    console.log('add', this);
  }

  dequeue() {
    if (this.size === 0) return null;
    const targetNode = this.first;
    if (targetNode === this.last) this.last = null;
    this.first = targetNode.next;
    this.size = this.size - 1;
    console.log('reduce', this);
    return targetNode.value;
  }

  // search 根據放到此列隊的物件結構來實作
  // access 同上
}

const q = new Queue();

// for demo
function component() {
  const element = document.createElement('div');

  const add = document.createElement('button');
  add.innerHTML = 'add queue';
  add.addEventListener('click', () => {
    q.enqueue(123);
  });

  const reduce = document.createElement('button');
  reduce.innerHTML = 'reduce queue';
  reduce.addEventListener('click', () => {
    q.dequeue();
  });

  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  element.appendChild(add);
  element.appendChild(reduce);

  return element;
}

document.body.appendChild(component());
