/**
 * Managers.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    manager_id: {
      type:'integer',
      primaryKey: true,
      autoIncrement: true
    },
    manager_email: {
      type: 'string',
      unique:true,
      size:50
    },
    manager_name :{
      type:'string',
      size:50
    },
    manager_birthday: {
      type:'date',
    },
    manager_phone:{
      type:'string',
      size:15
    },

  }
};

