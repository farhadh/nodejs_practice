/*
In JavaScript promises, the `resolve` and `reject` functions are callback functions that are passed as parameters to the executor function when a new promise is created. The executor function takes two parameters: `resolve` and `reject`.

The resolve function is called when the asynchronous operation is successful and returns a value that has been set for `resolve` method's signature. The `reject` function is called when the asynchronous operation fails and returns an error.

Both resolve and reject functions can take a single argument, which represents the value of the resolved or rejected promise respectively. This argument can be any valid JavaScript value, including a variable.


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

When the promise is resolved with the value "hello world", the then method calls the first callback function, passing the resolved value as its argument. The resolved value can then be consumed and used in the callback function, which in this case logs the string "Resolved value: hello world" to the console.


Also, while you can handle errors in the `then` method using a second callback function, using `catch` can make your code more readable, modular, and resilient.
*/





const { rejects } = require("assert");

const p = new Promise((resolve, reject) => {
    // kick off some async work
    setTimeout(() => {
        resolve("123")
        // reject(new Error('Error message'));
    }, 1500);
})

console.log(p);

p
    .then(result => console.log("x", result), (err) => console.error(err.message))
    // .catch(err => console.log(err.message))

// ------------------------------------------------------------------------------------------------------------

const seeking_new_phone = new Promise((res, rej) => {
    // Do research on phones in the market
    found_the_one = false

    if (found_the_one) {
        res("The one is found!")
    } else if (!found_the_one) {
        rej(new Error("Not found it yet"))
    } else if (typeof(found_the_one !== Boolean)){
        rej(new Error('Wrong type for the search result!'))
    }
})

seeking_new_phone
    .then(result => console.log("x", result), (err) => console.error(err.message))
    .catch(err => console.error(err.message))

// ------------------------------------------------------------------------------------------------------------

const p = new Promise((resolve, reject) => {
    // Kick off some async work
    // ...
    setTimeout(() => {
      resolve(1); // pending => resolved, fulfilled 
      reject(new Error('message')); // pending => rejected
    }, 2000);
  });
  
  p
    .then(result => console.log('Result', result))
    .catch(err => console.log('Error', err.message));