/**
 * Rules.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    rule_id: {
      type: 'integer',
      autoIncrement: true,
      primaryKey: true
    },
    rule_name: {
      type: 'string',
      size: 20
    },
    rule_content: {
      type: 'string'
    }
  }
};

