module.exports = {
  apps: [
    {
      name: "itetbd",
      script: "server.js",
      instances: "max",          // Use all available CPU cores
      exec_mode: "cluster",      // Enable cluster mode
      autorestart: true,
      watch: false,
      max_memory_restart: "512M",
      env: {
        NODE_ENV: "development",
        PORT: 3000,
      },
      env_production: {
        NODE_ENV: "production",
        PORT: 3000,
      },
      error_file: "./logs/err.log",
      out_file: "./logs/out.log",
      log_date_format: "YYYY-MM-DD HH:mm:ss",
    },
  ],
};
