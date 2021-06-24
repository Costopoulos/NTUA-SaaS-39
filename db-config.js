module.exports = {
    "development": {
      "username": process.env.DATABASE_USERNAME,
      "password": process.env.DATABASE_PASSWORD,
      "database": process.env.DATABASE_NAME,
      "host": process.env.DATABASE_HOST,
      "port": process.env.DATABASE_PORT,
      "dialect": "postgres",
      "operatorsAliases": false
    },
    "production": {
      "use_env_variable": "DATABASE_URL",
      "dialect": "postgres",
      "operatorsAliases": false
    }
  }