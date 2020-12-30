/**All this created by Kliver Daniel
 * https://github.com/kliver98
 */
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

let UserSchema = Schema ({
    fullname: {
        type: String,
        default: 'Your name here',
        max: 80
    },
    username: {
        type: String,
        required: true,
        min: 3,
        max: 10
    },
    _id: {
        type: Number,
        required: true,
    },
    password: {
        type: String,
        required: true,
        min: 5,
        max: 10
    },
    money: {
        type: Number,
        required: true,
    },
    photo: {
        type: String,
        max: 500
    },
    active: {
        type: Boolean,
        default: true
    }
})

module.exports = mongoose.model('User', UserSchema);