/*

The `await` operator is used to wait for a Promise and get its fulfillment value.
`await` can only be used inside an async function or at the top level of a module.

The async function declaration declares an async function where the await keyword is permitted within the function body.
The async and await keywords enable asynchronous, promise-based behavior to be written in a cleaner style, avoiding the 
need to explicitly configure promise chains.

Generally, when the code is executed, the JS engine goes down each line one by one. When it encounters a `Promise`, it automatically
puts it in the microtask queue so that it can be executed in the  background and don't block the main thread/callstack.

In the meantime, the `Promise` would be executed in the microtask queue, until it returns a value. Now, when the JS engine reaches to
an `await`ed function/value, it first executes the function/value until it reaches to the `Promise` within. When reached to it, the
`Promise` would be put in the microtask queue automatically and continues executing the code in the execution context containing the 
`Promise`. Then it jumps out of the `await`ed function/value and sees the `await` keyword. At this point, the JS engine will
suspend/pauses the execution of the  async function and the rest of the async function gets run in a microtask instead of a regular
task. Now that the async function is suspended as it encountered the `await` keyword, the engine jumps out of the async function and
continues executing the code in the execution context in which the async function got called.

Finally, now that there are no more tasks to run in the global execution context, The event loop checks to see if there are any
microtasks queued up: and there are! The async function is queued up after resolving the value of the `await`ed function/value inside it.
The async gets popped back onto the call stack, and continues running where it previously left off.

*/

console.log("Start");

function sleep(ms) {
    console.log('sleep function called')
    const my_prom = new Promise(r => setTimeout(() => {
      console.log(`done waiting for ${ms} ms`)
      r(1)
    }, ms))
    console.log(`After the Promise is called - ${ms} ms`);

    return my_prom
}

async function doSomeAsyncStuff1() {
  console.log('111 before sleeping')
  await sleep(3000)
  console.log('111 done sleeping')
}

async function doSomeAsyncStuff2() {
  console.log('222 before sleeping')
  await sleep(2000)
  console.log('222 done sleeping')
}

async function main() {
  console.log("main() called");
  
  console.log("doSomeAsyncStuff1() called");
  await doSomeAsyncStuff1()
  
  console.log("doSomeAsyncStuff2() called");
  await doSomeAsyncStuff2()
  
  console.log('end of main()')
}

main()

console.log("The End");

// async function runner(){
//   const asdf = await main()
//   console.log('The End')
//   return asdf
// }

// runner()