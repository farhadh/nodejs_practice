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
