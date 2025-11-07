const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { runValidation } = require('../middleware/validate');
const ctrl = require('../controllers/authController');

router.post('/register', [ body('name').notEmpty(), body('email').isEmail(), body('password').isLength({ min: 6 }) ], runValidation, ctrl.register);
router.post('/login', [ body('email').isEmail(), body('password').notEmpty() ], runValidation, ctrl.login);

module.exports = router;
