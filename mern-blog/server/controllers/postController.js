const Post = require('../models/Post');
const Category = require('../models/Category');
const slugify = require('slugify');

// GET /api/posts?search=&page=&limit=&category=
exports.getPosts = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, search, category } = req.query;
    const query = {};
    if (search) query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { content: { $regex: search, $options: 'i' } }
    ];
    if (category) query.categories = category;
    const skip = (page - 1) * limit;
    const posts = await Post.find(query)
      .populate('categories')
      .populate('author', 'name email')
      .sort({ createdAt: -1 })
      .skip(Number(skip))
      .limit(Number(limit));
    const total = await Post.countDocuments(query);
    res.json({ data: posts, meta: { total, page: Number(page), limit: Number(limit) }});
  } catch (err) { next(err); }
};

exports.getPost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id).populate('categories author');
    if (!post) return res.status(404).json({ message: 'Not found' });
    res.json(post);
  } catch (err) { next(err); }
};

exports.createPost = async (req, res, next) => {
  try {
    const { title, content, categories = [] } = req.body;
    const slug = slugify(title, { lower: true });
    const featuredImage = req.file ? `/uploads/${req.file.filename}` : undefined;
    const post = new Post({ title, slug, content, categories, featuredImage, author: req.user?.id });
    await post.save();
    res.status(201).json(post);
  } catch (err) { next(err); }
};

exports.updatePost = async (req, res, next) => {
  try {
    const updates = req.body;
    if (updates.title) updates.slug = slugify(updates.title, { lower: true });
    if (req.file) updates.featuredImage = `/uploads/${req.file.filename}`;
    const post = await Post.findByIdAndUpdate(req.params.id, updates, { new: true });
    res.json(post);
  } catch (err) { next(err); }
};

exports.deletePost = async (req, res, next) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) { next(err); }
};
