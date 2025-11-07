const Category = require('../models/Category');
const slugify = require('slugify');

exports.getCategories = async (req,res,next) => {
  try {
    const cats = await Category.find().sort('name');
    res.json(cats);
  } catch (err) { next(err); }
};

exports.createCategory = async (req,res,next) => {
  try {
    const { name } = req.body;
    const slug = slugify(name, { lower: true });
    const cat = new Category({ name, slug });
    await cat.save();
    res.status(201).json(cat);
  } catch (err) { next(err); }
};
