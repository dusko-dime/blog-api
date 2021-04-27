const AuthModule = require('./auth/authModule');
const { createApplication } = require('graphql-modules');

const application = createApplication({
    modules: [AuthModule],
});

module.exports = application;