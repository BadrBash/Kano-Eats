const API_BASE_URL = 'http://localhost:5246/api';

// Helper function to handle API responses
const handleResponse = async (response: Response) => {
  // Log the response for debugging
  console.log(`API Response: ${response.status} ${response.statusText}`, {
    url: response.url,
    status: response.status,
    headers: Object.fromEntries(response.headers.entries()),
  });

  // Handle 401 Unauthorized - clear token and redirect to login
  if (response.status === 401) {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    throw new Error('Unauthorized. Please log in to continue.');
  }

  if (!response.ok) {
    try {
      const error = await response.json();
      console.error('API Error Response:', error);
      throw new Error(error.message || error.error || `API Error: ${response.status}`);
    } catch (e) {
      // If response is not JSON, use status text
      const errorMsg = `API Error: ${response.status} ${response.statusText}`;
      console.error(errorMsg);
      throw new Error(errorMsg);
    }
  }
  
  try {
    return await response.json();
  } catch (e) {
    // If response body is empty or not JSON, return empty object
    return {};
  }
};

// Helper function to get auth token from localStorage
const getAuthToken = () => localStorage.getItem('authToken');

// Helper function to get default headers
const getHeaders = (includeAuth = true) => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  if (includeAuth) {
    const token = getAuthToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }
  return headers;
};

// Helper function to check if user is authenticated
export const isAuthenticated = () => {
  return !!getAuthToken();
};

// Helper function to get current user
export const getCurrentUser = () => {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};

// ============================================
// AUTH ENDPOINTS
// ============================================

export const authAPI = {
  // POST /api/auth/register
  register: async (firstName: string, lastName: string, email: string, phoneNumber: string, password: string) => {
    const payload = { firstName, lastName, email, phoneNumber, password };
    console.log('Registering user with:', payload);
    
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: getHeaders(false),
        body: JSON.stringify(payload),
      });
      const data = await handleResponse(response);
      console.log('Registration response:', data);
      if (data.token) {
        localStorage.setItem('authToken', data.token);
        if (data.user) {
          localStorage.setItem('user', JSON.stringify(data.user));
        } else {
          localStorage.setItem('user', JSON.stringify({ email, firstName, lastName }));
        }
      }
      return data;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  },

  // POST /api/auth/login
  login: async (email: string, password: string) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: getHeaders(false),
      body: JSON.stringify({ email, password }),
    });
    const data = await handleResponse(response);
    if (data.token) {
      localStorage.setItem('authToken', data.token);
      if (data.user) {
        localStorage.setItem('user', JSON.stringify(data.user));
      } else {
        localStorage.setItem('user', JSON.stringify({ email }));
      }
    }
    return data;
  },

  // GET /api/auth/me
  getMe: async () => {
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      method: 'GET',
      headers: getHeaders(true),
    });
    return handleResponse(response);
  },

  // Logout (just remove token from localStorage)
  logout: () => {
    localStorage.removeItem('authToken');
  },
};

// ============================================
// CART ENDPOINTS
// ============================================

export const cartAPI = {
  // GET /api/cart
  getCart: async () => {
    const response = await fetch(`${API_BASE_URL}/cart`, {
      method: 'GET',
      headers: getHeaders(true),
    });
    const data = await handleResponse(response);
    return data.data || data;
  },

  // POST /api/cart/add
  addToCart: async (menuItemId: string, quantity: number) => {
    const response = await fetch(`${API_BASE_URL}/cart/add`, {
      method: 'POST',
      headers: getHeaders(true),
      body: JSON.stringify({ menuItemId, quantity }),
    });
    const data = await handleResponse(response);
    return data.data || data;
  },

  // PUT /api/cart/update/{cartItemId}
  updateCartItem: async (cartItemId: string, quantity: number) => {
    const response = await fetch(`${API_BASE_URL}/cart/update/${cartItemId}`, {
      method: 'PUT',
      headers: getHeaders(true),
      body: JSON.stringify({ quantity }),
    });
    const data = await handleResponse(response);
    return data.data || data;
  },

  // DELETE /api/cart/remove/{cartItemId}
  removeFromCart: async (cartItemId: string) => {
    const response = await fetch(`${API_BASE_URL}/cart/remove/${cartItemId}`, {
      method: 'DELETE',
      headers: getHeaders(true),
    });
    const data = await handleResponse(response);
    return data.data || data;
  },
};

