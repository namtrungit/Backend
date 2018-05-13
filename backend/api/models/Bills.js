/**
 * Bills.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    bill_id: {
      type: 'string',
      size: 20,
      primaryKey : true
    },
    bill_stu_id: {
      type: 'integer'
    },
    bill_create_name: {
      type: 'string',
      size:30
    }
  }
};

