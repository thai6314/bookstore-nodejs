const Account = require("../model/user/account");
const { createToken } = require("../utils/jwt");
const { generatePassword } = require("../utils/hashPassword");
module.exports = {
  async login(req, res, next) {
    try {
      const { username, password } = req.body;

      const isUser = await Account.findOne({ username: username });
      console.log(isUser);
      if (!isUser) {
        res.status(403).json({ message: "Username or password is invalid" });
      } else {
        if (!generatePassword(password, isUser.password)) {
          res.status(403).json({ message: "Username or password is invalid" });
        } else {
          const accessToken = createToken({
            account: isUser,
          });
          const user = await Account.findOne(
            { username: username },
            "-password -__v"
          )
            .populate("user", "-__v -_id")
            .populate("role", "-_id -__v");

          res.header("authorization", accessToken);
          return res.status(200).json({
            message: "Login successful",
            access_token: accessToken,
            user: user,
          });
        }
      }
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },
};
