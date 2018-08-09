/**
 * Contracts.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    contract_id: {
      type: 'string',
      primaryKey: true,
      size:20
    },
    contract_date_get_room: {
      type: 'date'
    },
    contract_date_end: {
      type: 'date'
    },
    contract_room_name: {
      type: 'string',
      size: 20,
    },
    contract_id_stu_school: {
      type: 'integer'
    },
    contract_id_recontract: {
      type: 'integer'
    },
    contract_create: {
      type:'string',
      size:30
    },
    contract_total: {
      type: 'integer'
    },
    contract_status:{
      type:'string',
      enum: ['enable', 'disable'],
      size: 10
    }
  }
};

