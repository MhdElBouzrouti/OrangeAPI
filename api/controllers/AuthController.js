/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var request = require('request');
module.exports = {
  authorization: function (req, res) {
    // Authorization
    var authorization = {
      code: req.allParams().code,
      scope: req.allParams().scope,
      state: req.allParams().state
    };
    sails.log.info('Authorization Code : ' + authorization.code + ' | ' + ' Scope : ' + authorization.scope + ' | State : ' + authorization.state);
    // data
    var data = 'code=' + authorization.code + '&' + 'redirect_uri=' + ConfigService.REDIRECT_URI + '&' + 'grant_type=authorization_code';

    // Step 1. Exchange authorization code for access token.
    request({
      method: 'POST',
      url: ConfigService.ACCESS_TOKEN_URL,
      headers: {'Authorization': ConfigService.AUTHORIZATION_HEADER},
      form: data
    }, function (err, response) {
      if (err) {
        sails.log.error(err);
        return res.json(500,{error:'error'});
      }
      var token = JSON.parse(response.body);
      if(token.error)
      {
        return res.json(400,token);
      }
      var accessToken = token.access_token;
      sails.log.debug(token);
      var user_identity = JSON.parse(new Buffer((token.id_token.split('.')[1]), 'base64').toString('ascii'));
      sails.log.debug(user_identity);
      // sails.log.info('Access Token : '+accessToken + '| Id Token : ' + token.id_token );
      var headers = {Authorization: 'Bearer ' + accessToken};
      var user_name="";
      // Step 2. Retrieve profile information about the current user.
      request.get({url: ConfigService.USER_INFO_URL, headers: headers}, function (err, response) {
        if (err) {
          sails.log.debug(response.body);
          return res.json(500, {message: ''});
        }
        if (response.body.error) {
          return res.json(500,response.body.error);
        }
        user_name=response.body.name;

        // Step 3a. Link user accounts.
        if (req.header('Authorization')) {
          User.findOne({sub: user_identity.sub}, function (err, existingUser) {
            if (existingUser) {
              return res.status(409).send({message: 'There is already a Orange account that belongs to you'});
            }
            var token_jwt = req.header('Authorization').split(' ')[1];
            var payload = jwt.decode(token_jwt, config.TOKEN_SECRET);
            User.findOne({sub: payload.sub}, function (err, user) {
              if (!user) {
                return res.status(400).send({message: 'User not found'});
              }
              user.sub = user_identity.sub;
              User.create(user).exec();
              res.send({token: token_jwt});
            });
          });
        } else {
          // Step 3b. Create a new user account or return an existing one.
          User.findOne({sub: user_identity.sub}, function (err, existingUser) {
            if (existingUser) {
              existingUser.exp = user_identity.exp;
              existingUser.auth_time = user_identity.auth_time;
              existingUser.iat = user_identity.iat;
              existingUser.aud = user_identity.aud[0];
              existingUser.name=user_name;
              existingUser.auth_code=authorization.code;
              existingUser.access_token=token.access_token;
              existingUser.iss=user_identity.iss;
              existingUser.scope=token.scope;
              existingUser.save(function (err, s) {
                return res.json({token: token.id_token});
              });
            } else {
              var user = {};
              user.sub = user_identity.sub;
              user.scope=user_identity.scope;
              user.iat = user_identity.iat;
              user.auth_time = user_identity.auth_time;
              user.name=user_name;
              user.exp = user_identity.exp;
              user.access_token = user_identity.access_token;
              user.auth_code=authorization.code;
              user.iss=user_identity.iss;
              user.aud = user_identity.aud[0];
              User.create(user).exec(function (err, user) {
                if (err)
                  return res.json(500, err);
                if (user)
                  res.json({token: token.id_token});
                if(!user)
                  res.json(500,{error:'error'});
              });
            }
          });
        }
      });
    });
  },
  index:function (req, res) {
    return res.json({title:'API OIDC',description:'',version:'0.1'});
  }

};

