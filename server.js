const express = require("express");
const router = express.Router();
const app = express();
const port = 3000;
const cors = require("cors");
const morgan = require("morgan");
const { router: routerTypes } = require("./app/routes/type");
const { router: routerLogin } = require("./app/routes/login");
const { router: routerUser } = require("./app/routes/user");
const { router: routerVehicle } = require("./app/routes/vehicle");
const { errorHandler } = require("./app/utils/middleware/errorHandlers");
const { notFound } = require("./app/utils/middleware/notFound");
const { logger } = require("./app/utils/middleware/morgan");

const Sentry = require("@sentry/node");
const Tracing = require("@sentry/tracing");

app.use(express.json());
app.use(cors());

Sentry.init({
  dsn:
    "https://993858f52b684d72bed6727a1aaeb139@o551743.ingest.sentry.io/5675978",
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Tracing.Integrations.Express({ app }),
  ],
  tracesSampleRate: 1.0,
});

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

app.use(logger);
app.use(morgan("dev"));

router.use("/api/v1", [routerTypes, routerLogin, routerVehicle, routerUser]);
app.use(router);

app.use(Sentry.Handlers.errorHandler());
app.use(errorHandler);
app.use(notFound);

app.listen(port, () => {
  console.log(`Server started on port http://localhost:${port}`);
});
