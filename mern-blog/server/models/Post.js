const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  title: { type: String, required:true },
  slug: { type: String, required: true, unique: true },
  content: { type: String, required:true },
  excerpt: { type: String },
  featuredImage: { type: String }, // upload path
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
  comments: [{
    authorName: String,
    body: String,
    createdAt: { type: Date, default: Date.now }
  }]
},{ timestamps: true });

module.exports = mongoose.model('Post', PostSchema);
