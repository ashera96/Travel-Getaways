const mongoose = require("mongoose");
const express = require("express");

const { Discussion, Post } = require("../models/forum");

const router = express.Router();
const ObjectId = mongoose.Types.ObjectId;

router.get("/discussions", (req, res) => {
  Discussion.find()
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        discussions: docs
      };
      res.status(200).json(response);
    })
    .catch(error => {
      console.log(err);
      res.status(500).json({
        error
      });
    });
});

router.post("/discussions", (req, res) => {
  const newDiscussion = new Discussion({
    name: req.body.name,
    slug: req.body.name,
    description: req.body.description
  });

  newDiscussion
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        status: "CREATED",
        createdDiscussion: result
      });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error });
    });
});

router.patch("/discussions/:id", (req, res) => {
  Discussion.findByIdAndUpdate(req.params.id, req.body)
    .then(document => {
      console.log(document);
      if (document === null) {
        res.status(404).json({
          status: "NOTFOUND",
          message: `discussion #${req.params.id} is not found`
        });
      }
      res.status(200).json(document);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error });
    });
});

router.delete("/discussions/:id", (req, res) => {
  Discussion.findByIdAndDelete(req.params.id)
    .then(document => {
      console.log(document);
      if (document === null) {
        res.status(404).json({
          status: "NOTFOUND",
          message: `discussion #${req.params.id} is not found`
        });
        return;
      }
      res.status(200).json(document);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error });
    });
});

router.get("/discussions/:did/posts", (req, res) => {
  const discussion = ObjectId(req.params.did);
  Post.find({ discussion })
    .then(posts => {
      console.log(posts);
      if (posts === null) {
        res.status(404).json({
          status: "NOTFOUND",
          message: `No posts for discussion #${req.params.did}`
        });
        return;
      }
      res.status(200).json({
        count: posts.length,
        posts
      });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error });
    });
});

router.post("/discussions/:did/posts", (req, res) => {
  Discussion.findById(req.params.did)
    .exec()
    .then(doc => {
      if (doc === null) {
        throw new Error("NOTFOUND");
      }
      return doc;
    })
    .then(discussion => {
      const newPost = new Post({
        title: req.body.title,
        content: req.body.content,
        discussion: discussion._id,
        author: `test-user-${Math.floor(Math.random() * 10)}`,
        parent: null
      });
      return newPost.save();
    })
    .then(post => {
      console.log(post);
      res.status(201).json({
        status: "OK",
        post
      });
    })
    .catch(error => {
      console.log(error);
      if (error.message === "NOTFOUND") {
        res.status(404).json({
          status: "NOTFOUND",
          message: "No such discussion"
        });
      } else {
        res.status(500).json({ error });
      }
    });
});

router.patch("/discussions/:did/posts/:pid", (req, res) => {
  res.end();
});

router.delete("/discussions/:did/posts/:pid", (req, res) => {
  Discussion.findById(req.params.did)
    .exec()
    .then(doc => {
      if (doc === null) {
        throw new Error("DISC_NOTFOUND");
      }
      return doc;
    })
    .then(discussion => {
      return Post.findByIdAndDelete(req.params.pid);
    })
    .then(post => {
      if (post === null) {
        throw new Error("POST_NOTFOUND");
      }

      console.log("DELETED", post);
      res.status(201).json({
        status: "OK",
        post
      });
    })
    .catch(error => {
      console.log(error);
      if (error.message === "DISC_NOTFOUND") {
        res.status(404).json({
          status: "NOTFOUND",
          message: "No such discussion"
        });
      } else if (error.message === "POST_NOTFOUND") {
        res.status(404).json({
          status: "NOTFOUND",
          message: "No such post"
        });
      } else {
        res.status(500).json({ error });
      }
    });
});

router.get("/discussions/:did/posts/:pid/childs", (req, res) => {
  const discussion = ObjectId(req.params.did);
  const post = ObjectId(req.params.pid);

  Post.findOne({ _id: post, discussion })
    .then(post => {
      console.log(post);
      if (post === null) {
        res.status(404).json({
          status: "NOTFOUND",
          message: "No such post or discussion"
        });
      } else {
        return Post.find({ parent: post });
      }
    })
    .then(childs => {
      console.log(childs);
      res.status(200).json({
        count: childs.length,
        childs
      });
    })
    .catch(error => {
      console.log(err);
      res.status(500).json({
        error
      });
    });
});

router.post("/discussions/:did/posts/:pid/childs", (req, res) => {
  const discussion = ObjectId(req.params.did);
  const thisPost = ObjectId(req.params.pid);

  Post.findOne({ _id: thisPost, discussion })
    .then(post => {
      console.log(post);
      if (post === null) {
        res.status(404).json({
          status: "NOTFOUND",
          message: "No such post or discussion"
        });
      } else {
        return post.addNewChild({
          title: req.body.title,
          content: req.body.content,
          discussion,
          author: `test-user-${Math.floor(Math.random() * 10)}`
        });
      }
    })
    .then(child => {
      console.log(child);
      res.status(200).json({
        status: "OK",
        child
      });
    })
    .catch(error => {
      console.log(err);
      res.status(500).json({
        error
      });
    });
});

module.exports = router;
