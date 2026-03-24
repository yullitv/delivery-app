import { prisma } from "../lib/prisma.js";

export const createOrder = async (orderData: any) => {
  return await prisma.order.create({
    data: {
      userName: orderData.userName,
      email: orderData.email,
      phone: orderData.phone,
      address: orderData.address,
      totalPrice: orderData.totalPrice,
      items: {
        create: orderData.items.map((item: any) => ({
          productId: item.productId,
          quantity: item.quantity,
        })),
      },
    },
    include: { items: true },
  });
};

export const getOrdersByContact = async (email?: string, phone?: string) => {
  const conditions = [
    ...(email ? [{ email }] : []),
    ...(phone ? [{ phone }] : []),
  ];

  return await prisma.order.findMany({
    where: conditions.length > 0 ? { OR: conditions } : {},
    include: {
      items: {
        include: { product: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });
};
