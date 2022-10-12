require("dotenv").config({ path: "/root/.env" });

module.exports = {
  HOST: process.env.NODEJS_HOST ? process.env.NODEJS_HOST : "localhost",
  PORT: process.env.PORT ? process.env.PORT : 3000,
  MYSQL_CONFIG: {
    host: process.env.MYSQL_HOST ? process.env.MYSQL_HOST : "localhost",
    user: process.env.MYSQL_USER ? process.env.MYSQL_USER : "api-doc",
    database: process.env.MYSQL_DATABASE
      ? process.env.MYSQL_DATABASE
      : "api-doc",
    password: process.env.MYSQL_PASSWORD
      ? process.env.MYSQL_PASSWORD
      : "19191919",
    dateStrings: true,
  },
  PROFILES_IMAGE_URL: "/img/profiles/",
  PROFILES_IMAGE_DIR: "/public/img/profiles",
  errors: {
    INVALID_AUTH: "INVALID AUTH",
    INVALID_PARAM: "INVALID PARAM",
    INVALID_NAME: "INVALID NAME",
    INVALID_EMAIL: "INVALID EMAIL",
    INVALID_USER_ID: "INVALID USER ID",
    INVALID_USER_NAME: "INVALID USER NAME",
    INVALID_FRIEND_USER_ID: "INVALID FRIEND USER ID",
    INVALID_REL_ID: "INVALID REL ID",
    INVALID_USER: "INVALID USER",
    DB_ERROR: "DB ERROR",
  },
  GOOGLE_APIS_CERT_URL: "https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com"
};
