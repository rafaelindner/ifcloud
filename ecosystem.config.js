module.exports = {
  apps: [
    {
      name: 'ifcloud',
      script: 'nodemon',
      args: 'node_src/server.js',
      watch: true,
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
      interpreter: 'node',
    },
  ],
};
