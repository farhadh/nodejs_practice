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


/*

`app.use()` is intended for binding middleware to your application. The `path` is a "mount" or "prefix" path and limits the middleware to only apply to any paths requested that begin with it. It can even be used to embed another application:

// subapp.js
var express = require('express');
var app = modules.exports = express();
// ...
// server.js
var express = require('express');
var app = express();

app.use('/subapp', require('./subapp'));

// ...
By specifying `/` as a "mount" path, app.use() will respond to any path that starts with /, which are all of them and regardless of HTTP verb used:

`GET /`
`PUT /foo`
`POST /foo/bar`
etc.

`app.get()`, on the other hand, is part of Express' application routing and is intended for matching and handling a specific route when requested with the `GET` HTTP verb:

`GET /`

And, the equivalent routing for your example of `app.use()` would actually be:

app.all(/^\/.* /, function (req, res) {
  res.send('Hello');
});
(Update: Attempting to better demonstrate the differences.)

The routing methods, including `app.get()`, are convenience methods that help you align responses to requests more precisely. They also add in support for features like parameters and `next('route')`.

Within each `app.get()` is a call to `app.use()`, so you can certainly do all of this with `app.use()` directly. But, doing so will often require (probably unnecessarily) reimplementing various amounts of boilerplate code.

Examples:

For simple, static routes:

app.get('/', function (req, res) {
  // ...
});
vs.

app.use('/', function (req, res, next) {
  if (req.method !== 'GET' || req.url !== '/')
    return next();

  // ...
});
With multiple handlers for the same route:

app.get('/', authorize('ADMIN'), function (req, res) {
  // ...
});
vs.

const authorizeAdmin = authorize('ADMIN');

app.use('/', function (req, res, next) {
  if (req.method !== 'GET' || req.url !== '/')
    return next();

  authorizeAdmin(req, res, function (err) {
    if (err) return next(err);

    // ...
  });
});
With parameters:

app.get('/item/:id', function (req, res) {
  let id = req.params.id;
  // ...
});
vs.

const pathToRegExp = require('path-to-regexp');

function prepareParams(matches, pathKeys, previousParams) {
  var params = previousParams || {};

  // TODO: support repeating keys...
  matches.slice(1).forEach(function (segment, index) {
    let { name } = pathKeys[index];
    params[name] = segment;
  });

  return params;
}

const itemIdKeys = [];
const itemIdPattern = pathToRegExp('/item/:id', itemIdKeys);

app.use('/', function (req, res, next) {
  if (req.method !== 'GET') return next();

  var urlMatch = itemIdPattern.exec(req.url);
  if (!urlMatch) return next();

  if (itemIdKeys && itemIdKeys.length)
    req.params = prepareParams(urlMatch, itemIdKeys, req.params);

  let id = req.params.id;
  // ...
});
Note: Express' implementation of these features are contained in its Router, Layer, and Route.

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
