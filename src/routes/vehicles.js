const express = require("express");
const router = express.Router();
const controller = require("../controllers/vehiclesController");

router.get("/", controller.getVehicles);
router.get("/:id", controller.getVehicleById);
router.post("/", controller.createVehicle);
router.put("/:id", controller.updateVehicle);
router.delete("/:id", controller.deleteVehicle);

module.exports = router;
