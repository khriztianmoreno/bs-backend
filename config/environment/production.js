/**
 * Production specific configuration
 * @author: Cristian Moreno Zulauaga <khriztianmoreno@gmail.com>
 */

module.exports = {
  // Server IP
  ip: process.env.IP || undefined,

  // Server port
  port: process.env.PORT || 3030,

  // MongoDB connection options
  mongo: {
    uri: process.env.MONGODB_URI,
  },
}
