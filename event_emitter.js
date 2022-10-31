import { logger_cls } from './logger.js'

const lg = new logger_cls()

// register a listener
const x = lg.on('messageLogged', (arg) => console.log("listener was called!", arg.url))

lg.log('asdfasdfsadf')
