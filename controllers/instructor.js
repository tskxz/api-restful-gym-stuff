const models = require('../models')
const Instructor = models.Instructor

const create = async(req, res) => {
    const data = req.body
    const instructor = await Instructor.create(data)
    res.json(instructor)
}

const read = async(req, res) => {
    const instructors = await Instructor.findAll()
    res.json(instructors)
}

const update = async(req, res) => {
    const id = req.params.id
    const data = req.body
    await Instructor.update(data, {where: {id: id}, individualHooks: true});
    const instructor = await Instructor.findOne({where: {id: req.params.id}})
    res.json(instructor)
}

const deleteInstructor = async(req, res) => {
    await Instructor.destroy({where: {id: req.params.id}})
    res.json({message: 'Member deleted successfully.'})

}

module.exports = {
    create,
    read,
    update,
    deleteInstructor
}