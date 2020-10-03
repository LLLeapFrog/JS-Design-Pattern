const Queue = function() {
  this.arr = [];
  this.push = push;
  this.pop = pop;
};

const King = class {
  constructor() {
    this.value = 'king';
  }
  getKing() {
    console.log(this.value);
  }
};

function push(node) {
  console.log('push');
}

function pop() {}

const q = new Queue();
const k = new King();
console.log(q instanceof Queue);
console.log(k instanceof King);
