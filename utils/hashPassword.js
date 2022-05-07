const bcryptjs = require("bcryptjs");
module.exports = {
  generatePassword(password, passwordDb) {
    return bcryptjs.compareSync(password, passwordDb);
  },
};
