const { verifyToken } = require("../utils/jwt");
const Account = require("../model/user/account");
module.exports = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      res.status(500).json({
        error: "Unauthorized",
      });
    }
    if (token.includes("EAA")) {
      next();
    } else {
      let decoded;
      try {
        decoded = verifyToken(token);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
      const account = await Account.findById(decoded.account._id);
      if (!account) {
        res.json({ error: "Unauthorization" });
      }
      next();
    }
  } catch (error) {
    res.json({ error: error.message });
  }
};
