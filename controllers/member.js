const models = require('../models')
const Member = models.Member

const create = async(req, res) => {
    const data = req.body;
    const member = await Member.create(data);
    res.json(member);
}

const checkCredentials = async(req, res) => {
    const data = req.body;
    const member = await Member.findOne({where: {username: data.username}})
    if(!member){
        res.status(404).json({message: 'Member not found'})
    } else if(!member.validPassword(data.password)){
        res.status(401).json({message: 'Invalid password'})
    } else {
        res.json({member})
    }
}

const update = async(req, res) => {
    const id = req.params.id;
    const data = req.body;
    await Member.update(data, {where: {id: id}, individualHooks: true});
    const member = await Member.findOne({where: {id: req.params.id}})
    res.json(member)
}

const getUsers = async(req, res) => {
    const members = await Member.findAll()
    res.json(members)
}

module.exports = {
    create,
    checkCredentials,
    update,
    getUsers
}