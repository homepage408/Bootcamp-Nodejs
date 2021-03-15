const yup = require("yup");

const createBook = yup.object().shape({
  authorId: yup.string().required(),
  publisherId: yup.string().required(),
  title: yup.string().required(),
  price: yup.string().nullable(),
  year: yup.date().required(),
});

const creatAuthor = yup.object().shape({
  firstname: yup.string().required().max(20),
  lastname: yup.string().required().max(30),
  email: yup.string().email(),
  password: yup.string().required().min(8),
});

const createPublisher=yup.object().shape({
    name: yup.string().required(),
    address: yup.string().required(),
    email: yup.string().required().email(),
    phone: yup.string().nullable(),
    website: yup.string().nullable()
})

const login = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required()
})

module.exports = { createBook, creatAuthor, createPublisher , login};
