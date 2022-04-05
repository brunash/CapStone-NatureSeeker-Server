const cloudinary = require('cloudinary').v2;
const {
    CloudinaryStorage
} = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
    cloud_name: 'dbsbca5mh',
    api_key: '748767938163922',
    api_secret: '_XMeGNN5DQJhHJyu4g3MDzcTvpE'
});

const storage = new CloudinaryStorage({
    cloudinary,
    folder: 'natureSeeker', 
    allowedFormats: ['jpg', 'png'],
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

module.exports = multer({
    storage
})
