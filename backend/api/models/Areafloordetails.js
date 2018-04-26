/**
 * Areafloordetails.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    af_id: {
      type:'integer',
      primaryKey: true,
      autoIncrement: true
    },
    af_area_id: {
      type: 'integer'
    },
    af_floor_id: {
      type: 'integer'
    },
    af_price: {
      type: 'integer'
    }
  }
};

