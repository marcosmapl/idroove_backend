const express = require("express");
const router = express.Router();
const prisma = require("../orm/prismaClient");

router.get("/db", async (req, res) => {
  try {
    // minimal check: run a simple select
    await prisma.$queryRaw`SELECT 1`;
    return res.json({ ok: true, db: "connected" });
  } catch (error) {
    return res.status(500).json({ ok: false, error: error.message });
  }
});

module.exports = router;
