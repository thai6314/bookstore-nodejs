const Address = require("../../model/user/address");
const Role = require("../../model/user/role");
const User = require("../../model/user/User");
const Account = require("../../model/user/account");
const bcryptjs = require("bcryptjs");
const {
  validEmail,
  validPassword,
  isEmptyOrWhiteSpace,
  validTelephone,
} = require("../../utils/validation");
module.exports = {
  async createUser(req, res, next) {
    try {
      const tmp = req.body;

      const dataAddress = {
        no_home: tmp.no_home,
        street: tmp.street,
        district: tmp.district,
        city: tmp.city,
      };

      const address = new Address(dataAddress);

      const dataUser = {
        fullname: tmp.fullname,
        telephone: tmp.telephone,
        email: tmp.email,
        address: address._id,
      };
      const user = new User(dataUser);

      if (!validTelephone(tmp.telephone)) {
        res.json({ error: "Invalid telephone number" });
      } else if (!validPassword(tmp.password)) {
        res.json({ error: "Password must be at least >= 8 characters" });
      } else if (!validEmail(tmp.email)) {
        res.json({ error: "Invalid email" });
      } else if (
        isEmptyOrWhiteSpace(tmp.username) ||
        isEmptyOrWhiteSpace(tmp.fullname)
      ) {
        res.json({ error: "No empty username or fullname" });
      } else {
        const dataAccount = {
          username: tmp.username,
          password: bcryptjs.hashSync(tmp.password, 10),
          role: tmp.role,
          user: user._id,
          is_active: tmp.is_active || true,
        };
        const isAccount = await Account.findOne({ username: tmp.username });
        if (isAccount) {
          res.json({
            message: "Account already exist!",
          });
        } else {
          const account = new Account(dataAccount);
          await user.save();
          await address.save();
          await account.save();

          res.status(200).json({
            status: true,
            message: " User created successfully",
          });
        }
      }
    } catch (error) {
      res.json({ error: error });
    }
  },
  async getUser(req, res, next) {
    try {
      const response = await Account.find();

      let data = [];
      for (let account of response) {
        const rs = await Account.findById(account._id, "-__v -password")
          .populate("role", "-__v -_id")
          .populate("user", "-__v ")
          .lean();
        data.push(rs);
      }
      res.json({
        data,
      });
    } catch (error) {
      res.status(404).json({ error: error });
    }
  },

  async getOneUser(req, res, next) {
    try {
      const { username } = req.query;
      const data = await Account.findOne({ username: username }, "-__v")
        .populate("role", "-__v -_id")
        .populate("user", "-__v -_id")
        .lean();
      res.json({
        data,
      });
    } catch (error) {
      res.statu(404).json(error);
    }
  },

  async createRole(req, res, next) {
    try {
      const { name } = req.body;

      const role = new Role({ name });
      await role.save();
      res.status(200).json({
        message: "Role created",
      });
    } catch (error) {
      res.status(404).json({ error: error });
    }
  },

  async getRole(req, res, next) {
    try {
      const dataRole = await Role.find().lean();
      res.status(200).json({
        message: "Get all role successfully",
        data: dataRole,
      });
    } catch (error) {
      res.status(404).json(error);
    }
  },
};
