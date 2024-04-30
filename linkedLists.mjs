export class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

export class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  append(value) {
    const newNode = new Node(value);

    if (this.head === null) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.length++;
  }

  prepend(value) {
    const newNode = new Node(value);

    if (this.head === null) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }
    this.length++;
  }

  size() {
    return this.length;
  }

  getHead() {
    return this.head;
  }

  getTail() {
    return this.tail;
  }

  at(index) {
    if (this.head === null) return;
    let currentNode = this.head;

    for (let i = 0; i < index; i++) {
      currentNode = currentNode.next;
    }

    return currentNode;
  }

  pop() {
    if (this.head === null) {
      return;
    } else if (this.head.next === null) {
      this.head = null;
      this.tail = null;
      this.length = 0;
      return;
    }

    const newLastNode = this.at(this.size() - 2);
    this.tail = newLastNode;
    this.tail.next = null;
    this.length--;
  }

  contains(value) {
    if (this.head === null) return;
    let currentNode = this.head;

    for (let i = 0; i < this.length; i++) {
      if (currentNode.data === value) {
        return true;
      }
      currentNode = currentNode.next;
    }

    return false;
  }

  find(value) {
    if (this.head === null) return;
    let currentNode = this.head;

    for (let i = 0; i < this.length; i++) {
      if (currentNode.data === value) {
        return i;
      }
      currentNode = currentNode.next;
    }

    return null;
  }

  toString() {
    if (this.head === null) return;
    let currentNode = this.head;
    let string = '';

    for (let i = 0; i < this.length; i++) {
      string += `( ${currentNode.data.toString()} ) -> `;
      currentNode = currentNode.next;
    }

    string += `${currentNode}`;
    return string;
  }

  insertAt(value, index) {
    if (this.head === null) return;
    if (index < 0) return;
    else if (index > this.length) {
      return this.append(value);
    } else if (index === 0) {
      return this.prepend(value);
    }
    const previousNode = this.at(index - 1);
    const currentNode = this.at(index);
    const newNode = new Node(value);
    previousNode.next = newNode;
    newNode.next = currentNode;
    this.length++;
  }

  removeAt(index) {
    if (this.head === null) return false;
    if (index < 0 || index > this.length) return false;
    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
      this.length--;
      return true;
    }
    if (this.at(index) === this.head) {
      this.head = this.head.next;
      this.length--;
      return true;
    } else if (this.at(index) === this.tail) {
      const previousNode = this.at(index - 1);
      this.tail = previousNode;
      this.tail.next = null;
      this.length--;
      return true;
    }
    const previousNode = this.at(index - 1);
    const nextNode = this.at(index + 1);
    previousNode.next = nextNode;
    this.length--;
    return true;
  }
}
