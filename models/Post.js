const {Schema,model} = require("mongoose");

const postSchema = new Schema({
    title: String,
    description: String,
    image: String,
    comments: [{
        type: Schema.Types.ObjectId,
        ref: "Comment"
    }],
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
}, {
    timestamps: true
});




module.exports = model("Post", postSchema);
