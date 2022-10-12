const mysqlService = require("../services/mysql");
const logger = require("../utils/logger");
const { errors } = require("../config");
const {
  saveBase64AsImage,
  generateImageName,
  getImageDir,
  getImageUrl,
} = require("../utils/img");

/**
 * POST Action
 * @param {*} req
 * @param {*} res
 */
const createUserProfile = (req, res) => {
  const { userPushId, fullName, phoneNumber, userName, email } = req.body;

  if (userPushId == undefined || userPushId == null) {
    userPushId = "";
  }

  mysqlService
    .createUserProfile(userPushId, fullName, phoneNumber, userName, email)
    .then(
      (resolve) => {
        switch (resolve.code) {
          case errors.INVALID_NAME:
            res
              .status(400)
              .send({ error: errors.INVALID_NAME, message: resolve.message });
            break;
          case errors.INVALID_EMAIL:
            res
              .status(400)
              .send({ error: errors.INVALID_EMAIL, message: resolve.message });
            break;
          case "OK":
            res.send({ success: resolve.code, message: resolve.message });
            logger.info(`Registro: ${userName} ==> ${JSON.stringify(resolve)}`);
            break;
          default:
            logger.warn("Codigo de respuesta inesperado: ", resolve);
            res.status(500).send({
              error: errors.DB_ERROR,
              message: "Error interno, no se pudo registrar usuario.",
            });
            break;
        }
      },
      (reject) => {
        logger.error("No se pudo crear usuario. ", reject);
        res.status(500).send({
          error: errors.DB_ERROR,
          message: "Error interno, no se pudo registrar usuario.",
        });
      }
    );
};

/**
 * POST Action
 * @param {*} req
 * @param {*} res
 */
const updateUserPicture = async (req, res) => {
  const {
    userId,
    pic,
  } = req.body;


  // Guardando imagen
  if (!pic.length === 0) {
    
  }
  let imageName = generateImageName(userId.toString());
  let imageUrl = getImageUrl(imageName);
  let imageDir = getImageDir();

  try {
    await saveBase64AsImage(imageDir, imageName, pic);
  } catch (ex) {
    logger.error("No se pudo guardar imagen. ", ex);
    // res.status(500).send({
    //   error: errors.DB_ERROR,
    //   message: "Error interno, no se pudo actualizar.",
    // });
    // return;
    imageUrl = pic;
  }

  // Actualizando informacion en base de datos
  mysqlService
    .updateUserProfile(
      userId,
      imageUrl,
    )
    .then(
      (resolve) => {
        switch (resolve.code) {
          case "OK":
            res.send({ success: resolve.code, message: resolve.message });
            logger.info(
              `Actualizando: ${userId} ==> ${JSON.stringify(resolve)}`
            );
            break;
          default:
            logger.warn("Codigo de respuesta inesperado: ", resolve);
            res.status(500).send({
              error: errors.DB_ERROR,
              message: "Error interno, no se pudo actualizar.",
            });
            break;
        }
      },
      (reject) => {
        logger.error("No se pudo actualizar. ", reject);
        res.status(500).send({
          error: errors.DB_ERROR,
          message: "Error interno, no se pudo actualizar.",
        });
      }
    );
};

/**
 * POST Action
 * @param {*} req
 * @param {*} res
 */
const getUserProfile = (req, res) => {
  const { userEmail } = req.body;

  mysqlService.getUserProfile(userEmail).then(
    (resolve) => {
      // Verificando que se haya encontrado el usuario
      if (resolve.length < 1) {
        res.status(400).send({
          error: errors.INVALID_USER,
          message: "Id de usuario no encontrado. No se pudo obtener usuario.",
        });
        return;
      }

      const value = resolve[0];

      res.send({
        success: "OK",
        message: "Usuario encontrado.",
        value,
      });
    },
    (reject) => {
      logger.error("No se pudo obtener usuario. ", reject);
      res.status(500).send({
        error: errors.DB_ERROR,
        message: "Error interno, no se pudo obtener usuario.",
      });
    }
  );
};

/**
 * POST Action
 * @param {*} req
 * @param {*} res
 */
const checkUserName = (req, res) => {
  const { userName } = req.body;

  mysqlService.checkUserName(userName).then(
    (resolve) => {
      // Verificando que se haya encontrado el usuario
      if (resolve.length < 1) {
        res.status(400).send({
          error: errors.INVALID_USER,
          message: "Id de usuario no encontrado. No se pudo validar el nombre.",
        });
        return;
      }

      const value = resolve;

      res.send({
        success: "OK",
        message: "Nombre consultado.",
        value: isAvailable,
      });
    },
    (reject) => {
      logger.error("No se pudo validar nombre. ", reject);
      res.status(500).send({
        error: errors.DB_ERROR,
        message: "Error interno, no se pudo validar el nombre.",
      });
    }
  );
};

/**
 * POST Action
 * @param {*} req
 * @param {*} res
 */
const getUsers = (req, res) => {
  const { userName, startRange, endRange } = req.body;

  mysqlService.getUsers(userName, startRange, endRange).then(
    (resolve) => {
      const value = resolve;

      res.send({
        success: "OK",
        message: "Usuarios consultados.",
        value,
      });
    },
    (reject) => {
      logger.error("No se pudo consultar usuarios. ", reject);
      res.status(500).send({
        error: errors.DB_ERROR,
        message: "Error interno, no se pudo consultar usuarios.",
      });
    }
  );
};



/**
 * POST Action
 * @param {*} req
 * @param {*} res
 */
const deleteUserProfile = (req, res) => {
  const { userId, userName } = req.body;

  mysqlService.deleteUserProfile(userId, userName).then(
    (resolve) => {
      switch (resolve.code) {
        case errors.INVALID_USER:
          res
            .status(400)
            .send({ success: resolve.code, message: resolve.message });
          break;
        case errors.INVALID_USER_NAME:
          res
            .status(400)
            .send({ success: resolve.code, message: resolve.message });
          break;
        case "OK":
          res.send({ success: resolve.code, message: resolve.message });
          logger.info(`Eliminando: ${userId} ==> ${JSON.stringify(resolve)}`);
          break;
        default:
          logger.warn("Codigo de respuesta inesperado: ", resolve);
          res.status(500).send({
            error: errors.DB_ERROR,
            message: "Error interno, no se pudo eliminar la cuenta.",
          });
          break;
      }
    },
    (reject) => {
      logger.error("No se pudo consultar amigos. ", reject);
      res.status(500).send({
        error: errors.DB_ERROR,
        message: "Error interno, no se pudo consultar amigos.",
      });
    }
  );
};

module.exports = {
  createUserProfile,
  updateUserPicture,
  getUserProfile,
  checkUserName,
  getUsers,
  deleteUserProfile,
};
