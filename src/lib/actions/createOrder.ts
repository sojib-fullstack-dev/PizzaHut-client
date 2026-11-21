

export type OrderData = {
  itemId: string;
  itemName?: string;
  image?: string;
  price?: number | string;
  customerId?: string;
  customerName?: string;
  customerEmail?: string;
  vendorId?: string; 
  vendorName?: string;
  vendorEmail?: string;
  deliveryDate?: string;
  deliveryAddress?: string;
  message?: string;
  status?: string; 
  createdAt?: string;
};


const BASE_URL =process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000';

    //  createOrder
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

    // getOrders - customerEmail dile shudhu oi customer er orders ashbe
export async function getOrders(customerEmail?: string) {
  const url = customerEmail
    ? `${BASE_URL}/orders?customerEmail=${encodeURIComponent(customerEmail)}`
    : `${BASE_URL}/orders`;
  const response = await fetch(url);
  return response.json();
}

    // order status update (cancel etc)
export async function updateOrderStatus(id: string, status: string) {
  const response = await fetch(`${BASE_URL}/orders/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ status }),
  });
  return response.json();
}