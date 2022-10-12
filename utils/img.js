const fs = require("fs");
const { join, resolve } = require("path");
const config = require("../config");

const saveBase64AsImage = (location, name, base64Data) =>
  new Promise((resolve, reject) => {
    const imageDir = join(location, name);
    base64Data = base64Data.split(",")[1];

    fs.writeFile(imageDir, base64Data, "base64", (err) => {
      if (err) reject(err);

      resolve(imageDir);
    });
  });

/**
 * Generar nombre de imagen
 * @param {String} prefix Prefijo para el nombre (limitara a 5)
 * @param {String} extension Tipo de imagen
 * @returns {String} nombre de la imagen
 */
const generateImageName = (prefix = "", extension = ".jpg") =>
  (prefix ? prefix.substring(0, 5) : prefix) +
  "-" +
  parseInt(Math.random() * 1000000000) +
  extension;

const getImageUrl = (imageName) => config.PROFILES_IMAGE_URL + imageName;

const getImageDir = () =>
  join(resolve(__dirname, "../"), config.PROFILES_IMAGE_DIR);

module.exports = {
  saveBase64AsImage,
  generateImageName,
  getImageUrl,
  getImageDir,
};
