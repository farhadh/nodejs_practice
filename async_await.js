function sleep(ms) {
    console.log('sleep function called')
    return new Promise(r => setTimeout(() => {
      console.log(`done waiting for ${ms} ms`)
      r()
    }, ms))
  }
  
  async function doSomeAsyncStuff1() {
    console.log('111 before sleeping')
    await sleep(2000)
    console.log('111 done sleeping')
  }
  
  async function doSomeAsyncStuff2() {
    console.log('222 before sleeping')
    await sleep(4000)
    console.log('222 done sleeping')
  }
  
  async function main() {
    doSomeAsyncStuff1()
    doSomeAsyncStuff2()
    console.log('here')
  }
  
  main()
  console.log('i am here now')