/**
 * Students.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    stu_id: {
      type:'integer',
      primaryKey: true,
      autoIncrement: true
    },
    stu_id_school: {
      type: 'integer',
    },
    stu_name: {
      type: 'string',
      required: true,
      size: 50
    },
    stu_email: {
      type: 'string',
      required: true,
      size: 50
    },
    stu_sex: {
      type: 'string',
      enum: ['male', 'female'],
      size: 6
    },
    stu_birthday: {
      type: 'date'
    },
    stu_address: {
      type: 'string',
      size: 100
    },
    stu_phone: {
      type: 'string',
      size: 15
    },
    stu_dad_name: {
      type: 'string',
      size: 50
    },
    stu_dad_phone: {
      type: 'string',
      size: 15
    },
    stu_mom_name: {
      type: 'string',
      size: 50
    },
    stu_mom_phone: {
      type: 'string',
      size: 15
    },
    stu_id_class: {
      type: 'integer'
    },
    stu_avatar: {
      type: 'string'
    },
  }
};

