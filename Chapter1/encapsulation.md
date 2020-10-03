---
layout: default
title: Encapsulation
nav_order: 2
parent: Basic Knowledge
---

# Encapsulation

Encapsulation is not only used to hide data, also the details of the implementation and class (Javascript doesn't have abstract class and interface. So it is not able to encapsule class).

In Javascript, we use scope to realise encapsulation, and only `public` and `private` can be simulated.

```js
var myObject = (function() {
  let __name = 'Thomas';
  return {
    getName: function() {
      return __name;
    }
  };
})(); // IIFE (Immediately Invoked Function Expression)

console.log(myObject.getName()); // Thomas
console.log(myObject.__name); // undefined
```
