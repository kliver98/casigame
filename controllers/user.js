const User = require('../models/users')

exports.index = function (req, res, next) {
    User.find({}, (err, users) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        if (users.length===0)
            res.status(204).json(users)
        else
            res.status(200).json(users)
    })
}

exports.create = function(req, res, next) {
    let user = new User({
        fullname: req.body.fullname,
        username: req.body.username,
        _id: req.body._id,
        password: req.body.password,
        money: 15000,
        photo: req.body.photo,
        active: req.body.active,
    });

    user.save(err => {
        if (err)
            return next(err)
        res.status(201)
        res.send("User ["+user._id+"] created successfully")
    })
}

exports.show = function (req, res, next) {
    let id = req.params.id;
    if (isNaN(id)) {
        res.status(400).json({error:400,message:"ID not a number"})
        return
    }
    User.findById(id, (err, user) => {
        if (err)
            return next(err)
        if (user===undefined || user===null)
            res.status(204).send(user)
        else
            res.status(200).send(user)
    })
}

exports.delete = function (req, res, next) {
    var id = req.params.id
    if (isNaN(id)) {
        res.status(400).json({error:400,message:"ID not a number"})
        return
    }
    User.findByIdAndRemove(id, (err, user) => {
        if (user===undefined || user===null) {
            res.send({error:204,message:"Not user found with id: "+id})
            res.status(204)
            return
        }
        if (err)
            return next(err)
        res.send("User ["+user._id+"] deleted successfully")
    })
}

exports.update = function (req, res, next) {
    var id = req.params.id
    if (isNaN(id)) {
        res.status(400).json({error:400,message:"ID not a number"})
        return
    }
    User.findByIdAndUpdate(id, {$set: req.body}, (err, user) => {
        if (user===undefined || user===null) {
            res.send({error:204,message:"Not user found with id: "+id})
            res.status(204)
            return
        }
        if (err)
            return next(err)
        res.send("User ["+user._id+"] updated successfully")
    })
}

exports.from = function (req, res, next) {
    let from = parseInt(req.params.from);
    if (isNaN(from)) {
        res.status(400).json({error:400,message:"FROM not a number"})
        return
    }
    User.find({},{}).skip(from).limit(10).then((users, err) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        if (users.length===0)
            res.status(204).json(users)
        else
            res.status(200).json(users)
    })
        
}