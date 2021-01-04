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
        date: req.body.date,
        id: req.body.id,
        amount: req.body.amount,
        mode: req.body.mode,
        payed: req.body.payed
    });

    game.save(err => {
        if (err)
            return next(err)
        res.status(201)
        res.send("Game ["+game._id+"/"+game.date+"] created successfully")
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

exports.lastRegisters = function (req, res, next) {

    Game.find().limit(1).sort({$natural:-1}).then((game,err) => {
        if (err)
            res.status(204).json(game)
        else {
            let lastDate = game[0].date
            Game.find({"date":lastDate}).then((games, err) => {
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
    })
}

exports.generate = function (req, res, next) {

    var random = getRandom()
    res.status(200)
    res.json({random:random})

}

function getRandom(){
    var num=Math.random();
    if(num <= 0.01) return 'green';
    else if(num <= 0.505) return 'red';
    else return 'black';
  }