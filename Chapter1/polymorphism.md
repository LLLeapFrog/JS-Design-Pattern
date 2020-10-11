---
layout: default
title: Polymorphism
nav_order: 1
parent: OOP of Javascript
---

# Polymorphism

#### Catalogue

1. [Concept](#concept)
2. [Real-world Example](#real-world-example)

## Concept

The actual idea of polymorphism is to separate **"What to do"** and **"Who to do"**, Also **"Something is never changed"** and **"Something might be changed"**.

The Purpose of polymorphism is to convert **"if statement"** into **"polymorphic"** objects.

### Bad Example

Supposed we want to create a function which makes different animals' sounds

```js
const makeSound = function(animal) {
  if (animal instanceof Dog) {
    console.log('Woof');
  } else if (animal instanceof Cat) {
    console.log('Meow');
  }
};

const Dog = function() {};
const Cat = function() {};

makeSound(new Dog()); // Woof
makeSound(new Cat()); // Meow
```

This is an unreasonable polymorphsim because if there is another animal like bird, we have to update the function of `makeSound`. Changing codes is always dangerous. The more codes you change, the more possibly your codes crash.

### Good Example

We first separate **"Something is never changed"** which is that animals can make sounds.

```js
const makeSound = function(animal) {
  animal.sound();
};
```

Then encapsule different animals.

```js
const Cat = function() {};

Cat.prototype.sound = function() {
  console.log('Meow');
};

const Dog = function() {};

Dog.prototype.sound = function() {
  console.log('Woof');
};

makeSound(new Dog()); // Woof
makeSound(new Cat()); // Meow
```

Now if we want to make more sounds, we can just simply create a new Object constructor instead of changing the function of `makeSound`.

## Real-world Example

I am building an app which renders a map. Supposed the API of Google provides the method of `show`.

```js
const googleMap = {
  show: function() {
    console.log('Render google map');
  }
};
```

### Bad Example

```js
const renderMap = function() {
  googleMap.show();
};
```

For some reasons, I want use both Google map and Bing map.

```js
const bingMap = {
  show: function() {
    console.log('Render bing map');
  }
};
```

I have to update the `renderMap` function into:

```js
const renderMap = function(type) {
  if (type === 'google') {
    googleMap.show();
  } else if (type === 'bing') googleMap.show();
};

renderMap('google'); // Render google map
renderMap('bing'); // Render bing map
```

### Good Example

Separate **"Something is never changed"** which is rendering map.

```js
const googleMap = function(map) {
  if (map.show instanceof Function) map.show();
};
renderMap('google'); // Render google map
renderMap('bing'); // Render bing map
```

Now I can render any map I want as long as it has the method of `show`.

Of course, not every map uses the method `show`. This problem can be tackled by **"Adapter Pattern"**
