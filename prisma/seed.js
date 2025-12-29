/* eslint-disable @typescript-eslint/no-require-imports */
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash("password123", 10);

  const user = await prisma.user.upsert({
    where: { email: "user@example.com" },
    update: {},
    create: { email: "user@example.com", passwordHash, role: "user" },
  });

  const numbers = await Promise.all(
    [
      {
        msisdn: "+15551234501",
        provider: "Telnyx",
        externalId: "telnyx-001",
        region: "US",
        status: "active",
        userId: user.id,
      },
      {
        msisdn: "+442045000123",
        provider: "Plivo",
        externalId: "plivo-001",
        region: "UK",
        status: "active",
        userId: user.id,
      },
      {
        msisdn: "+2348060001111",
        provider: "Telnyx",
        externalId: "telnyx-002",
        region: "NG",
        status: "pending",
        userId: null,
      },
    ].map((number) =>
      prisma.number.upsert({
        where: { msisdn: number.msisdn },
        update: number,
        create: number,
      })
    )
  );

  await Promise.all([
    prisma.message.createMany({
      data: [
        {
          numberId: numbers[0].id,
          fromMsisdn: "+14155550101",
          body: "Inbound SMS from Twilio webhook.",
          provider: "Telnyx",
          receivedAt: new Date(),
        },
        {
          numberId: numbers[1].id,
          fromMsisdn: "+447700900000",
          body: "Test message for UK number.",
          provider: "Plivo",
          receivedAt: new Date(),
        },
      ],
      skipDuplicates: true,
    }),
    prisma.order.createMany({
      data: [
        {
          userId: user.id,
          provider: "paystack",
          externalRef: "paystack-001",
          amountCents: 4900,
          currency: "USD",
          status: "paid",
          numberId: numbers[0].id,
          periodMonths: 1,
        },
        {
          userId: user.id,
          provider: "crypto",
          externalRef: "crypto-002",
          amountCents: 9900,
          currency: "USD",
          status: "pending",
          numberId: numbers[1].id,
          periodMonths: 3,
        },
      ],
      skipDuplicates: true,
    }),
  ]);

  console.log("Seed complete:");
  console.log(`- User: ${user.email} / password123`);
  console.log(`- Numbers: ${numbers.length}`);
}

main()
  .catch((err) => {
    console.error("Seed failed", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
