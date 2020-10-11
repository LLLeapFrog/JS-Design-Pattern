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
