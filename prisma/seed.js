const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  await prisma.vehicle.createMany({
    data: [
      {
        placa: "ABC1D23",
        renavam: "12345678901",
        ano: 2021,
        marca: "Toyota",
        modelo: "Corolla",
        categoria: "SEDAN",
        cor: "Prata",
        portas: 4,
        motorizacao: "1.8 16V",
        tipoCambio: "AUTOMATIC",
        direcao: "ELECTRIC",
        kilometragem: 15000,
        situacaoLicenciamento: "REGULAR",
        situacaoVeiculo: "AVAILABLE",
      },
    ],
    skipDuplicates: true,
  });

  console.log("Seed finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
