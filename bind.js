/*
bind() = Borrows a function, and creates a copy.
        "this" keyword is replaced with the object
        passed in as an argument.

x.bind(y) = "use object y in your function (x)".
            Meaning that "now the `this` in the function x
            is referring to the object y".

            So `this` would change dynamically depending on
            what we have binded to that function.



In case of a Class:
this.method.bind(this)

In the context of classes, the `this` keyword is often used to refer to the instance of the class.
The bind() method is usually used when you want to pass a method as a callback to another function
or event listener, and you want to ensure that the this value inside the method remains bound to the instance of the class.

Callbacks are typically called with a this value of undefined (calling it directly without attaching it to any object)
*/


// const c1 = {
//     x: 1,
//     y: 2
// }
// const c2 = {
//     x: 10,
//     y: 20
// }

// function printCoordinates() {
//     return this
// }

// const printCoordinates_binded = printCoordinates.bind(c2)

// const result = printCoordinates_binded()

// console.log("🛠️ -------------------------------------------🛠️")
// console.log("🛠️  - file: bind.js - Line:14 - foo:\n", result)
// console.log("🛠️ -------------------------------------------🛠️")


const EventEmitter = require('events');

class MyEmitter extends EventEmitter {}

class Example {
  constructor() {
    this.name = 'example';
    this.emitter = new MyEmitter();
    // this.emitter.on('greet', this.greet.bind(this));
    this.emitter.on('greet', this.greet);
  }

  greet() {
    console.log(`Hello, my name is ${this.name}`);
  }
}

const example = new Example();
example.emitter.emit('greet');