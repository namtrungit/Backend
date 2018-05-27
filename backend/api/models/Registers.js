/**
 * Registers.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    register_id: {
      type: 'integer',
      autoIncrement: true,
      primaryKey: true
    },
    register_id_school: {
      type: 'integer',
    },
    register_content: {
      type: 'string',
      size: 200,
    },
    register_status: {
      type: 'string',
      enum: ['enable', 'disable']
    }
  }
};

