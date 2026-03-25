import { prisma } from "../lib/prisma.js";

export const getProductsByShop = async (
  shopId: number,
  page: number,
  limit: number,
  categories?: string[],
  sortBy?: string,
) => {
  const skip = (page - 1) * limit;

  let orderBy: any = { id: "asc" };
  if (sortBy === "price-asc") orderBy = { price: "asc" };
  if (sortBy === "price-desc") orderBy = { price: "desc" };
  if (sortBy === "name-asc") orderBy = { name: "asc" };
  if (sortBy === "name-desc") orderBy = { name: "desc" };

  return await prisma.product.findMany({
    where: {
      shopId,
      ...(categories && categories.length > 0
        ? { category: { in: categories } }
        : {}),
    },
    skip,
    take: limit,
    orderBy,
  });
};
