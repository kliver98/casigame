const Game = require('../models/game')

exports.index = function (req, res, next) {
    Game.find({}, (err, games) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        if (games.length===0)
            res.status(204).json(games)
        else
            res.status(200).json(games)
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
    if (isNaN(from)) {
        res.status(400).json({error:400,message:"FROM not a number"})
        return
    }
    Game.find({},{}).skip(from).limit(10).then((games, err) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        if (games.length===0)
            res.status(204).json(games)
        else
            res.status(200).json(games)
    })
        
}