module.exports = function (grunt) {
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-connect-proxy');

  grunt.initConfig({
    connect: {
      options: {
        port: 9000,
        hostname: 'localhost',
        base: 'static',
        logger: 'dev',
        keepalive: true,
        middleware: function (connect, options) {
          console.log('hi');
          var config = [
            // Serve static files
            connect.static(options.base),
            // Make empty directories browsable
            connect.directory(options.base)
          ];
          var proxy = require('grunt-connect-proxy/lib/utils').proxyRequest;
          config.unshift(proxy);
          return config;
        }
      },
      proxies: [
        {
        context: '/api',
        host: 'localhost',
        port: 1337,
        https: false,
        changeOrigin: false,
        xforward: false
      }
      ]
    }
  });

  grunt.registerTask('server', function() {
    grunt.task.run([
      'configureProxies',
      'connect'
    ]);
  });

  grunt.registerTask('default', []);

};
