const jwt = require("jsonwebtoken");

const generateJWT = (user) => {
  const token = jwt.sign(user, process.env.JWT_SECRET_KEY, {
    algorithm: "HS256",
    expiresIn: 60 * 60 * 12,
  });
  return token;
};

const verifyJWT = (req, res, next) => {
  try {
    const auth = req.headers.authorization;
    if (auth) {
      const token = auth.split(" ")[1];
      const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.user = { ...payload };
      next();
    } else {
      throw new Error("need token");
    }
  } catch (error) {
    res.status(500);
    next(error);
  }
};

const permit = (...roles) => {
  return (req, res, next) => {
    if (roles.includes(req.user.role)) {
      next();
    } else {
      res.status(403);
      throw new Error("access is not allowed");
    }
  };
};

module.exports = { generateJWT, verifyJWT, permit };
