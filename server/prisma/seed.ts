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
  console.log("Starting seeding with realistic data... 🚀");

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

  const burgerNames = [
    "Angus Burger",
    "Bacon King",
    "Classic Cheeseburger",
    "Double Whopper",
    "Extreme Spicy",
    "Fish Fillet",
    "Guacamole Deluxe",
    "Hawaiian Burger",
    "Iberico Pork Burger",
  ];
  const drinkNames = [
    "Apple Juice",
    "Blue Lagoon",
    "Coca-Cola",
    "Diet Sprite",
    "Espresso",
    "Fresh Lemonade",
    "Ginger Ale",
    "Hot Chocolate",
    "Iced Latte",
  ];
  const dessertNames = [
    "Apple Pie",
    "Brownie",
    "Cheesecake",
    "Donut",
    "Eclair",
    "Fruit Salad",
    "Gelato",
    "Honey Cake",
  ];

  const categories = ["Burgers", "Drinks", "Desserts"];

  const shops = [
    {
      name: "Mc Donny",
      rating: 4.8,
      image: "https://placehold.co/400x200?text=McDonny",
    },
    {
      name: "CFK",
      rating: 4.2,
      image: "https://placehold.co/400x200?text=CFK",
    },
    {
      name: "Burger Queen",
      rating: 3.9,
      image: "https://placehold.co/400x200?text=Burger+Queen",
    },
    {
      name: "Healthy Eat",
      rating: 4.9,
      image: "https://placehold.co/400x200?text=Healthy+Eat",
    },
    {
      name: "Pizza Planet",
      rating: 2.5,
      image: "https://placehold.co/400x200?text=Pizza+Planet",
    },
  ];

  for (const shopData of shops) {
    const shop = await prisma.shop.create({ data: shopData });

    for (let i = 0; i < 25; i++) {
      const category = categories[i % 3] ?? "Burgers";

      let baseName = "";
      if (category === "Burgers") {
        baseName = burgerNames[i % burgerNames.length] as string;
      } else if (category === "Drinks") {
        baseName = drinkNames[i % drinkNames.length] as string;
      } else {
        baseName = dessertNames[i % dessertNames.length] as string;
      }

      await prisma.product.create({
        data: {
          name: `${baseName} (${shop.name})`,
          price: Math.floor(Math.random() * 450) + 50,
          category: category,
          shopId: shop.id,
          image: null,
        },
      });
    }
  }

  console.log("Database successfully seeded!");
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
