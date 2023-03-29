const STATE = {
    FULFILLED: "fulfilled",
    REJECTED: "rejected",
    PENDING: "pending",
}

class MyPromise {
    #thenCBs = []
    #catchCBs = []
       
    #state = STATE.PENDING
    #value
    
    #onSuccessBind = this.#onSuccess.bind(this)
    #onFailBind = this.#onFail.bind(this)

    constructor(executorFn) {
        try {
            executorFn(this.#onSuccessBind, this.#onFailBind)
        } catch (error) {
            this.#onFail(error)
        }
    }

    #onSuccess(value) {
        if (this.#state !== STATE.PENDING) return
        this.#value = value
        this.#state = STATE.FULFILLED
        
        this.#thenCBs.forEach(cbElement => {
            cbElement(this.#value)
        })

        this.#thenCBs = []
    }

    #onFail(value) {
        if (this.#state !== STATE.PENDING) return
        this.#value = value
        this.#state = STATE.REJECTED

        this.#catchCBs.forEach(cbElement => {
            cbElement(this.#value)
        })

        this.#catchCBs = []
    }

    then(callback){
        this.#thenCBs.push(callback)
    }

    catch(callback){

    }

    finally(callback){

    }
}



const foo = new MyPromise((resolve, reject) => {
    setTimeout(() => {
        resolve('asdf')
    }, 100)
});

foo
    .then((x) => {console.log(x)})
    // .then((x) => {console.log('b')})
    // .then((x) => {console.log('c')})


// function main() {
//     return new Promise( (resolve, reject) => {
//         setTimeout(() => {
//             resolve('456')
//         }, 100);
//     });
// }

// async function main2() {
//     const bar = await main();
//     console.log("🛠️ ------------------------------------------------🛠️")
//     console.log("🛠️  - file: myPromise.js - Line:89 - bar:\n", bar)
//     console.log("🛠️ ------------------------------------------------🛠️")
// }


// if (require.main === module) {
//     // main2()
//     const foo = main();
//     console.log("🛠️ --------------------------------------------------🛠️")
//     console.log("🛠️  - file: myPromise.js - Line:84 - main:\n", foo)
//     console.log("🛠️  - file: myPromise.js - Line:84 - main:\n", foo.then((x)=>console.log(x)))
//     console.log("🛠️ --------------------------------------------------🛠️")
// }
