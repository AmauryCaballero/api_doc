const admin = require("firebase-admin");
const jsonwebtoken = require("jsonwebtoken");
const fetch = require("node-fetch");

const serviceAccount = require("./chat-doc-ad4f9-firebase-adminsdk-6v0zn-1d91678310");

const { GOOGLE_APIS_CERT_URL } = require("../config");

admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });

const getPublicFirebaseCert = async () => {
  return await fetch(GOOGLE_APIS_CERT_URL).then(response => response.json()).catch(ex => false);
};

/**
 * Verifica token con SDK de Firebase. Las llamadas a este recurso tardan más.
 * @param {String}
 * @returns Async function
 */
const verifyTokenIdWithFireabase = (idToken) =>
  admin
    .auth()
    .verifyIdToken(idToken)
    .then((decodedIdToken) => decodedIdToken);

/**
 * Verifica token de Firebase con librería interna.
 * @param {String}
 * @returns Async function
 */
const verifyIdToken = (idToken) =>
  new Promise(async (resolve, reject) => {
    const decodedIdToken = jsonwebtoken.decode(idToken, { complete: true });
    const publicCert = await getPublicFirebaseCert().catch(ex => { reject(ex) });
    const cert = publicCert[decodedIdToken.header.kid];

    jsonwebtoken.verify(
      idToken,
      cert,
      { algorithms: ["RS256"] },
      (err, payload) => {
        if (err) {
          reject(err);
        }
        resolve(payload);
      }
    );
  });

module.exports = { admin, getPublicFirebaseCert, verifyTokenIdWithFireabase, verifyIdToken };
