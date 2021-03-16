const { baseResponse } = require("../utils/helpers/baseResponse");
const { user } = require("./../db/models");
const bcrypt = require("bcrypt");
const { generateJWT } = require("../utils/middleware/authJwt");

class AuthController {
  static async login(req, res, next) {
    try {
      const data = await user.findOne({
        where: {
          email: req.body.email,
        },
      });
      //   console.log(data)
      if (data) {
        const check = bcrypt.compareSync(req.body.password, data.password);
        console.log(check);
        if (check) {
          const payload = {
            id: data.id,
            fullname:data.fullname,
            usernamen: data.username,
            email: data.email,
            photo:data.photo,
            role: data.role,
          };
          payload.token = generateJWT(payload);
          return baseResponse({
            message: "login success",
            data: { ...payload },
          })(res, 200);
        } else {
          return baseResponse({
            success: false,
            message: "email atau password salah",
          })(res, 200);
        }
      } else {
        return baseResponse({ success: false, message: "user tidak ada" })(
          res,
          401
        );
      }
    } catch (error) {
      res.status(500);
      next(error);
    }
  }
}
module.exports = AuthController;
