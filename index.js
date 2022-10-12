const { admin } = require("./firebase/firebase.utils");
const logger = require("./utils/logger");
const app = require("./app");

const { PORT } = require("./config");

app.listen(PORT, () => logger.info(`✅ API iniciada en el puerto: ${PORT}`));