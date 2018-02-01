const Sequelize = require('sequelize');
const db = require('../db');

const GroupMembers = db.define('groupMembers', {
  latitude: {
    type: Sequelize.STRING,
    defaultValue: null
  },
  longitude: {
    type: Sequelize.STRING,
    defaultValue: null
  }
})

module.exports = GroupMembers;