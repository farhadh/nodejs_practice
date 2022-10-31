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