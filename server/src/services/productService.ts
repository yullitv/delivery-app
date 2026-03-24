import { prisma } from '../lib/prisma.js';

export const getProductsByShop = async (shopId: number, page: number, limit: number) => {
  const skip = (page - 1) * limit;

  return await prisma.product.findMany({
    where: { shopId },
    skip,
    take: limit,
    orderBy: { id: 'asc' }
  });
};