/**
 * Faculty.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    fal_id: {
      type: 'integer',
      primaryKey: true,
      autoIncrement: true
    },
    fal_name:{
      type:'string',
      size: 50,
      unique: true
    }
  }
};

