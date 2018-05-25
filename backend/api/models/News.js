/**
 * News.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    new_id: {
      type: 'integer',
      primaryKey: true,
      autoIncrement: true
    },
    new_title: {
      type: 'string',
      size: 50
    },
    new_content: {
      type: 'text'
    },
    new_picture: {
      type: 'string'
    },
    new_creater: {
      type:'string',
      size: 30
    }
  }
};

