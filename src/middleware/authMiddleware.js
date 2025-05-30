require("dotenv").config();

const authenticate = {
  keys: process.env.JWT_SECRET, // contoh: 'rahasia_super_aman'
  verify: {
    aud: false,
    iss: false,
    sub: false,
    nbf: true,
    exp: true,
  },
  validate: async (artifacts, request, h) => {
    // artifacts.decoded.payload -> isi token
    const user = artifacts.decoded.payload;
    return {
      isValid: true,
      credentials: user,
    };
  },
};

module.exports = authenticate;
