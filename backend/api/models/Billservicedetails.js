/**
 * Billservicedetails.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    bs_id: {
      type: 'integer',
      autoIncrement: true,
      primaryKey: true
    },
    bs_bill_id: {
      type: 'string',
      size: 20
    },
    bs_service_id: {
      type: 'integer'
    },
    bs_count: {
      type: 'integer'
    },
    bs_service_price: {
      type: 'integer'
    }
  }
};

