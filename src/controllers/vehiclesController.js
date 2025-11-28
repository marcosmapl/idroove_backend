const repo = require("../services/prismaVehicleRepository");
const { Prisma } = require("@prisma/client");

const requiredFields = [
  "placa",
  "renavam",
  "ano",
  "marca",
  "modelo",
  "categoria",
  "cor",
  "portas",
  "motorizacao",
  "tipoCambio",
  "direcao",
  "kilometragem",
  "situacaoLicenciamento",
  "situacaoVeiculo",
];

function validateFields(body) {
  const missing = requiredFields.filter(
    (f) => body[f] === undefined || body[f] === null
  );
  return missing;
}

exports.createVehicle = async (req, res) => {
  try {
    const missing = validateFields(req.body);
    if (missing.length) {
      return res
        .status(400)
        .json({ error: `Missing fields: ${missing.join(", ")}` });
    }
    // Coerce numeric fields to numbers
    const payload = { ...req.body };
    payload.ano = Number(payload.ano);
    payload.portas = Number(payload.portas);
    payload.kilometragem = Number(payload.kilometragem);

    // Validate numeric fields
    if (
      !Number.isInteger(payload.ano) ||
      !Number.isInteger(payload.portas) ||
      !Number.isInteger(payload.kilometragem)
    ) {
      return res
        .status(400)
        .json({
          error: "Fields ano, portas and kilometragem must be integers",
        });
    }

    const vehicle = await repo.createVehicle(payload);
    return res.status(201).json(vehicle);
  } catch (error) {
    console.error(error);
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return res
        .status(409)
        .json({ error: "Conflito: valor duplicado", details: error.meta });
    }
    return res
      .status(500)
      .json({ error: "Erro ao criar veículo", details: error.message });
  }
};

exports.getVehicles = async (_req, res) => {
  try {
    const vehicles = await repo.getAllVehicles();
    return res.json(vehicles);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Erro ao recuperar veículos", details: error.message });
  }
};

exports.getVehicleById = async (req, res) => {
  try {
    const { id } = req.params;
    const vehicle = await repo.getVehicleById(id);
    if (!vehicle)
      return res.status(404).json({ error: "Veículo não encontrado" });
    return res.json(vehicle);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Erro ao recuperar veículo", details: error.message });
  }
};

exports.updateVehicle = async (req, res) => {
  try {
    const { id } = req.params;
    // Minimal validation: ensure id exists
    const vehicleExists = await repo.getVehicleById(id);
    if (!vehicleExists)
      return res.status(404).json({ error: "Veículo não encontrado" });
    const payload = { ...req.body };
    if (payload.ano) payload.ano = Number(payload.ano);
    if (payload.portas) payload.portas = Number(payload.portas);
    if (payload.kilometragem)
      payload.kilometragem = Number(payload.kilometragem);
    if (payload.ano && !Number.isInteger(payload.ano))
      return res.status(400).json({ error: "Field ano must be an integer" });
    if (payload.portas && !Number.isInteger(payload.portas))
      return res.status(400).json({ error: "Field portas must be an integer" });
    if (payload.kilometragem && !Number.isInteger(payload.kilometragem))
      return res
        .status(400)
        .json({ error: "Field kilometragem must be an integer" });

    const updated = await repo.updateVehicle(id, payload);
    return res.json(updated);
  } catch (error) {
    console.error(error);
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return res
        .status(409)
        .json({ error: "Conflito: valor duplicado", details: error.meta });
    }
    return res
      .status(500)
      .json({ error: "Erro ao atualizar veículo", details: error.message });
  }
};

exports.deleteVehicle = async (req, res) => {
  try {
    const { id } = req.params;
    const vehicleExists = await repo.getVehicleById(id);
    if (!vehicleExists)
      return res.status(404).json({ error: "Veículo não encontrado" });
    await repo.deleteVehicle(id);
    return res.status(204).send();
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Erro ao excluir veículo", details: error.message });
  }
};
