import { PrismaClient } from '@prisma/client';
// import { PrismaClient } from 'generated/prisma';
// import { hashPassword } from 'utils/auth/bcrypt';
import { hashPassword } from '../utils/auth/bcrypt';
// import * as dotenv from 'dotenv';
import 'dotenv/config'


const prisma = new PrismaClient();

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL || "admin@rideable.com";
  const adminPassword = 'adminPassword@rideable1'
  const hashedPassword = await hashPassword(process.env.ADMIN_PASSWORD || adminPassword)

  // Upsert ensures we don’t create duplicates if the seed runs multiple times
  const admin = await prisma.admin.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      name: 'System Admin',
      password: hashedPassword,
      role: 'Admin',
    },
  });

  console.log('Admin user created:', admin.email);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
