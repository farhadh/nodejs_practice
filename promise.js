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