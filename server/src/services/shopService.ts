import { prisma } from "../lib/prisma.js";

export const getAllShops = async (ratingMin?: number) => {
  return await prisma.shop.findMany({
    where: ratingMin
      ? {
          rating: { gte: ratingMin },
        }
      : {},
  });
};
