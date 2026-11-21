

export type OrderData = {
  itemId: string;
  itemName?: string;
  price?: number | string;
  customerId?: string;
  customerName?: string;
  customerEmail?: string;
  deliveryDate?: string;
  deliveryAddress?: string;
  message?: string;
};



const BASE_URL =process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000';

export async function createOrder(orderData:OrderData) {
  const response = await fetch(`${BASE_URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(orderData),
  });

  return response.json();
}