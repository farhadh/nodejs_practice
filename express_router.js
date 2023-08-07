/*

app.use([path,] callback [, callback...])
Mounts the specified middleware function or functions at the specified path: the middleware function is executed when the base of the requested path matches path.

A route will match any path that follows its path immediately with a “/”. For example: app.use('/apple', ...) will match “/apple”, “/apple/images”, “/apple/images/news”, and so on.

Since path defaults to “/”, middleware mounted without a path will be executed for every request to the app.
For example, this middleware function will be executed for *every* request to the app:

app.use(function (req, res, next) {
  console.log('Time: %d', Date.now())
  next()
})


Middleware functions are executed sequentially, therefore the order of middleware inclusion is important.

// this middleware will not allow the request to go beyond it because `next()` is not called.
app.use(function (req, res, next) {
  res.send('Hello World')
})

// requests will never reach this route
app.get('/', function (req, res) {
  res.send('Welcome')
})

*/





const exp = require('express');
const courses_router = require('./courses.js');

console.log("XXX courses:", courses_router);

console.log("-".repeat(100));

const app = exp();

console.log("-".repeat(100));
console.log("XXX app1:", app);
console.log("-".repeat(100));

app.get('/:id', (req, res) => {
    // const course = courses.find((c) => c.id === parseInt(req.params.id))
    // res.send(req.params.id)
    res.send("it hit app.gett")
});
console.log("-".repeat(100));
console.log("XXX app got assinged GET in index file:", app);
console.log("-".repeat(100));


app.use('/api/courses', courses_router)

console.log("-".repeat(100));
console.log("XXX app got use() in index file:", app);
console.log("-".repeat(100));

// const port = process.env.PORT || 3000
// app.listen(3000, () => console.log(`Listening on port ${port}...`))
