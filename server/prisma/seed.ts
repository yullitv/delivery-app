import { prisma } from "../src/lib/prisma.js";

async function main() {
  console.log("Starting seeding... ");

  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.shop.deleteMany();
  await prisma.coupon.deleteMany();

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

    for (let i = 1; i <= 25; i++) {
      await prisma.product.create({
        data: {
          name: `${shop.name} Item ${i}`,
          price: Math.floor(Math.random() * 450) + 50,
          category: i % 2 === 0 ? "Burgers" : "Drinks",
          shopId: shop.id,
        },
      });
    }
  }

  

  console.log("Seeding finished!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
