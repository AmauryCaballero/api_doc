const { validationResult, check } = require("express-validator");

const { errors } = require("../config");

const createUserProfileValidator = (req, res, next) => {
  if (!validationResult(req).isEmpty()) {
    res.status(400).send({
      error: errors.INVALID_PARAM,
      message: "Información incompleta. No se pudo crear usuario.",
    });
    return;
  }
  next();
};

const updateUserProfilePicValidator = (req, res, next) => {
  if (!validationResult(req).isEmpty()) {
    res.status(400).send({
      error: errors.INVALID_PARAM,
      message: "Información incompleta. No se pudo actualizar.",
    });
    return;
  }
  next();
};

const getUserProfileValidator = (req, res, next) => {
  if (!validationResult(req).isEmpty()) {
    res.status(400).send({
      error: errors.INVALID_PARAM,
      message: "Información incompleta. No se pudo obtener usuario.",
    });
    return;
  }
  next();
};

const checkUserNameValidator = (req, res, next) => {
  if (!validationResult(req).isEmpty()) {
    res.send({
      error: errors.INVALID_PARAM,
      message: "Información incompleta. No se pudo validar nombre.",
    });
    return;
  }
  next();
};

const getUsersValidator = (req, res, next) => {
  if (!validationResult(req).isEmpty()) {
    res.send({
      error: errors.INVALID_PARAM,
      message: "Información incompleta. No se pudo consultar usuarios.",
    });
    return;
  }
  next();
};

const createUserProfileParams = [
  [
    check("userId").exists().notEmpty(),
    check("userName").exists().notEmpty(),
    check("email").exists().isEmail(),
  ],
];

const getUserProfileParams = [[check("userEmail").exists().isEmail()]];

const checkUserNameParams = [[check("userName").exists().not().isEmail()]];

const getUsersParams = [
  [
    check("userName").exists().not().isEmail(),
    check("startRange").exists().isNumeric().toInt(),
    check("endRange").exists().isNumeric().toInt(),
  ],
];


const updateUserProfilePicParams = [
  [
    check("userId").exists().notEmpty(),
    check("pic").exists().notEmpty(),
  ],
];


module.exports = {
  createUserProfileValidator,
  updateUserProfilePicValidator,
  getUserProfileValidator,
  checkUserNameValidator,
  getUsersValidator,
  createUserProfileParams,
  getUserProfileParams,
  checkUserNameParams,
  getUsersParams,
  updateUserProfilePicParams,
};
