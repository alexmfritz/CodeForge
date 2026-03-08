module.exports = {
  apps: [
    {
      name: 'codeforge',
      script: 'server/dist/server.js',
      cwd: __dirname,
      instances: 1,
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'production',
      },
      // Restart on crash
      autorestart: true,
      max_restarts: 10,
      restart_delay: 5000,
      // Memory threshold — restart if exceeds 512 MB
      max_memory_restart: '512M',
      // Logs
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
      error_file: 'logs/codeforge-error.log',
      out_file: 'logs/codeforge-out.log',
      merge_logs: true,
      // Graceful shutdown
      kill_timeout: 10000,
      listen_timeout: 10000,
      shutdown_with_message: true,
    },
  ],
};
