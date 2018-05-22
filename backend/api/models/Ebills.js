/**
 * Ebills.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    ebill_id : {
      type:'string',
      size: 20,
      primaryKey: true
    },
    ebill_creater: {
      type:'string',
      size:50
    },
    ebill_elec_id: {
      type:'string',
      size:20
    }
  }
};

