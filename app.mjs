import { LinkedList } from './linkedLists.mjs';

const isPrime = (n) => {
  if (n === 1) {
    return false;
  } else if (n === 2) {
    return true;
  } else {
    for (let x = 2; x < n; x++) {
      if (n % x === 0) {
        return false;
      }
    }
    return true;
  }
};

const nearestPrime = (num) => {
  while (!isPrime(++num)) {}
  return num;
};

class HashMap {
  constructor() {
    this.hashMapSize = 17;
    this.loadFactor = 0.75;
    this.buckets = new Array(this.hashMapSize)
      .fill(null)
      .map(() => new LinkedList());
    this.entriesCount = 0;
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
      hashCode %= this.hashMapSize;
    }

    return hashCode;
  }

  set(key, value) {
    const index = this.hash(key);
    if (index < 0 || index >= this.buckets.length) {
      throw new Error('Trying to access index out of bound');
    }
    if (this.entriesCount >= this.loadFactor * this.hashMapSize) {
      const tempBuckets = this.buckets.map((elem) => elem);
      this.hashMapSize = nearestPrime(this.hashMapSize * 2);
      this.clear();

      tempBuckets.forEach((bucket) => {
        if (bucket !== null) {
          let currentNode = bucket.head;
          while (currentNode !== null) {
            this.set(currentNode.data.key, currentNode.data.value);
            currentNode = currentNode.next;
          }
        }
      });
      return console.log('hashMapSize doubled!');
    }
    if (this.buckets[index]) {
      let currentNode = this.buckets[index].head;
      for (let i = 0; i < this.buckets[index].size(); i++) {
        if (currentNode !== null && currentNode.data.key === key) {
          currentNode.data.value = value;
          return;
        }
        currentNode = currentNode.next;
      }
    }
    this.buckets[index].append({ key, value });
    this.entriesCount++;
  }

  get(key) {
    const index = this.hash(key);
    if (index < 0 || index >= this.buckets.length) {
      throw new Error('Trying to access index out of bound');
    }
    if (this.buckets[index]) {
      let currentNode = this.buckets[index].head;
      for (let i = 0; i < this.buckets[index].size(); i++) {
        if (currentNode !== null && currentNode.data.key === key) {
          return currentNode.data.value;
        }
        currentNode = currentNode.next;
      }

      return null;
    }
  }

  has(key) {
    const index = this.hash(key);
    if (index < 0 || index >= this.buckets.length) {
      throw new Error('Trying to access index out of bound');
    }
    if (this.buckets[index]) {
      let currentNode = this.buckets[index].head;
      for (let i = 0; i < this.buckets[index].size(); i++) {
        if (currentNode !== null && currentNode.data.key === key) {
          return true;
        }
        currentNode = currentNode.next;
      }

      return false;
    }
  }

  remove(key) {
    const index = this.hash(key);
    if (index < 0 || index >= this.buckets.length) {
      throw new Error('Trying to access index out of bound');
    }
    if (this.buckets[index]) {
      let currentNode = this.buckets[index].head;
      for (let i = 0; i < this.buckets[index].size(); i++) {
        if (currentNode !== null && currentNode.data.key === key) {
          this.buckets[index].removeAt(i);
          this.entriesCount--;
          return true;
        }
        currentNode = currentNode.next;
      }

      return false;
    }
  }

  length() {
    return this.entriesCount;
  }

  clear() {
    this.buckets = Array(this.hashMapSize)
      .fill(null)
      .map(() => new LinkedList());
    this.entriesCount = 0;
  }

  keys() {
    const array = [];
    for (let i = 0; i < this.hashMapSize; i++) {
      let currentNode = this.buckets[i].head;
      while (currentNode !== null) {
        array.push(currentNode.data.key);
        currentNode = currentNode.next;
      }
    }

    return array;
  }

  values() {
    const array = [];
    for (let i = 0; i < this.hashMapSize; i++) {
      let currentNode = this.buckets[i].head;
      while (currentNode !== null) {
        array.push(currentNode.data.value);
        currentNode = currentNode.next;
      }
    }

    return array;
  }

  entries() {
    const array = [];
    for (let i = 0; i < this.hashMapSize; i++) {
      let currentNode = this.buckets[i].head;
      while (currentNode !== null) {
        const pair = [];
        pair.push(currentNode.data.key);
        pair.push(currentNode.data.value);
        array.push(pair);
        currentNode = currentNode.next;
      }
    }

    return array;
  }
}

