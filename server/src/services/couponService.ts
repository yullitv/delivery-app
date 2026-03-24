import { prisma } from '../lib/prisma.js';

export const getAllCoupons = async () => {
  return await prisma.coupon.findMany();
};