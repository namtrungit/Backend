/**
 * Contractregulations.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    recontract_id: {
      type: 'integer',
      primaryKey: true,
      autoIncrement: true
    },
    recontract_name: {
      type: 'string',
      size:50
    },
    recontract_date: {
      type: 'date',
    },
    recontract_content: {
      type: 'string',
      size:200
    },
    recontract_status: {
      type: 'string',
      size:10,
      enum: ['disable','enable']
    },
    recontract_promotion: {
      type: 'integer',
    },
    recontract_limit: {
      type: 'integer',
    }
  }
};

