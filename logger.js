import { EventEmitter } from 'events';

var url = 'http://mylogger.iolog';


class Logger extends EventEmitter {
    log(message){
        // send an HTTP request
        console.log(message);
        
        // raise an event
        this.emit('messageLogged', {id: 1, url: 'https://www.google.com'});
    }
}

export { Logger as logger_cls };