const myMap = new HashMap();
myMap.set('Debug1', 'Test1');
myMap.set('test', 'test3');
myMap.set('Debug2', 'Test2');
myMap.set('bro', 'please');
myMap.set('word', 'document');
myMap.set('alice', 'bianca');
myMap.set('carla', 'danny');
myMap.set('elephant', 'fire');
myMap.set('george', 'himalaya');
myMap.set('ice', 'julian');
myMap.set('kimono', 'lunch');
myMap.set('mountain', 'nepal');
myMap.set('oriol', 'price');
myMap.set('qwerty', 'romania');
myMap.set('standard', 'travis');
myMap.set('umbrella', 'vintage');
myMap.set('wind', 'xerox');
myMap.set('yo-yo', 'zebra');
console.log(myMap);
console.log(myMap.length());
console.log(myMap.keys());
console.log(myMap.values());
console.log(myMap.entries());

class HashSet {
  constructor() {
    this.hashSetSize = 17;
    this.loadFactor = 0.75;
    this.buckets = new Array(this.hashSetSize)
      .fill(null)
      .map(() => new LinkedList());
    this.entriesCount = 0;
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
      hashCode %= this.hashSetSize;
    }

    return hashCode;
  }

  set(key) {
    const index = this.hash(key);
    if (index < 0 || index >= this.buckets.length) {
      throw new Error('Trying to access index out of bound');
    }
    if (this.entriesCount >= this.loadFactor * this.hashSetSize) {
      const tempBuckets = this.buckets.map((elem) => elem);
      this.hashSetSize = nearestPrime(this.hashSetSize * 2);
      this.clear();

      tempBuckets.forEach((bucket) => {
        if (bucket !== null) {
          let currentNode = bucket.head;
          while (currentNode !== null) {
            this.set(currentNode.data);
            currentNode = currentNode.next;
          }
        }
      });
      return console.log('hashSetSize doubled!');
    }
    if (this.buckets[index]) {
      let currentNode = this.buckets[index].head;
      for (let i = 0; i < this.buckets[index].size(); i++) {
        if (currentNode !== null && currentNode.data === key) {
          currentNode.data = key;
          return;
        }
        currentNode = currentNode.next;
      }
    }
    this.buckets[index].append(key);
    this.entriesCount++;
  }

  get(key) {
    const index = this.hash(key);
    if (index < 0 || index >= this.buckets.length) {
      throw new Error('Trying to access index out of bound');
    }
    if (this.buckets[index]) {
      let currentNode = this.buckets[index].head;
      for (let i = 0; i < this.buckets[index].size(); i++) {
        if (currentNode !== null && currentNode.data === key) {
          return key;
        }
        currentNode = currentNode.next;
      }

      return null;
    }
  }

  has(key) {
    const index = this.hash(key);
    if (index < 0 || index >= this.buckets.length) {
      throw new Error('Trying to access index out of bound');
    }
    if (this.buckets[index]) {
      let currentNode = this.buckets[index].head;
      for (let i = 0; i < this.buckets[index].size(); i++) {
        if (currentNode !== null && currentNode.data === key) {
          return true;
        }
        currentNode = currentNode.next;
      }

      return false;
    }
  }

  remove(key) {
    const index = this.hash(key);
    if (index < 0 || index >= this.buckets.length) {
      throw new Error('Trying to access index out of bound');
    }
    if (this.buckets[index]) {
      let currentNode = this.buckets[index].head;
      for (let i = 0; i < this.buckets[index].size(); i++) {
        if (currentNode !== null && currentNode.data === key) {
          this.buckets[index].removeAt(i);
          this.entriesCount--;
          return true;
        }
        currentNode = currentNode.next;
      }

      return false;
    }
  }

  length() {
    return this.entriesCount;
  }

  clear() {
    this.buckets = Array(this.hashSetSize)
      .fill(null)
      .map(() => new LinkedList());
    this.entriesCount = 0;
  }

  keys() {
    const array = [];
    for (let i = 0; i < this.hashSetSize; i++) {
      let currentNode = this.buckets[i].head;
      while (currentNode !== null) {
        array.push(currentNode.data);
        currentNode = currentNode.next;
      }
    }

    return array;
  }
}

const mySet = new HashSet();
mySet.set('Debug1');
mySet.set('test');
mySet.set('Debug2');
mySet.set('bro');
mySet.set('word');
mySet.set('alice');
mySet.set('carla');
mySet.set('elephant');
mySet.set('george');
mySet.set('ice');
mySet.set('kimono');
mySet.set('mountain');
mySet.set('oriol');
mySet.set('qwerty');
mySet.set('standard');
mySet.set('umbrella');
mySet.set('wind');
mySet.set('yo-yo');
console.log(mySet);
console.log(mySet.length());
console.log(mySet.keys());
