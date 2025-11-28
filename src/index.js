require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const vehiclesRouter = require("./routes/vehicles");
const healthRouter = require("./routes/health");

const app = express();
const port = process.env.PORT || 3333;

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) =>
  res.json({ ok: true, message: "iDroove backend - API REST" })
);

app.use("/api/vehicles", vehiclesRouter);
app.use("/health", healthRouter);

// 404 + error handler
const { notFound, errorHandler } = require("./middleware/errorHandler");
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

// Graceful shutdown for Prisma client
const prisma = require("./orm/prismaClient");
["SIGINT", "SIGTERM", "SIGQUIT"].forEach((signal) => {
  process.on(signal, async () => {
    console.log("Shutting down gracefully...");
    await prisma.$disconnect();
    process.exit(0);
  });
});
