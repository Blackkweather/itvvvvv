import { PrismaClient } from '@prisma/client';
import { hashPassword } from '../src/lib/auth';

const prisma = new PrismaClient();

async function main() {
  const existingUser = await prisma.user.findUnique({
    where: { email: 'demo@streampro.space' },
  });

  if (existingUser) {
    console.log('Database already seeded');
    return;
  }

  const hashedPassword = await hashPassword('demo123456');
  
  const user = await prisma.user.create({
    data: {
      email: 'demo@streampro.space',
      password: hashedPassword,
      name: 'Demo User',
      role: 'USER',
      isActive: true,
    },
  });

  const subscription = await prisma.subscription.create({
    data: {
      userId: user.id,
      plan: 'PRO',
      status: 'ACTIVE',
      deviceLimit: 3,
      devicesUsed: 0,
      startDate: new Date(),
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    },
  });

  console.log('Demo data created:', { user: user.email, subscription: subscription.plan });
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());