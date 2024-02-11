/*

app.js

var express = require('express'),
    dogs    = require('./routes/dogs'),
    cats    = require('./routes/cats'),
    birds   = require('./routes/birds');

var app = express();

app.use('/dogs',  dogs);
app.use('/cats',  cats);
app.use('/birds', birds);

app.listen(3000);
dogs.js

var express = require('express');

var router = express.Router();

router.get('/', function(req, res) {
    res.send('GET handler for /dogs route.');
});

router.post('/', function(req, res) {
    res.send('POST handler for /dogs route.');
});

module.exports = router;
When `var app = express()` is called, an app object is returned. Think of this as the main app.

When `var router = express.Router()` is called, a slightly different mini app is returned. The idea behind the mini app is that each route in your app can become quite complicated, and you'd benefit from moving all that code into a separate file. Each file's router becomes a mini app, which has a very similar structure to the main app.

In the example above, the code for the /dogs route has been moved into its own file so it doesn't clutter up the main app. The code for /cats and /birds would be structured similarly in their own files. By separating this code into three mini apps, you can work on the logic for each one in isolation, and not worry about how it will affect the other two.

If you have code (middleware) that pertains to all three routes, you can put it in the main app, before the `app.use(...)` calls. If you have code (middleware) that pertains to just one of those routes, you can put it in the file for that route only.

*/

const express = require('express');
const router = express.Router();

console.log("-".repeat(100));
console.log("XXX router declared:", router);
console.log("-".repeat(100));

const courses = [
    {id:1, name: 'xxx'},
    {id:2, name: 'yyy'}
]


router.get('/:id', (req, res) => {
    const course = courses.find((c) => c.id === parseInt(req.params.id))
    // res.send(req.params.id)
    res.send(course.name)
});

console.log("-".repeat(100));
console.log("router got GET:", router);
console.log("-".repeat(100));

module.exports = router;