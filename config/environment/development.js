/**
 * Development specific configuration
 * @author: Cristian Moreno Zulauaga <khriztianmoreno@gmail.com>
 */

module.exports = {
  // MongoDB connection options
  mongo: {
    uri:
      process.env.MONGODB_URI ||
      'mongodb://localhost/bunny-studio-challenge-dev',
    db: process.env.MONGODB_NAME || 'bunny-studio-challenge-dev',
  },

  // Seed database on startup
  seedDB: false,
}
