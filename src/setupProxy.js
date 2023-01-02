const { createProxyMiddleware } = require('http-proxy-middleware')
 
module.exports = function(app) {
  app.use('/scraper', createProxyMiddleware({ target: 'http://localhost:4000/' }));
  app.use('/api', createProxyMiddleware({ target: 'http://localhost:5000/' }))
}