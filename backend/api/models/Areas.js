/**
 * Areas.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    area_id: {
      type: 'integer',
      primaryKey: true,
      autoIncrement: true
    },
    area_address: {
      type: 'string',
      size: 100
    },
    area_sympol: {
      type: 'string',
      size: 20
    },
    area_sex: {
      type: 'string',
      size: 10,
      enum: ['male', 'female']
    }
  }
};

