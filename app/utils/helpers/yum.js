const yup = require("yup");

const createUpdateType = yup.object().shape({
  name: yup.string().required(),
});

const createUpdateUser = yup.object().shape({
  fullname: yup.string().required(),
  username: yup.string().required(),
  email: yup.string().required().email(),
  password: yup.string().required(),
  role: yup.string().required(),
});

const createUpdateVehicle = yup.object().shape({
  name: yup.string().required(),
  typeId: yup.number().required(),
  licensePlate: yup.string().required(),
});

const login = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

module.exports = {
  createUpdateType,
  createUpdateUser,
  createUpdateVehicle,
  login,
};
