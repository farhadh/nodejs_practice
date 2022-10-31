console.log("Start");

const qwe = ({id: uid, username: uname}) => {
    uid++
    uname = uname + "qwe"
    console.log(uid, uname);
}

function getUser(uid, uname, asdf) {
    setTimeout(() => {
        console.log("Reading the user from DB...");
        asdf({id: uid, username: uname})
    }, 1000);
}

getUser(1, "farhad", qwe)

console.log("End");