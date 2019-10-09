const mongoose = require ('mongoose');

const Lend = mongoose.model('Lend');

module.exports = {
    async index(req, res) {
        const { page = 1 } = req.query;
        const lends = await Lend.paginate({}, { page, limit: 10 });


        return res.json(lends);
    },
    async show(req, res) {
        const lend = await Lend.findById(req.params.id);

        return res.json(lend);
    },

    async things(req, res) {
        const lend = await Lend.create(req.body);

        return res.json(lend);
    },

    async update(req, res) {
        const lend = await Lend.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true });
    
        return res.json(lend);
    },

    async destroy(req, res) {
        await Lend.findByIdAndRemove(req.params.id);

        return res.send();
    }
};