'use strict';

/**
 * query service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::query.query');
