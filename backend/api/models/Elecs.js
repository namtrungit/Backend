/**
 * Elecs.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    elec_id: {
      type: 'string',
      size: 20,
      primaryKey: true
    },
    elec_room: {
      type:'string',
      size:10
    },
    elec_month: {
      type: 'string',
      size: 10
    },
    elec_amount: {
      type: 'integer'
    },
    elec_total: {
      type: 'integer'
    },
    elec_creater: {
      type: 'string',
      size: 30
    },
    elec_status: {
      type: 'string',
      size:10,
      enum: ['disable','enable']
    }
  }
};

