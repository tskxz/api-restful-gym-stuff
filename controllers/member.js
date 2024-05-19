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

module.exports = {
    create,
    checkCredentials
}