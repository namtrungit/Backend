/**
 * Reportdetails.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    rd_id: {
      type: 'integer',
      primaryKey: true,
      autoIncrement: true
    },
    rd_report_id: {
      type: 'string',
      size: 20
    },
    rd_rule_id: {
      type: 'integer'
    },
    rd_content: {
      type: 'string',
      size: 100
    }
  }
};

