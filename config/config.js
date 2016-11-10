var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'subscriber-ws'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/subscriber-ws-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'subscriber-ws'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/subscriber-ws-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'subscriber-ws'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/subscriber-ws-production'
  }
};

module.exports = config[env];
