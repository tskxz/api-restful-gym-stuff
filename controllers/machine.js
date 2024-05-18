const models = require('../models');
const Machine = models.Machine

const create = async(req, res) => {
    const data = req.body;
    const machine = await Machine.create(data);
    res.json(machine);
}

module.exports = {
    create
}