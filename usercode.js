const getJwt = require("./get_jwt.js");

module.exports = (data) => {
  return getJwt(data);
};
