/*
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
bind() = Borrows a function, and creates a copy.
        "this" keyword is replaced with the object
        passed in as an argument.

x.bind(y) = "use object y in your function (x)".
            Meaning that "now the `this` in the function x
            is referring to the object y".

            So `this` would change dynamically depending on
            what we have binded/bound to that function.

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

---------------------------------------------------------------------------------------------------------------------------------------------------------------------------

this.someFunction.bind(something) returns a new function, in which the references to `this` will refer to `something`.
This is a way of saving the current value of `this`, which is in scope during the call to the constructor, so that it can be used later when the function is called.

---------------------------------------------------------------------------------------------------------------------------------------------------------------------------

In JavaScript, you should use the `bind(this)` method for functions invoked in the constructor whenever you need to ensure that the `this` keyword refers to the
instance of the class being constructed, rather than the global `this` object or some other object.

By using the `new` keyword when invoking the constructor function. When you use the `new` keyword to create a new instance of a class, JavaScript automatically
binds the `this` keyword inside the constructor to the new instance being created. This means that any properties or methods you define on the `this` keyword inside
the constructor will be added to the new instance of the class.

It's worth noting that if you invoke the constructor function without using the `new` keyword, the `this` keyword inside the constructor will refer to the global `this` object,
which can cause unexpected behavior or errors. Therefore, it's important to always use the `new` keyword when creating new instances of a class in JavaScript.

In JavaScript, when you use a class method as a callback inside the class constructor, the value of `this` inside the method might not refer to the instance of the class that you expect.
This is because the `this` keyword in JavaScript is dynamically scoped and its value is determined by how the function is invoked.  To ensure that the `this` keyword inside the class method
refers to the instance of the class being constructed, you can use the `bind()` method to bind the method to the instance of the class. This creates a new function with the same code as the
original method, but with the `this` keyword permanently bound to the instance of the class.

Here's an example:
class MyClass {
  constructor() {
    this.name = 'MyClass';
    setTimeout(this.logName, 1000); // this.logName is not bound to the instance of MyClass
  }
  
  logName() {
    console.log(this.name); // this refers to the global object, not the instance of MyClass
  }
}

const myInstance = new MyClass();

In JavaScript, when you use a class method as a callback inside the class constructor, the value of `this` inside the method might not refer to the instance of the class that you expect.
This is because the `this` keyword in JavaScript is dynamically scoped and its value is determined by how the function is invoked. The scope of `this` can vary depending on where the
function is called from (i.e. the `this.logName` is called from within `setTimeout`), and it can sometimes be difficult to determine the exact value of this in a given context.

When you pass `this.logName` as the first argument to `setTimeout`, the `setTimeout` function creates a new function scope where `this` will refer to the global object (i.e., window in
a browser or global in Node.js) instead of the class instance. This happens because the `setTimeout` function is called as a standalone function, not as a method of the class instance,
so `this` is not bound to the class instance. In this case, this is determined by the surrounding function scope, which is the global scope.

class MyClass {
  constructor(name) {
    this.name = name;
    this.logName = this.logName.bind(this);
    setTimeout(this.logName, 1000);
  }
  
  logName() {
    console.log(this.name);
  }
}

const myObject = new MyClass('John'); // "John" will be logged after 1 second

In this example, we use the `bind` method to bind the `this` keyword in `this.logName` to the class instance. When `setTimeout` calls `this.logName`, `this` will refer to the class 
instance and `this.name` will correctly log "John".


- Ok, but doesn’t the `setTimeout` method know that the `this.logName` is the class method? So why does it change the scope of `this` keyword when it’s passed to it?
No, the `setTimeout` method does not know that `this.logName` is a class method. In JavaScript, functions are first-class citizens, which means they can be passed around like any
other value. When you pass `this.logName` as an argument to `setTimeout`, you are passing the function object itself, not the object that the function belongs to.


- So if we don’t bind the `this.logName` to the class instance, it doesn’t matter what function we pass to the `setTimeout` function, because it doesn’t know it’s a class
method, so the result would still be the same and it is `undefined`?
Yes, that's correct.

If you pass `this.logName` to `setTimeout` without binding `this`, then `this` inside `this.logName` will be set to the global object (or undefined in strict mode) when the
function is executed. This is because this is determined dynamically by how the function is invoked, and in this case, it is being invoked by the `setTimeout` function, not as a
method of the class instance. So, regardless of whether `this.logName` is a class method or a regular function, if you don't bind `this` correctly, it will not refer to the class instance inside the
function, and you will get unexpected results, such as `undefined` in this case.


- When you say “ if you don't bind this correctly, it will not refer to the class instance inside the function” inside what function?
I'm referring to the function that you pass as an argument to `setTimeout`.

In the example we've been discussing, `this.logName` is the function that you pass to `setTimeout`. If you don't bind `this` correctly inside `this.logName`, then `this` will
not refer to the class instance when `this.logName` is executed by `setTimeout`.

This is because `setTimeout` executes the function you pass to it in a new function context, where `this` is set to the global object by default (or undefined in strict mode).
If you want `this` inside the function to refer to the class instance, you need to bind it correctly to the instance using bind or another technique (e.g. using arrow function), as I explained earlier.


- I have another question. if we don't bind `this.logName` to class's `this`, would the `setTimeout` still know that the `this.logName` is the class method in which the `setTimeout`
has been invoked or would `setTimeout` sees the `this.logName` as an unknown function?

`setTimeout` does not have any knowledge of the context in which it is called or the object that the function passed to it belongs to. When you pass `this.logName` as an argument to setTimeout without
binding `this`, `setTimeout` simply receives a reference to a function, which it will execute after the specified timeout has elapsed.

Therefore, `setTimeout` does not see `this.logName` as a method of a class or anything else. It only sees it as a function that it needs to execute.

It is up to the function (`this.logName`) that `setTimeout` is executing to determine the value of `this`. If `this` is not explicitly bound to the class instance using bind or some other method,
then `this` will be set to the global object (or undefined in strict mode) when the function is executed by `setTimeout`.

So, in summary, `setTimeout` does not have any special knowledge of the function passed to it or the object it belongs to. It simply receives a function reference and executes it after the specified timeout.
It is up to the function itself (`this.logName`) to determine the value of `this`.


- also, earlier you mentioned that "the `setTimeout` function is called as a standalone function, not as a method of the class instance", my question is how can we call the setTimeout function as a method of class instance?

`setTimeout` is not a method of a class instance, so you cannot call it as a method of an instance. It is a global function in JavaScript, which means it can be called from
anywhere in your code, regardless of the context in which it is called.

When you pass a function to `setTimeout`, it becomes a callback function that `setTimeout` will execute after the specified timeout has elapsed. At the time when the function
is executed by `setTimeout`, it is not executed as a method of any object or class instance, but as a standalone function in its own context.

However, you can call a method of a class instance from within a function that is passed to `setTimeout`. In order to do so, you would need to pass a reference to the class instance
to the function, either as a parameter or by using a closure. Then, inside the function, you could call a method of the class instance using the reference.


- You mentioned that "It is up to the function that `setTimeout` is executing to determine the value of `this`". Do you mean it is up to `this.logName` to preserve or pass its `this` value with itself when it is invoked from within `setTimeout`?

Yes, that's correct. When `setTimeout` executes the function passed to it, the value of `this` is determined by how the function is called. If the function is called
as a method of an object (e.g., a class instance), then `this` will refer to that object.

However, since `setTimeout` is not a method of an object, and the function it executes is not a method of any object either, the value of `this` inside the function
is determined by the context in which the function is executed. By default, the value of `this` inside the function will be the global object (window in a browser,
  or global in Node.js) if the function is not called with any explicit context.

In the case of the `logName` function in your previous example, if it is not explicitly bound to the class instance using bind or some other method, then the value of
`this` inside the function will be the global object when it is executed by `setTimeout`. This means that the function will not have access to the instance properties
and methods, and will likely cause an error.

To preserve the value of `this` inside the `logName` function when it is called by `setTimeout`, you can use an arrow function, which lexically binds `this` to the value
of `this` at the time the arrow function is defined. This ensures that `this` inside the function will always refer to the class instance, regardless of how the function is called.
Arrow functions are lexically scoped, which means that they inherit the value of `this` from their surrounding context. If an arrow function is defined inside a class method or an
object literal, it will inherit the value of `this` from that object or class instance. If an arrow function is defined in the global scope, it will inherit the value of `this` from the global object.

class MyClass {
  constructor(name) {
    this.name = name;
    setTimeout(() => {
      this.logName();
    }, 1000);
  }

  logName() {
    console.log(this.name);
  }
}

const myObj = new MyClass("John");


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