var express = require('express');
var router = express.Router();
var game_controller = require("../controllers/game");

router.get('/', game_controller.index);
router.post('/', game_controller.create);
router.get('/last', game_controller.lastRegisters);
router.get('/from/:from', game_controller.show);
router.get('/generate-random', game_controller.generate);

module.exports = router;
