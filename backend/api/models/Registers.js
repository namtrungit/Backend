/**
 * Registers.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    register_id: {
      type: 'integer',
      autoIncrement: true,
      primaryKey: true
    },
    register_id_school: {
      type: 'integer',
    },
    register_name: {
      type: 'string',
      size: 50
    },
    register_sex: {
      type: 'string',
      enum: ['male', 'female']
    },
    register_birthday: {
      type: 'date'
    },
    register_class: {
      type: 'string',
      size: 20
    },
    register_faculty: {
      type: 'string',
      size: 30
    },
    register_phone: {
      type: 'string',
      size: 15
    },
    register_mail: {
      type: 'string',
      size: 50
    },
    register_status: {
      type: 'string',
      enum: ['enable', 'disable']
    }
  }
};

