const express = require("express");
const app = express();
const port = 3000;
const router = express.Router();
const { router: routerPublisher } = require("./app/routes/publisher");
const { router: routerAuthor } = require("./app/routes/author");
const { router: routerBook } = require("./app/routes/book")
const { notFound } = require('./app/utils/middleware/notFound');
const { logger } = require("./app/utils/middleware/morgan");
const morgan = require('morgan');
const { errorHandler } = require("./app/utils/middleware/errorHandler");


app.use(express.json());
app.use(logger);
app.use(morgan('dev'));

app.get("/", (req, res) => {
  res.json("Hello World");
});

router.use("/api/v1", [routerPublisher, routerAuthor, routerBook]);

app.use(router);

app.use(errorHandler);
app.use(notFound);

app.listen(port, () => {
  console.log(`Server started on port http://localhost:${port}`);
});