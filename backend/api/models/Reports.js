/**
 * Reports.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    report_id: {
      type: 'string',
      size: 20,
      primaryKey: true
    },
    report_stu_id: {
      type: 'integer'
    },
    report_content: {
      type: 'text'
    },
    report_creater: {
      type: 'string',
      size: 30
    }
  }
};

