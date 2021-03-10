const express = require("express");
const app = express();
const port = 3000;
const router = express.Router();
const { router: routerPublisher } = require("./app/routes/publisher");
const { router: routerAuthor } = require("./app/routes/author");
const { router: routerBook } = require("./app/routes/book")

app.use(express.json());

app.get("/", (req, res) => {
  res.json("Hello World");
});

router.use("/api/v1", [routerPublisher, routerAuthor, routerBook]);

app.use(router);

app.listen(port, () => {
  console.log(`Server started on port http://localhost:${port}`);
});
