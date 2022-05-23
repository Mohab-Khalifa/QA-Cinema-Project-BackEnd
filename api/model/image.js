var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const ImageSchema = new Schema({
    name : String, 
    image : {
        date : {
            type : Buffer
        },
        contentType : {
            type : String
        }
    }
});

Image = mongoose.model('Image', ImageSchema);

module.exports = Image;