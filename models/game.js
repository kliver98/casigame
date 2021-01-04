/**All this created by Kliver Daniel
 * https://github.com/kliver98
 */
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

let GameSchema = Schema ({
    date: {
        type: Date,
        required: true,
    },
    id: {
        type: Number,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    mode: {
        type: String,
        required: true,
    },
    payed: {
        type: Number,
        required: true,
    }
})

module.exports = mongoose.model('Game', GameSchema);