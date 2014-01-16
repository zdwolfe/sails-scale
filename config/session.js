module.exports.session = {
  secret: '13058ff4b98acdbc01160832ade37dcc',
  adapter: 'redis',
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
};
