'use strict';

/**
 * Module dependencies
 */
var acl = require('acl');

// Using the memory backend
acl = new acl(new acl.memoryBackend());

/**
 * Invoke Categories Permissions
 */
exports.invokeRolesPolicies = function () {
  acl.allow([{
    roles: ['admin'],
    allows: [{
      resources: '/api/categories',
      permissions: '*'
    }, {
      resources: '/api/categories/:categoryId',
      permissions: '*'
    }, {
      resources: '/api/categories/:categoryId/materials',
      permissions: '*'
    }, {
      resources: '/api/materials/:materialId',
      permissions: '*'
    }]
  }, {
    roles: ['user'],
    allows: [{
      resources: '/api/categories',
      permissions: ['get']
    }, {
      resources: '/api/categories/:categoryId',
      permissions: ['get']
    }, {
      resources: '/api/categories/:categoryId/materials',
      permissions: ['get']
    }, {
      resources: '/api/materials/:materialId',
      permissions: ['get']
    }]
  }, {
    roles: ['guest'],
    allows: [{
      resources: '/api/categories',
      permissions: ['get']
    }, {
      resources: '/api/categories/:categoryId',
      permissions: ['get']
    }]
  }]);
};

/**
 * Check If Categories Policy Allows
 */
exports.isAllowed = function (req, res, next) {
  var roles = (req.user) ? req.user.roles : ['guest'];
  // Check for the roles of the users
  acl.areAnyRolesAllowed(roles, req.route.path, req.method.toLowerCase(), function (err, isAllowed) {
    if (err) {
      // An authorization error occurred
      return res.status(500).send('Unexpected authorization error');
    } else {
      if (isAllowed) {
        // Access granted! Invoke next middleware
        return next();
      } else {
        return res.status(403).json({
          message: 'User is not authorized'
        });
      }
    }
  });
};
