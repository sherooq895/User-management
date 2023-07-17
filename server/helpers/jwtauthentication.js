const jwt = require("jsonwebtoken");
const createHttpError = require("http-errors");

module.exports.genjwtToken = (user) => {
  console.log(user,"userrrrnnn");
    return new Promise((resolve, reject) => {
      if (user) {
        resolve(
          jwt.sign({email: user }, process.env.JWT_ACCESS_SCERET_KEY, {
            expiresIn: "1d",
          })
        );
      }
    });
  };