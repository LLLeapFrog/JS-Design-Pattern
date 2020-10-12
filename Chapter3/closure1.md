---
layout: default
title: Closure (Application)
nav_order: 1
parent: Closure and Higher-order Function
---

# Applications of Closure

#### Catalogue

1. [Encapsule Variables](#encapsule-variables)
2. [Prolong life-time of variables](#prolong-life-time-of-variables)

## Encapsule Variables

Closure can help us encapsule variables which is unnecessary exposed to the public scope. Supposed there is a function calculate the product.

```js
const product = function() {
  let a = 1;
  for (let i = 0, len = arguments.length; i < len; i++) {
    a = a * arguments[i];
  }
  return a;
};
```

This function takes the argument of numbers and returns the product. For those same argument, each more calculation is wasting. We can introduce a cache to improve the performance of this application.

```js
const cache = {};

const product = function() {
  const args = Array.prototype.join.call(arguments);
  if (args in cache) return cache[args];
  let a = 1;
  for (let i = 0, len = arguments.length; i < len; i++) {
    a = a * arguments[i];
  }
  return (cache[args] = a);
};
```

We found that `cache` is only used in the function `product`. Why not encapsule this variable into the function so that the number of global variables can be reduced and the accidental access to this variable can be avoided.

```js
const product = (function() {
  const cache = {};
  return function() {
    const args = Array.prototype.join.call(arguments);
    if (args in cache) return cache[args];
    let a = 1;
    for (let i = 0, len = arguments.length; i < len; i++) {
      a = a * arguments[i];
    }
    return (cache[args] = a);
  };
})();
```

"Extract method" is common technique of "code refactoring". If a part of codes can be extracted, we usually encapsule those codes into an inner method. The inner method is helpful to "code reuse". With intuitive variable names, they also natively play the role of comments.

```js
const product = (function() {
  const cache = {};
  const calculate = function() {
    let a = 1;
    for (let i = 0, len = arguments.length; i < len; i++) {
      a = a * arguments[i];
    }
    return a;
  };

  return function() {
    const args = Array.prototype.join.call(arguments);
    if (args in cache) return cache[args];
    return (cache[args] = calculate.apply(null, arguments));
    // return (cache[args] = calculate(...arguments)); // This is right too.
  };
})();
```

## Prolong life-time of variables

Supposed we have the following codes to report data.

```js
const report = function(src) {
  const img = new Image();
  img.src = src;
};

report('http://xxx.com/getUserInfo');
```

There is a bug in old version browser, which is the lost of 30% of data. It proves that not every HTTP request was sent successfully because `img` is a local variable in the function `report`, after `report` is called, `img` is discarded. However, the HTTP request hasn't been sent yet.

Now we can put `img` into a closure so that the problem is solved.

```js
const report = (function(src) {
  const imgs = [];
  return function(src) {
    const img = new Image();
    imgs.push(img);
    img.src = src;
  };
})();
```

Now `img`s are permanently save in the closure with `imgs` if it is not deleted manually.
