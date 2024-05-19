const models = require('../models');
const Machine = models.Machine

const create = async(req, res) => {
    const data = req.body;
    const machine = await Machine.create(data);
    res.json(machine);
}

const view = async(req, res) => {
    const machines = await Machine.findAll();
    res.json(machines);
}

const update = async(req, res) => {
    const data = req.body;
    await Machine.update({
        name: data.name,
        description: data.description,
        status: data.status
    }, {where: {id: req.params.id}})
    const machine_updated = await Machine.findOne({where: {id: req.params.id}})
    res.json(machine_updated);
}

module.exports = {
    create,
    view,
    update
}