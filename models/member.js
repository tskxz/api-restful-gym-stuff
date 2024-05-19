'use strict';
const bcrypt = require('bcrypt')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Member extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    validPassword(password){
      return bcrypt.compareSync(password, this.password)
    }
  }
  Member.init({
    username: DataTypes.STRING,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    phone_num: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: (member) => {
        const salt = bcrypt.genSaltSync();
        member.password = bcrypt.hashSync(member.password, salt)
      },
      
      beforeUpdate: (member) => {
        const salt = bcrypt.genSaltSync();
        member.password = bcrypt.hashSync(member.password, salt)
      }
    },
    sequelize,
    modelName: 'Member',
  });
  return Member;
};