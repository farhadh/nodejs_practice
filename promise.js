/*
In JavaScript promises, the `resolve` and `reject` functions are callback functions that are passed as parameters to the executor function when a new promise is created. The executor function takes two parameters: `resolve` and `reject`.

The `resolve` function is called when the asynchronous operation is successful and returns a value that has been set for the `resolve` method's signature. The `reject` function is called when the asynchronous operation fails and returns an error.

Both `resolve` and `reject` functions can take a single argument, which represents the value of the resolved or rejected promise respectively. This argument can be any valid JavaScript value, including a variable.

The `resolve` function in the promise constructor is simply a function you call to let the runtime know the promise has completed and the value is available.

Resolve is analogous to return in standard functions. Hence, you can pass any value at all into `resolve`.

To resolve a promise simply means to indicate that the action has completed and the value is available.

The magic is that what you pass to resolve is threaded through into the function you give to `then`. So internally, your `then` function "registers" itself with the promise and (also internally) when you call `resolve` this "triggers" the function you pass to `then`.

So there's a sort of relationship, which you don't need to worry about as a consumer of promises, between `resolve` and the `then` function. Think of them like creating an event handler - the bit in `then` is the handler and `resolve` is the thing that kicks off the event.


You use resolve reject when creating a promise yourself by using new Promise(). When you call `resolve` inside the promise callback, you 'resolve' that promise, meaning that it has completed successfully. If you call reject inside the promise callback, you 'reject' that promise, meaning that it has come up with an error when trying to do whatever is inside.

The `resolve` and `reject` parameters are only used when constructing promises, whereas for then and catch methods are used when consuming the promise (not creating it).

If you create your promise with the new keyword and then consume it, whatever was passed into the `resolve` is what is received in the then. The same applies for the `reject` and `catch`.


const promise = new Promise((resolve, reject) => {
  const randomNumberHigherThan_0.5 = Math.random();
  if (randomNumberHigherThan_0.5 > 0.5) {
    resolve(randomNumberHigherThan_0.5);
  } else {
    reject(new Error("Failed"));
  }
});

promise.then(
  (randomNumberHigherThan_0.5) => console.log(`Success: ${randomNumberHigherThan_0.5}`),
  (error) => console.log(`Error: ${error}`)
);

When a promise is resolved with a value using the `resolve` function, the resolved value is passed as an argument to the `then` method. The `then` method takes two optional callback functions as arguments, one for handling the resolved value, and one for handling any errors that may occur.

Whatever is passed as an argument to the `resolve` function when defining a promise will be passed to the first callback function in the `then` method when the promise is resolved successfully.


const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("hello world");
  }, 1000);
});

promise.then((result) => {
  console.log(result); // logs "hello world"
});
In this example, a new promise is created that resolves with the string "hello world" after a 1-second delay. The then method is then called on the promise with two callback functions as arguments, one to handle the resolved value and one to handle any errors.

When the promise is resolved with the value "hello world", the `then` method calls the first callback function, passing the resolved value as its argument. The resolved value can then be consumed and used in the callback function, which in this case logs the string "Resolved value: hello world" to the console.

while both `return` and `resolve` involve returning values, `return` is a fundamental concept in functions, used to specify what a function produces, while `resolve` is specific to Promises, indicating the successful completion of an asynchronous operation and providing a value for subsequent handling.

Also, while you can handle errors in the `then` method using a second callback function, using `catch` can make your code more readable, modular, and resilient.
*/

function main() {
  const p = new Promise((resolve, reject) => {
    // kick off some async work
    setTimeout(() => {
      resolve("Success: Operation completed successfully!")
    }, 1500);
  })

  console.log("🚀 -> file: promise.js:72 -> main -> p:", p)

  p.then((x) => console.log("XXX THEN XXX:", x))

  return 100
}

async function runner(){
  const bar = await main()
  console.log("🚀 -> file: promise.js:80 -> runner -> bar:", bar)
}

runner()

// if (require.main === module) {
//     const bar = main();
//     console.log("🚀 -> file: promise.js:80 -> bar:\n", bar)
// }