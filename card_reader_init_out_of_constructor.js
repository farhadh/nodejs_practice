#!/usr/bin/env node

import pcsclite from 'pcsclite';
import { EventEmitter } from "events"

class CardReader extends EventEmitter {
    constructor() {
        super()

        const pcsc = pcsclite()
        this.pcsc = pcsc

        pcsc.on('reader', this.initCardReader.bind(this))

        this.pcsc.on('error', (err) => {
            console.log(err.message);
        })
    }

    initCardReader(reader){
        console.log("Initializing/Seeking the card reader");
        console.log("Reader:", reader.name);
        this.reader = reader

        reader.on('status', (status) => {
            // console.log('Status(', reader.name, '):', status);
            /* check what has changed */
            var changes = reader.state ^ status.state;
            if (changes) {
                if ((changes & reader.SCARD_STATE_EMPTY) && (status.state & reader.SCARD_STATE_EMPTY)) {
                    console.log("card removed");/* card removed */
                    this.emit('card_removed')
                    reader.disconnect(reader.SCARD_LEAVE_CARD, function (err) {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log('Disconnected');
                            this.emit('Disconnected')
                        }
                    });
                } else if ((changes & reader.SCARD_STATE_PRESENT) && (status.state & reader.SCARD_STATE_PRESENT)) {
                    console.log("card inserted");/* card inserted */
                    this.emit('card_inserted')
                    reader.connect({ share_mode: reader.SCARD_SHARE_SHARED }, (err, protocol) => {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log('Protocol(', reader.name, '):', protocol);
                            this.protocol = protocol
                            console.log('Connected')
                            this.emit('ready')
                        }
                    });
                }
            }

        })
    }

    async sendAPDU(cmd) {
        console.log("-".repeat(60))
        console.log("Send APDU");
        console.log(Buffer.from(cmd, 'hex'))
        return new Promise((res, rej) => {
            this.reader.transmit(Buffer.from(cmd, 'hex'), 0xFF, this.protocol, (err, data) => {
                if (err){
                    rej(err)
                }

                console.log(data);

                this.data = data
                this.sw1 = data.slice(-2, -1)
                this.sw2 = data.slice(-1)
                
                res({ card_resp: this.data, sw1: this.sw1, sw2: this.sw2})
            });
        })        
    }

    async readBinary() {
        console.log("-".repeat(60))  
        console.log("Reading Binary");
        let ln = 0xFF       
        while(1){
            let resp = await this.sendAPDU([0x00, 0xB0, 0x00, 0x00, ln])

            if (resp.card_resp[0] === 0x6C) {
                ln = resp.card_resp[1]
            }
            if (resp.card_resp[0] !== 0x6C) {
                break;
            }
        }
        
    }
    
    async getResponse() {
        console.log("-".repeat(60))
        console.log("getcard_resp");       
        let ln = parseInt(this.sw2.toString('hex'), 16)
        await this.sendAPDU([0x00, 0xC0, 0x00, 0x00, ln])
    }
    
    async readRecord(rec_no, SFI = 0x04) {
        console.log("-".repeat(60))
        console.log("readRecord");
        let ln = parseInt(this.sw2.toString('hex'), 16)
        
        while(1){
            let resp = await this.sendAPDU([0x00, 0xB2, rec_no, SFI, ln])
            if (resp.card_resp[0] === 0x6C || 0x67) {
                ln = resp.card_resp[1]
            }
            if(![0x6C, 0x67].includes(resp.card_resp[0])) {
            // if (resp.card_resp[0] !== (0x6C || 0x67)) {
                break;
            }
        }
    }

    getReaderName() {
        return this.reader.name
    }

    disconnect(){
        this.reader.close()
    }

    pcsc_close(){
        this.pcsc.close()
    }


}

export default CardReader