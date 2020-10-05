---
layout: default
title: Prototypes and Inheritance
nav_order: 3
parent: Basic Knowledge
---

# Prototypes and Inheritance

#### Catalogue

1. [Prototype-based Language](#prototype-based-language)

## Prototype-based Language

Javascript is a prototype-based language. If we want to create an object, don't think about classes but just find another object and clone it.

ECMAScript5 Provides `Object.create` to clone an object, using an existing object as the prototype of the newly created object.

```js
const Person = function() {
  this.age = 0;
};

const boy = new Person();
boy.age = 10;

const girl = Object.create(boy);

console.log(girl.__proto__ === boy); // true
```

The other way is using constructor functions with `new` statement. `new Person()` is actually the process of `Object.create(Person.prototype)` and additionally running constructor function.

```js
const Polygon = function() {
  this.name = 'Polygon';
};

const poly1 = new Polygon();

const poly2 = Object.create(Polygon.prototype);

console.log(poly1._proto__ === poly2._proto__); // true
console.log(poly1.name); // 'Polygon'
console.log(poly2.name); // undefined
```
