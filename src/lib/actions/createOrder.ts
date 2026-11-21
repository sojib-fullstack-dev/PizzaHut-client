

export type OrderData = {
  itemId: string;
  itemName?: string;
  image?: string;
  price?: number | string;
  customerId?: string;
  customerName?: string;
  customerEmail?: string;
  vendorId?: string; // menu item e jodi vendor info thake
  vendorName?: string;
  vendorEmail?: string;
  deliveryDate?: string;
  deliveryAddress?: string;
  message?: string;
  status?: string; // Pending / Accepted / Rejected / Cancelled
  createdAt?: string; // order koykhon placed hoise
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

    // getOrders
    
export async function getOrders() {
  const response = await fetch(`${BASE_URL}/orders`);
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