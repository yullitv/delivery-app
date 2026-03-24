import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not defined in .env file");
}

const pool = new Pool({ connectionString });

const adapter = new PrismaPg(pool as any); 
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Starting seeding... 🚀");

  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.shop.deleteMany();
  await prisma.coupon.deleteMany();

  const coupons = [
    { code: "WELCOME10", discountPercent: 10 },
    { code: "SPRING20", discountPercent: 20 },
    { code: "HOTDEAL30", discountPercent: 30 },
    { code: "ELIFTECH", discountPercent: 15 },
  ];

  for (const coupon of coupons) {
    await prisma.coupon.create({ data: coupon });
  }

  const shops = [
    { name: "Mc Donny", rating: 4.8, image: "https://placehold.co/400x200?text=McDonny" },
    { name: "CFK", rating: 4.2, image: "https://placehold.co/400x200?text=CFK" },
    { name: "Burger Queen", rating: 3.9, image: "https://placehold.co/400x200?text=Burger+Queen" },
    { name: "Healthy Eat", rating: 4.9, image: "https://placehold.co/400x200?text=Healthy+Eat" },
    { name: "Pizza Planet", rating: 2.5, image: "https://placehold.co/400x200?text=Pizza+Planet" },
  ];

  const categories = ["Burgers", "Drinks", "Desserts"];

  for (const shopData of shops) {
    const shop = await prisma.shop.create({ data: shopData });

    for (let i = 1; i <= 25; i++) {
      await prisma.product.create({
        data: {
          name: `${shop.name} Item ${i}`,
          price: Math.floor(Math.random() * 450) + 50,
          category: categories[i % 3] ?? "Burgers", 
          shopId: shop.id,
          image: null,
        },
      });
    }
  }

  console.log("Shops and Products seeded");
  console.log("Full seeding finished!");
}

main()
  .catch((e) => {
    console.error("Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await pool.end();
    await prisma.$disconnect();
  });