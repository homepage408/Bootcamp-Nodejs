function validation(schema) {
    return async (req, res, next) => {
      try {
        const validateBody = await schema.validate(req.body);
        req.body = validateBody;
        next()
      } catch (error) {
          res.status(400);
          next(error)
      }
    };
  }
  

  module.exports = validation