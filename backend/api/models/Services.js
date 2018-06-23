/**
 * Services.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    service_id: {
      type: 'integer',
      primaryKey: true,
      autoIncrement: true
    },
    service_name: {
      type: 'string',
      size: 50
    },
    service_price: {
      type: 'integer',
    },
    service_content: {
      type: 'string',
      size: 200
    },
    service_unit: {
      type: 'string',
      size: 20
    }
  }
};

