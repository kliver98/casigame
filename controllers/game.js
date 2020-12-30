const Game = require('../models/game')

exports.index = function (req, res, next) {
    Game.find({}, (err, games) => {
        if (err)
            return next(err)
        res.status(200)
        res.send(games);
    })
}

exports.create = function(req, res, next) {
    let game = new Game({
        type: req.body.type,
        name: req.body.name,
        game_users: req.body.game_users,
        money: req.body.money
    });

    game.save(err => {
        if (err)
            return next(err)
        res.status(201)
        res.send("Game ["+game.name+"] created successfully")
    })
}

exports.show = function (req, res, next) {
    let from = parseInt(req.params.from);
    Game.find({},{}).skip(from).limit(10).then((resp, err) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        if (resp.length===0)
            res.status(204).json(resp)
        else
            res.status(200).json(resp)
    })
        
}