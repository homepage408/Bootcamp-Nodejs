const yup = require("yup");

const createBook = yup.object().shape({
  authorId: yup.string().required(),
  publisherId: yup.string().required(),
  title: yup.string().required(),
  price: yup.string().nullable(),
  year: yup.date().required(),
});

const creatAuthor = yup.object().shape({
  fisrtName: yup.string().required().max(20),
  lastName: yup.string().required().max(30),
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

module.exports = { createBook, creatAuthor, createPublisher };
