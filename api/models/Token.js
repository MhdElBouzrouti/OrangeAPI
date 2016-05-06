/**
 * Token.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    access_token:{
      type:'string'
    },
    refrech_token:{
      type:'string'
    },
    scope:{
      type:'string'
    }

  }
};

