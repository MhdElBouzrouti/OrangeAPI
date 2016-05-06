/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    sub:{
      type:'string'
    },
    exp:{
      type:'string'
    },
    auth_time:{
      type:'string'
    },
    aud:{
      type:'string'
    }

  }
};

