'use strict';
const models = require('../models')
const Member = models.Member
const Instructor = models.Instructor
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MemberInstructor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  MemberInstructor.init({
    idMember: {type: DataTypes.INTEGER, references: {model: Member, key:'id'}},
    idInstructor: {type: DataTypes.INTEGER, references: {model: Instructor, key:'id'}}
  }, {
    sequelize,
    modelName: 'MemberInstructor',
  });
  return MemberInstructor;
};