// ============================================
// MENU ENDPOINTS
// ============================================

export const menuAPI = {
  // POST /api/menu (Create menu item)
  createMenuItem: async (menuData: any) => {
    const response = await fetch(`${API_BASE_URL}/menu`, {
      method: 'POST',
      headers: getHeaders(true),
      body: JSON.stringify(menuData),
    });
    return handleResponse(response);
  },

  // PUT /api/menu/{id} (Update menu item)
  updateMenuItem: async (id: string, menuData: any) => {
    const response = await fetch(`${API_BASE_URL}/menu/${id}`, {
      method: 'PUT',
      headers: getHeaders(true),
      body: JSON.stringify(menuData),
    });
    return handleResponse(response);
  },

  // GET /api/menu (Get all menu items or get menu items for a restaurant)
  getMenuItems: async (restaurantId?: string) => {
    const url = restaurantId 
      ? `${API_BASE_URL}/menu?restaurantId=${restaurantId}`
      : `${API_BASE_URL}/menu`;
    const response = await fetch(url, {
      method: 'GET',
      headers: getHeaders(false),
    });
    const data = await handleResponse(response);
    return data.data || data;
  },
};

// ============================================
// RESTAURANTS ENDPOINTS (Inferred from typical patterns)
// ============================================

export const restaurantsAPI = {
  // GET /api/restaurants (Get all restaurants)
  getRestaurants: async () => {
    const response = await fetch(`${API_BASE_URL}/restaurants`, {
      method: 'GET',
      headers: getHeaders(false),
    });
    const data = await handleResponse(response);
    console.log('Raw restaurants response:', data);
    // Extract data from wrapper if it exists, or return as array
    const result = data.data || data;
    console.log('Processed restaurants:', result);
    return Array.isArray(result) ? result : [];
  },

  // GET /api/restaurants/{id} (Get specific restaurant)
  getRestaurant: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/restaurants/${id}`, {
      method: 'GET',
      headers: getHeaders(false),
    });
    const data = await handleResponse(response);
    // Extract data from wrapper if it exists
    return data.data || data;
  },

  // POST /api/restaurants (Create restaurant - vendor only)
  createRestaurant: async (restaurantData: any) => {
    const response = await fetch(`${API_BASE_URL}/restaurants`, {
      method: 'POST',
      headers: getHeaders(true),
      body: JSON.stringify(restaurantData),
    });
    return handleResponse(response);
  },

  // PUT /api/restaurants/{id} (Update restaurant - vendor only)
  updateRestaurant: async (id: string, restaurantData: any) => {
    const response = await fetch(`${API_BASE_URL}/restaurants/${id}`, {
      method: 'PUT',
      headers: getHeaders(true),
      body: JSON.stringify(restaurantData),
    });
    return handleResponse(response);
  },
};

// ============================================
// ORDERS ENDPOINTS (Inferred)
// ============================================

export const ordersAPI = {
  // GET /api/orders (Get user's orders)
  getOrders: async () => {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      method: 'GET',
      headers: getHeaders(true),
    });
    const data = await handleResponse(response);
    return data.data || data;
  },

  // POST /api/orders (Create order)
  createOrder: async (orderData: any) => {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers: getHeaders(true),
      body: JSON.stringify(orderData),
    });
    const data = await handleResponse(response);
    return data.data || data;
  },

  // GET /api/orders/{id} (Get specific order)
  getOrder: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/orders/${id}`, {
      method: 'GET',
      headers: getHeaders(true),
    });
    const data = await handleResponse(response);
    return data.data || data;
  },

  // PUT /api/orders/{id} (Update order status)
  updateOrder: async (id: string, orderData: any) => {
    const response = await fetch(`${API_BASE_URL}/orders/${id}`, {
      method: 'PUT',
      headers: getHeaders(true),
      body: JSON.stringify(orderData),
    });
    const data = await handleResponse(response);
    return data.data || data;
  },
};

// ============================================
// HEALTH ENDPOINT
// ============================================

export const healthAPI = {
  // GET /health
  checkHealth: async () => {
    const response = await fetch(`${API_BASE_URL.replace('/api', '')}/health`, {
      method: 'GET',
    });
    return handleResponse(response);
  },
};
