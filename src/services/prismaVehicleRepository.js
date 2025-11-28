const prisma = require("../orm/prismaClient");

class PrismaVehicleRepository {
  async createVehicle(data) {
    return prisma.vehicle.create({ data });
  }

  async getAllVehicles() {
    return prisma.vehicle.findMany({ orderBy: { id: "desc" } });
  }

  async getVehicleById(id) {
    return prisma.vehicle.findUnique({ where: { id: Number(id) } });
  }

  async updateVehicle(id, data) {
    return prisma.vehicle.update({ where: { id: Number(id) }, data });
  }

  async deleteVehicle(id) {
    return prisma.vehicle.delete({ where: { id: Number(id) } });
  }
}

module.exports = new PrismaVehicleRepository();
