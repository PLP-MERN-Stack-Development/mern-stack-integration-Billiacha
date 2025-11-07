const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { runValidation } = require('../middleware/validate');
const ctrl = require('../controllers/categoryController');

router.get('/', ctrl.getCategories);
router.post('/', [ body('name').notEmpty() ], runValidation, ctrl.createCategory);

module.exports = router;
