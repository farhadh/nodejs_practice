console.log("Start");

function sleep(ms) {
    console.log('sleep function called')
    return new Promise(r => setTimeout(() => {
      console.log(`done waiting for ${ms} ms`)
      r()
    }, ms))
}

async function doSomeAsyncStuff1() {
  console.log('111 before sleeping')
  await sleep(1000)
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
  doSomeAsyncStuff2()
  
  console.log('end of main()')
}

main()
console.log('The End')