const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const LendSchema = new mongoose.Schema({
    item: {
        type: String,
        required: true,
    },
    contact: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Contact',
        require: true
    },
    datelend: {
        type: Date,
        required: true,
    },
    daterefund: {
        type: Date,
    },
    completed: {
        type: Boolean,
        require: true,
        default: false,
    },
});

LendSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Lend', LendSchema);