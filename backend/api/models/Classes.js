/**
 * Classes.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    class_id:{
      type:'integer',
      primaryKey: true,
      autoIncrement: true
    },
    class_name:{
      type:'string',
      size:20,
      unique: true
    },
    class_id_faculty:{
      type:'integer'
    }
  }
};

