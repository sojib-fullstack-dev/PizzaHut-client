const BASE_URL =process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000';

// Private API e token header auto attach hoy (jwtAuth helper)
import { authFetch } from '../action/jwtAuth';

export type FromData = {
  name: string;
  category: string;
  description: string;
  price: string;
  location: string;
  image: string;
  // Vendor er identity - AddMenuForm session theke save kore (optional)
  vendorId?: string;
  vendorName?: string;
  vendorEmail?: string;
};


// add items
export const CreateMenuItems = async (data: FromData) => {
  const res = await authFetch('/menus', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return res.json();
};



// Menu items load korar jonno (GET)
// vendorEmail dile shudhu oi vendor er items ashbe (vendor dashboard er jonno)
// queryString dile extra filters add kora jay (browseMenu er jonno)
export const GetMenuItems = async (queryString = "", vendorEmail?: string) => {
  const params = new URLSearchParams(queryString);
  if (vendorEmail) params.set("vendorEmail", vendorEmail);
  const qs = params.toString();
  const res = await fetch(`${BASE_URL}/menus${qs ? `?${qs}` : ""}`);
  return res.json();
};


// Ekta menu item er details (GET - view er jonno)
export const GetMenuItem = async (id: string) => {
  const res = await fetch(`${BASE_URL}/menus/${id}`);
  return res.json();
};

// Menu item update korar jonno (PATCH - server e patch api ache)
export const UpdateMenuItem = async (id: string, data: FromData) => {
  const res = await authFetch(`/menus/${id}`, {
    method: 'PATCH',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return res.json();
};

// Menu item delete korar jonno (DELETE)
export const DeleteMenuItem = async (id: string) => {
  const res = await authFetch(`/menus/${id}`, {
    method: 'DELETE',
  });
  return res.json();
};

// Featured items load - shudhu Active item, maximum 6 ta (home section)
export const GetFeaturedMenuItems = async () => {
  const res = await fetch(`${BASE_URL}/menus/featured`);
  return res.json();
};

// Menu item er status update (Pending / Approved / Active / Inactive ...)
export const UpdateMenuStatus = async (id: string, status: string) => {
  const res = await authFetch(`/menus/${id}`, {
    method: 'PATCH',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ status }),
  });
  return res.json();
};


