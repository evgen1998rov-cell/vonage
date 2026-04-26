const { tokenGenerate } = require("@vonage/jwt");

module.exports = (data) => {
  if (!data.vonageApplicationId) {
    data.jwt_error = "Missing data.vonageApplicationId";
    return data;
  }

  if (!data.vonagePrivateKey) {
    data.jwt_error = "Missing data.vonagePrivateKey";
    return data;
  }

  try {
    const privateKey = String(data.vonagePrivateKey).replace(/\\n/g, "\n");

    const jwt = tokenGenerate(data.vonageApplicationId, privateKey, {
      exp: Math.floor(Date.now() / 1000) + 60 * 15
    });

    data.token = "Bearer " + jwt;
    data.jwt_error = null;

    return data;
  } catch (error) {
    data.jwt_error = error.message || String(error);
    return data;
  }
};
