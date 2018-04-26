/**
 * Feedback.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    feedback_id: {
      type: 'integer',
      primaryKey: true,
      autoIncrement: true
    },
    feedback_status:{
      type:'string',
      size:50
    },
    feedback_message: {
      type:'string',
      size: 1000
    },
    stu_id : {
      model:'students'
    }
  }
};

