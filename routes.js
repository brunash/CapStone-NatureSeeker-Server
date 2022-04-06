const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const Post = require('./models/Post')
const User = require("./models/User");
const Comment = require("./models/Comment");
const uploader = require("./configs/cloudinary-setup.config");
const { Mongoose
} = require("mongoose");


router.post("/upload", uploader.single("image"), (req, res, next) => {
    console.log("file is: ", req.file);
    if (!req.file) {
        next(new Error("No file uploaded!"));
        return;
    }
    console.log(req.file.path);
    res.json({
        secure_url: req.file.path
    });
});


router.get("/", (req, res) => {
    res.json({
        serverWorking: true
    });
});

router.get("/get-the-user", authorize, async (req, res) => {
    let user = await User.findById(res.locals.user._id);
    res.json(user);
});

router.post("/comments", authorize, (req, res) => {
    console.log(req.body);
    Comment.create({
            description: req.body.description,
            post: req.body.postId,
            userId: res.locals.user._id,
        })
        .then((response) => {
            return Post.findByIdAndUpdate(req.body.postId, {
                $push: {
                    comments: response._id
                },
            });
        })
        .then((theResponse) => {
            console.log(theResponse);
            res.json(theResponse);
        });
});

router.post("/add-post", authorize, (req, res) => {
    let {
        title,
        description,
        image,
        comments,
        userId
    } = req.body;

    Post.create({
        title,
        description,
        image,
        comments,
        userId: res.locals.user._id,
    }).then((post) => {
        console.log(post);
        res.json(post);
    });
});

router.get("/all-the-posts", (req, res) => {
    Post.find()
        .populate("userId")
        .populate("comments")
        .then((posts) => {
            res.json(posts);
        });
});

router.put("/all-the-posts/:id", authorize, (req, res) => {
    Post.findByIdAndUpdate(req.params.id, req.body)
        .then(() => {
            res.json({
                message: `Post with ${req.params.id} is updated successfully.`,
            });
        })
        .catch((error) => res.json(error));
});

router.delete("/all-the-posts/:id", authorize, (req, res) => {
    Post.findByIdAndRemove(req.params.id).then((response) => {
        res.json(response);
    });
});

router.get("/all-the-posts/:id", (req, res) => {
    Post.findById(req.params.id)
        .populate("comments")
        .populate("userId")
        .populate({
            path: "comments",
            populate: {
                path: "userId"
            }
        })
        .then((post) => {
            res.json(post);
        });
});

router.post("/authenticate", async (req, res) => {
    let user = await User.findOne({
        email: req.body?.email
    });

    if (!user) {
        user = await User.create(req.body);
    }

    jwt.sign({
        user
    }, "secret key", {
        expiresIn: "30min"
    }, (err, token) => {
        res.json({
            user,
            token
        });
    });
});

function authorize(req, res, next) {
    let token = req.headers.authorization.split(" ")[1];
    if (token) {
        jwt.verify(token, "secret key", (err, data) => {
            if (!err) {
                res.locals.user = data.user;
                next();
            } else {
                res.json({
                    message: err
                });
            }
        });
    } else {
        res.json({
            message: "Must be logged in!"
        });
    }
}

module.exports = router;