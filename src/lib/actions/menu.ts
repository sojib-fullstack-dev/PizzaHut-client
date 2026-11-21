const BASE_URL =process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000';

export type FromData = {
  name: string;
  category: string;
  description: string;
  price: string;
  location: string;
  image: string;
};


// add items
export const CreateMenuItems = async (data: FromData) => {
  const res = await fetch(`${BASE_URL}/menus`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return res.json();
};



// Menu items load korar jonno (GET)
export const GetMenuItems = async (queryString= "" ) => {
  const res = await fetch(`${BASE_URL}/menus?${queryString }`);
  return res.json();
};


// Ekta menu item er details (GET - view er jonno)
export const GetMenuItem = async (id: string) => {
  const res = await fetch(`${BASE_URL}/menus/${id}`);
  return res.json();
};

// Menu item update korar jonno (PATCH - server e patch api ache)
export const UpdateMenuItem = async (id: string, data: FromData) => {
  const res = await fetch(`${BASE_URL}/menus/${id}`, {
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
  const res = await fetch(`${BASE_URL}/menus/${id}`, {
    method: 'DELETE',
  });
  return res.json();
};


