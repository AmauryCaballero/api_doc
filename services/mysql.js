const mysql = require("mysql2");
const { MYSQL_CONFIG } = require("../config");

const localConnection = mysql.createPool(MYSQL_CONFIG);

const createUserProfile = (userName, email, age) =>
  new Promise((resolve, reject) => {
    let query = `CALL spCreateUserProfile(
    ${localConnection.escape(userName)},
    ${localConnection.escape(email)}),
    ${localConnection.escape(age)};`;

    localConnection.execute(query, (err, results) => {
      if (err) {
        reject(err);
        return;
      }

      try {
        resolve(results[0][0]);
      } catch (ex) {
        reject(ex.message);
      }
    });
  });

const getUserProfile = (userEmail) =>
  new Promise((resolve, reject) => {
    let query = `SELECT
    UserId AS userId,
    FullName AS fullName,
    PhoneNumber AS phoneNumber,
    UserName AS userName,
    Email AS email,
    Gender AS gender,
    Pic AS pic,
    Birthdate AS birthdate,
    Latitude AS latitude,
    Longitude AS longitude,
    IsConnected AS isConnected
    FROM UserProfile up WHERE Email = ${localConnection.escape(
      userEmail
    )} LIMIT 1;`;

    localConnection.execute(query, (err, results) => {
      if (err) {
        reject(err);
        return;
      }

      try {
        resolve(results);
      } catch (ex) {
        reject(ex.message);
      }
    });
  });

const checkUserName = (userName) =>
  new Promise((resolve, reject) => {
    let query = `SELECT UserId AS quantity FROM UserProfile up WHERE UserName = ${localConnection.escape(
      userName
    )};`;

    localConnection.execute(query, (err, results) => {
      if (err) {
        reject(err);
        return;
      }

      try {
        isAvailable = false;

        if (results.length < 1) {
          isAvailable = true;
        }

        resolve(isAvailable);
      } catch (ex) {
        reject(ex.message);
      }
    });
  });

/**
 * Consulta de usuarios por nombre.
 * @param {String} userName
 * @param {Number} startRange
 * @param {Number} endRange
 * @returns Array
 */
const getUsers = (userName, startRange, endRange) =>
  new Promise((resolve, reject) => {
    const range = endRange - startRange;

    if (range > 50) endRange = 50;

    let query = 
    `select UserId AS userId, 
    Pic AS pic, 
    Email as email,
    UserName AS userName,
    FROM UserProfile
    WHERE UserName LIKE ${localConnection.escape("%" + userName + "%")}
    LIMIT ${localConnection.escape(startRange)}, ${localConnection.escape(
      endRange
    )};`;

    localConnection.execute(query, (err, results) => {
      if (err) {
        reject(err);
        return;
      }

      try {
        resolve(results);
      } catch (ex) {
        reject(ex.message);
      }
    });
  });


/**
 * Actualiza la informacion del usuario especificado
 * @param  {String} userId
 * @param  {String} picUrl
 * @return Response object
 */
const updateUserPic = (
  userId,
  picUrl,
) =>
  new Promise((resolve, reject) => {
    let query = `CALL spUpdateUserPic (
    ${localConnection.escape(userId)},
    ${localConnection.escape(picUrl)},
    )`;

    localConnection.execute(query, (err, results) => {
      if (err) {
        reject(err);
        return;
      }

      try {
        resolve(results[0][0]);
      } catch (ex) {
        reject(ex.message);
      }
    });
  });

module.exports = {
  localConnection,
  createUserProfile,
  getUserProfile,
  checkUserName,
  getUsers,
  updateUserPic
};
