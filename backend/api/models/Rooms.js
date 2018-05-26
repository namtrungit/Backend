/**
 * Rooms.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    room_id: {
      type: 'integer',
      primaryKey: true,
      autoIncrement: true
    },
    room_name:{
      type:'string',
      size:20,
      unique: true
    },
    room_max: {
      type: 'integer'
    },
    room_id_area:{
      type: 'integer'
    },
    room_floor: {
      type: 'integer'
    },
    room_price: {
      type: 'integer'
    }
  }
};

