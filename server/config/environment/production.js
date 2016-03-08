'use strict';

/**
 * Set the 'production' environment configuration object
 * @link http://docs.mongolab.com/migrating/
 */

module.exports = {
    db: process.env.MONGOLAB_URI,
    dir: 'client',
    deleteToken: process.env.DELETE_TOKEN
};