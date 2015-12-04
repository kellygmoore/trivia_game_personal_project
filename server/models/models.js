var UserMeta = require('./User.js'),
    connection = require('../modules/sequelize.js');

var User = connection.define('users', UserMeta.attributes, UserMeta.options);

console.log("In models/models.js");
// you can define relationships here

module.exports.User = User;