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