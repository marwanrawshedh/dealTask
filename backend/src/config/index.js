const config = {
  app: {
    name: process.env.DB_NAME,
    port: process.env.PORT,
  },
  databases: {
    mysql: {
      database: process.env.DB_NAME,
      host: process.env.DB_HOST,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      dialect: process.env.DIALECT,
    },
  },
  jwt: {
    tokenExpiration: process.env.TOKEN_EXPIRATION,
    secret: process.env.SECRET,
  },
  bcrypt: {
    salt: process.env.SALT,
  },
  portal: {
    url: process.env.PORTAL_URL,
  },
};

module.exports = config;
