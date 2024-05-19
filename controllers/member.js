const models = require('../models')
const Member = models.Member

const create = async(req, res) => {
    const data = req.body;
    const member = await Member.create(data);
    res.json(member);
}

module.exports = {
    create
}