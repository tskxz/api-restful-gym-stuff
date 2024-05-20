'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Instructor extends Model {
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
  Instructor.init({
    username: DataTypes.STRING,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    phone_num: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: (instructor) => {
        const salt = bcrypt.genSalt();
        instructor.password = bcrypt.hashSync(instructor.password, salt);
      },
      beforeUpdate: (instructor) => {
        const salt = bcrypt.genSalt();
        instructor.password = bcrypt.hashSync(instructor.password, salt);
      }
    },
    sequelize,
    modelName: 'Instructor',
  });
  return Instructor;
};