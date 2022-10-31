const express = require('express')
const app = express()

let i = 1

app.use((req, res, next) => {
    console.log(`My Logger ${i} :`, req.originalUrl)
    i++
    next()
})

app.get('/', (req, res) => {
    res.send('Home page')
})

app.get('/users', auth, (req, res) => {
    res.send('Users page')
})


function auth(req, res, next) {
    console.log('Authenticating...')
    if(req.query.admin === 'true'){
        console.info('Access granted')
        next()
    } else {
        res.send('No auth!')
    }
}


const port = process.env.PORT || 3000
app.listen(3000, () => console.log(`Listening on port ${port}...`))