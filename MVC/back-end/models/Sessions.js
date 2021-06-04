	
  const Sequelize = require('sequelize');
 
  const sequelize = require('../utils/sequelize-singleton');
 
  const mappings = {
    sid: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    expires: Sequelize.DATE,
    data: Sequelize.STRING(50000),
  };
 
  const Session = sequelize.define('Sessions', mappings, { //Sessions
    indexes: [
      {
        name: 'session_sid_index',
        method: 'BTREE',
        fields: ['sid'],
      },
    ],
  });
 
  exports.getMapping = () => mappings;
 
  exports.getModel = () => Session;