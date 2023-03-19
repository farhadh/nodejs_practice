/*
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
bind() = Borrows a function, and creates a copy.
        "this" keyword is replaced with the object
        passed in as an argument.

x.bind(y) = "use object y in your function (x)".
            Meaning that "now the `this` in the function x
            is referring to the object y".

            So `this` would change dynamically depending on
            what we have binded to that function.

---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
We use bind() to create a new function called greetPerson.
`greetPerson` is bound to the `person` object as its `this` value, and has a preset value of 'Hello' for the greeting parameter.
When we call greetPerson(), it logs the message "Hello, John Doe!" to the console, using the values of firstName and lastName from the person object.

For a given function, creates a bound function that has the same body as the original function.
The `this` object of the bound function is associated with the specified object, and has the specified initial parameters.

theBoundFunction = function.bind(the-object-whose-this-is-passed-to-the-bound-function, intial-parameters-for-the-bound-function)

x = y.bind(z)
the bound function (x which is y.bind(z)) will have `this` set to the `z`

@param thisArg — An object to which the this keyword can refer inside the new function.
@param argArray — A list of arguments to be passed to the new function.
In TypeScript, the this: Function type annotation is used to specify the type of the this keyword in a function.


---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
(method) Function.bind(this: Function, thisArg: any, ...argArray: any[]): any

When you define a function, the `this` keyword refers to the object that the function is called on.
However, in JavaScript, the value of this can be changed dynamically depending on how the function is called.
To enforce stricter rules around the usage of this in functions, TypeScript allows you to specify the type of `this` using the `this: Function` type annotation.
This annotation tells TypeScript that "the function must be called on an object that is of type Function or a subtype of Function."

Meaning that the bind() method is only called on a function, and not on an object.
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Syntax:
bind(thisArg)
bind(thisArg, arg1)
bind(thisArg, arg1, arg2)
bind(thisArg, arg1, arg2, ..., argN)

`thisArg`: The value to be passed as the `this` parameter to the target function `func` when the bound function is called.
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------

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


// ----------------------------------------------------------------



const person = {
  firstName: 'John',
  lastName: 'Doe'
};

function greet(greeting) {
  console.log(this)
  console.log(`${greeting}, ${this.firstName} ${this.lastName}!`);
}

greet(); // Output: "Hello, John Doe!"

const greetPerson = greet.bind(person, 'hello');
greetPerson(); // Output: "Hello, John Doe!"
// greet.bind(person, 'Hello')()
// ----------------------------------------------------------------

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