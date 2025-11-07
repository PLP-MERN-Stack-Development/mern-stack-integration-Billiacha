const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { runValidation } = require('../middleware/validate');
const { requireAuth } = require('../middleware/auth');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const ctrl = require('../controllers/postController');

router.get('/', ctrl.getPosts);
router.get('/:id', ctrl.getPost);
router.post('/', requireAuth, upload.single('featuredImage'),
  [ body('title').notEmpty(), body('content').isLength({ min: 10 }) ], runValidation, ctrl.createPost);
router.put('/:id', requireAuth, upload.single('featuredImage'), ctrl.updatePost);
router.delete('/:id', requireAuth, ctrl.deletePost);

module.exports = router;
