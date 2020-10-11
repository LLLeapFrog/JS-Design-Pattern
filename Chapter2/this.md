---
layout: default
title: this
nav_order: 1
parent: this, call and apply
---

# `this`

`this` always refers to an object. However, the value of `this` is dynamic, based on the environment where the function is called instead of where the function is declared.

The references of `this` can be classified into four contexts

#### Catalogue

1. [As an object method](#as-an-object-method)
2. [As an ordinary function](#as-an-ordinary-function)
3. [As a constructor](#as-a-constructor)
4. [When calling `Function.prototype.call` and `Function.prototype.apply`](#when-calling-functionprototypecall-and-functionprototypeapply)

## As an object method

When the method of an object is called, `this` refers to that object.

```js
const object = {
  name: 'Tom',
  getName: function() {
    console.log(this === object); // true
    console.log(this.name); // Tom
  }
};

object.getName();
```

## As an ordinary function

### In non strict mode

`this` **always** refers to the global object `window`. Let's have a look at two examples. (You should test it in the inspector of Chromn)

```js
window.name = 'global';

const object = {
  name: 'Tom',
  getName: function() {
    console.log(this.name);
  }
};

const getName = object.getName;
getName(); // global
```

The second example is more tricky.

```js
window.name = 'global';

const object = {
  name: 'Tom',
  getName: function() {
    const innerFn = function() {
      console.log(this.name);
    };
    innerFn();
  }
};

object.getName(); // global
```

Even though you call an object method, the ordinary inner function is called refering `this` to the `window`.

### Solutions

- A simple solution here. Declare a variable saving the reference of `this`.

```js
window.name = 'global';

const object = {
  name: 'Tom',
  getName: function() {
    const that = this; // <----------
    const innerFn = function() {
      console.log(that.name);
    };
    innerFn();
  }
};

object.getName(); // Tom
```

- The another solution is using `Function.prototype.bind()`.

```js
const object = {
  name: 'Tom',
  getName: function() {
    const innerFn = function() {
      console.log(this.name);
    }.bind(object); // <----------
    innerFn();
  }
};

object.getName(); // Tom
```

- Or you can use `Function.prototype.apply()` and `Function.prototype.call()`

```js
const object = {
  name: 'Tom',
  getName: function() {
    const innerFn = function() {
      console.log(this.name);
    };
    innerFn.apply(object); // <----------
  }
};

object.getName(); // Tom
```

- Finally, use arrow function

```js
window.name = 'global';

const object = {
  name: 'Tom',
  getName: function() {
    const innerFn = () => {
      console.log(this.name);
    }; // <----------
    innerFn();
  }
};

object.getName(); // Tom
```

Arrow functions do not default `this` to the `window`, rather they execute in the scope they created.

**BTW: Never declare methods using arrow function! `this` within the arrow function refers to `window` in this case :)**

### In strict mode

Within an ordinary function, `this` refers to `undefined`.

```js
function fn() {
  'use strict';
  console.log(this); // undefined
}
```

## As a constructor

`this` is bound to the new object being constructed

```js
const Animal = function() {
  this.age = 0;
};

const cat = new Animal();
console.log(cat.age); // 0
```

If the contructor explicitly returns an object, `this` will be discarded.

```js
const Animal = function() {
  this.age = 0;
  return {
    age: 99
  };
};

const cat = new Animal();
console.log(cat.age); // 99
```

If something returned is not an object, the above issue will not happen.

```js
const Animal = function() {
  this.age = 0;
  return 99;
};

const cat = new Animal();
console.log(cat.age); // 0
```

## When calling `Function.prototype.call` and `Function.prototype.apply`

They both can set the value of `this` to a particular object.

```js
const cat = {
  name: 'cat',
  getName: function() {
    return this.name;
  }
};

const dog = {
  name: 'dog'
};

console.log(cat.getName()); // cat
console.log(cat.getName.call(dog)); // dog
```
