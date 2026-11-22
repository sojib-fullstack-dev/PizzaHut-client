

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


// Private API e token header auto attach hoy (jwtAuth helper)
import { authFetch } from "../action/jwtAuth";

    //  createOrder
export async function createOrder(orderData:OrderData) {
  const response = await authFetch('/orders', {
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
    ? `/orders?customerEmail=${encodeURIComponent(customerEmail)}`
    : `/orders`;
  const response = await authFetch(url);
  return response.json();
}

    // order status update (cancel etc)
export async function updateOrderStatus(id: string, status: string) {
  const response = await authFetch(`/orders/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ status }),
  });
  return response.json();
}