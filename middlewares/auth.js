const {
  verifyIdToken
} = require("../firebase/firebase.utils");
const {
  errors
} = require("../config");

const verifyAuthToken = async (req, res, next) => {

  if (!req.headers.token) {
    res.status(401).send({
      error: errors.INVALID_AUTH,
      message: "Sesión de usuario no válida."
    });
    return;
  }

  const token = req.headers.token;

  try {
    await verifyIdToken(token);
  } catch (ex) {
    res.status(401).send({
      error: errors.INVALID_AUTH,
      message: "Sesión de usuario no válida."
    });

    return;
  }

  next();
};

module.exports = {
  verifyAuthToken
};
