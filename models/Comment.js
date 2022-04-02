const {
    Schema,
    model
} = require("mongoose");

const commentSchema = new Schema({
    description: String,
    post: [{
        type: Schema.Types.ObjectId,
        ref: "Post"
    }],
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
}, {
    timestamps: true
});




module.exports = model("Comment", commentSchema);