// const promiseToReader = new Promise((resolve, reject) => {
    
//     liked = false
    
//     return setTimeout(function() {
//         if (liked) {
//             resolve('This article is awesome!')
//         } else {
//             reject('I should have never been here! ;p')
//         }
//     }, 2000)
// })

// console.log("promiseToReader:", promiseToReader
// .then(x => console.log(x))
// .catch(x => console.log(x))
// )


const person = {
    firstName: 'John',
    lastName: 'Doe'
  };
  
  function greet(greeting) {
    console.log(`${greeting}, ${this.firstName} ${this.lastName}!`);
  }
  
  greet(); // Output: "Hello, John Doe!"
  
  const greetPerson = greet.bind(person, 'Hello');
  greetPerson(); // Output: "Hello, John Doe!"
  greet.bind(person, 'Hello')()