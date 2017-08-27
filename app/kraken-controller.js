'use babel'

const kraken = require('kraken-api')

module.exports = class KrakenContoller {
    constructor(key, secret) {
        this.key = key
        this.secret = secret
        this.kraken = new kraken(this.key, this.secret)
        this._pairs = ["XETHZGBP", "XETHZEUR", "XETHZUSD", "XXBTZGBP", "XXBTZEUR", "XXBTZUSD"]
        this._currency = this._pairs[0]
        this.previous = -1
        this.current = -1
    }

    get pairs() {
        return this._pairs
    }

    set pairs(val) {
        this._pairs = val
    }

    get currency() {
        return this._currency
    }

    set currency(i) {
        if (typeof i == "string") {
            if(!this._pairs.includes(i)) this._currency = this._pairs[0]
            else this._currency = i
        }
        else {
            if(i < this._pairs.length) this._currency = this._pairs[i]
            else this._currency = this._pairs[0]
        }
    }

    fetch(cb) {
        let defPair = this._pairs[0]
        let that = this
        if(!this._pairs.includes(this._currency)) this._currency = defPair
        return this.kraken.api('Ticker', {"pair": this._currency}, (error, data) => {
            if(error) {
                console.log(error);
            }
            else {
                console.log(data.result);
                let result = data.result[that._currency]
                console.log(result.c);
                let [price, vol] = result.c
                if (that.previous = -1) that.previous = result.o
                else that.previous = that.current
                that.current = price
                cb(price, that._previous)
            }
        });
    }
}
