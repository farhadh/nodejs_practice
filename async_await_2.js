const mongoose = require('mongoose')

async function connect_DB() {
    try {
        console.log("-".repeat(60))
        console.log("Connecting to the DB...");
        const connect_db = await mongoose.connect('mongodb://localhost:27017/myDB')
    }
    catch (error) {
        console.log(error.message)
    }
}

async function disconnect_DB() {
    try {
        console.log("-".repeat(60))
        console.log("Disconnecting from the DB...");
        const disconnect_db = await mongoose.disconnect('mongodb://localhost:27017/myDB')
    } catch (error) {
        console.log(error.message)
    }
}

const course_schema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [ String ],
    date: { type: Date, default: Date.now },
    isPublished: Boolean
})

const Course = mongoose.model('Course', course_schema)

async function createCourse() {
    const course = new Course({
        name: 'Node.JS Course',
        author: 'asdf',
        tags: ['node', 'backend'],
        isPublished: false
    })
    console.log("-".repeat(60))
    console.log("Creating a course.");
    const result = await course.save()
    console.log(result)
}

async function getCourses() {
    console.log("-".repeat(60))
    console.log('Querying DB...')
    const queryDB = new Promise((resolve) => {
        // do some heavy tasks
        setTimeout(async () => {
            console.log("Inside the setTimeout");
            const courses = await Course.find()
            console.log("Found it!");
            console.log("Here you are:",courses)
            resolve();
        }, 2000)
        console.log("This is out of setTimeout");
    })

    // const courses = await Course.find()
    // console.log("Found it!");
    // console.log("Here you are:",courses)

    return queryDB
}

async function work(){
    await connect_DB()
    // await createCourse()
    await getCourses()
    disconnect_DB()
}
work()