const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');


const ContactSchema = new mongoose.Schema({ 
    nome: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
 });

ContactSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Contact', ContactSchema);
