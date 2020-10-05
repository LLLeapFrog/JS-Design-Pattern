const Polygon = function() {
  this.name = 'Polygon';
};

const poly1 = new Polygon();

const poly2 = Object.create(Polygon.prototype);

console.log(poly1._proto__ === poly2._proto__); // true
console.log(poly1.name); // 'Polygon'
console.log(poly2.name); // undefined
