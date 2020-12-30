/**All this created by Kliver Daniel
 * https://github.com/kliver98
 */
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

let GameSchema = Schema ({
    type: {
        type: String,
        default: 'Default: Roulette',
        max: 50
    },
    name: {
        type: String,
        default: Date.now,
        max: 150
    },
    game_users: {
        type: [Number],
        default: []
    },
    money: {
        type: Number,
        required: true,
    }
})

module.exports = mongoose.model('Game', GameSchema);