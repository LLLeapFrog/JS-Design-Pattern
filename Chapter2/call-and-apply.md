---
layout: default
title: call and apply
nav_order: 2
parent: this, call and apply
---

# `call` and `apply`

`Function.prototype.call` and `Function.prototype.apply` are methods calling a function with a given object and argument(s).

In strict mode, when the "object" is `null`, it will be replaced with the global object, and primitives will be converted to their objects. In non-strict mode, null is still null, primitives are still primitives.

#### Catalogue

1. [The difference between `call` and `apply`](#the-difference-between-call-and-apply)
2. [The uses of `call` and `apply`](#the-uses-of-call-and-apply)

## The difference between `call` and `apply`

They have the same functionality but different formats for arguments being passed in. `call` accepts an argument list, while `apply` accepts a single array of arguments. (`call` is syntactical sugar of `apply`)

### Examples

```js
const fn = function(a, b, c) {
  console.log(a, b, c);
};

fn.apply(null, [1, 2, 3]); // 1 2 3
fn.call(null, 1, 2, 3); // 1 2 3
```

## The uses of `call` and `apply`

### 1. Change the reference of a function

the most usual use of `call` and `apply`. For example, we have the following codes performing an unexpected result.

```js
document.getElementById('div1').onclick = function() {
  const fn = function() {
    console.log(this.id);
  };
  fn(); // undefined
};
```

In this case, we use `apply` to fix the reference of `this` to "div1".

```js
document.getElementById('div1').onclick = function() {
  const fn = function() {
    console.log(this.id);
  };
  fn.call(this); // div1
};
```

### 2. inheritance

We can implement inheritance through contructor function calling `apply`.

```js
const A = function(name) {
  this.name = name;
};

const B = function() {
  A.apply(this, arguments);
};

B.prototype.getName = function() {
  return this.name;
};

const b = new B('Tom');
console.log(b.getName()); /// Tom
```

### 3. Borrow other objects' method

For example, arguments is an `Array`-like object, but we operate it like `Array`. In this case, we can "borrow" methods from `Array.prototype` like `push`.

```js
(function() {
  Array.prototype.push.call(arguments, 3);
  console.log(arguments); // [1, 2, 3]
})(1, 2);
```

Why is it possible? If you have a look at the source code of V8, `Array.prototype.push` is actually a process of copying and pasting new elements into an object and it changes the property `length` of thta object by the way. So, of course, you can call `Array.prototype.push` with an object.

```js
const obj = {};
Array.prototype.push.call(obj, 'foo');
console.log(obj); // { '0': 'foo', length: 1 }
```
