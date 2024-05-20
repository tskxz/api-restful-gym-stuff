const models = require('../models')
const Instructor = models.Instructor

const create = async(req, res) => {
    const data = req.body
    const instructor = await Instructor.create(data)
    res.json(instructor)
}

module.exports = {
    create
}