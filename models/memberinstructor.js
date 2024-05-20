'use strict';
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
    idMember: DataTypes.INTEGER,
    idInstructor: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'MemberInstructor',
  });
  return MemberInstructor;
};