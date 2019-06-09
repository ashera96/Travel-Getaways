const mongoose = require("mongoose");
const slugify = require("slugify");

const slug = str =>
  slugify(str, {
    replacement: "-",
    remove: /[*+~.()'"!:@]/g,
    lower: true
  });

const discussionSchema = mongoose.Schema({
  name: { type: String },
  slug: {
    type: String,
    lowercase: true,
    trim: true,
    set: v => slug(v)
  },
  description: { type: String }
});

const postSchema = mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  discussion: { type: mongoose.Schema.Types.ObjectId, required: true },
  author: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  parent: { type: mongoose.Schema.Types.ObjectId, default: null },
  upvotes: { type: Number, default: 0 },
  downvotes: { type: Number, default: 0 },
  views: { type: Number, default: 0 }
});

postSchema.methods.addNewChild = function(doc) {
  return this.model("post").create({
    ...doc,
    parent: this._id
  });
};

const Discussion = mongoose.model("discussion", discussionSchema);
const Post = mongoose.model("post", postSchema);

module.exports = {
  Discussion,
  Post
};
