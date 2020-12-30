var express = require('express');
var router = express.Router();
var user_controller = require("../controllers/user");

router.get('/', user_controller.index);
router.post('/', user_controller.create);
router.get('/:id', user_controller.show);
router.delete('/:id', user_controller.delete);
router.put('/:id', user_controller.update);

module.exports = router;
