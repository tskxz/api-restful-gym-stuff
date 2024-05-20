const models = require('../models')
const Member = models.Member
const Instructor = models.Instructor
const MemberInstructor = models.MemberInstructor

const create = async(req, res) => {
    const data = req.body
    const memberinstructor = await MemberInstructor.create(data)
    res.json(memberinstructor)
}

const getMemberInstructor = async(req, res) => {
    const memberinstructor = await MemberInstructor.findAll()
    res.json(memberinstructor)
}
module.exports = {create, getMemberInstructor}