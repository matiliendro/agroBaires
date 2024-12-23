// Constantes para las keys del localStorage
export const STORAGE_KEYS = {
  AUTH: 'auth_data',
  PRODUCTS: 'products_data'
};

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  location?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  image?: string; // Aquí almacenaremos la imagen en Base64
  producer?: string;
  phone?: string;
  email?: string;
}

// Funciones para manejar productos
export const saveProducts = (products: Product[]) => {
  try {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
  } catch (error) {
    console.error('Error al guardar productos:', error);
    // Manejar el error si el localStorage está lleno
  }
};

export const getProducts = (): Product[] => {
  try {
    const products = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
    return products ? JSON.parse(products) : [];
  } catch (error) {
    console.error('Error al obtener productos:', error);
    return [];
  }
};

// Funciones para manejar la autenticación
export const clearAuthData = () => {
  localStorage.removeItem(STORAGE_KEYS.AUTH);
  // No eliminamos los productos al cerrar sesión
};

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  userType: 'admin' | 'vendedor' | 'comprador' | 'vendedor_comprador';
}

const MOCK_USERS: User[] = [
  { 
    id: '1',
    name: 'Administrador',
    email: 'admin@example.com',
    password: 'admin123',
    userType: 'admin'
  },
  { 
    id: '2',
    name: 'Vendedor',
    email: 'vendedor@example.com',
    password: 'vendedor123',
    userType: 'vendedor'
  },
  { 
    id: '3',
    name: 'Comprador',
    email: 'comprador@example.com',
    password: 'comprador123',
    userType: 'comprador'
  },
  { 
    id: '4',
    name: 'Vendedor y Comprador',
    email: 'ambos@example.com',
    password: 'ambos123',
    userType: 'vendedor_comprador'
  }
];

export const initializeUsers = () => {
  if (typeof window === 'undefined') return;
  
  const storedUsers = localStorage.getItem('users');
  if (!storedUsers) {
    localStorage.setItem('users', JSON.stringify(MOCK_USERS));
  }
};

export const getUsers = (): User[] => {
  if (typeof window === 'undefined') return MOCK_USERS;
  
  const storedUsers = localStorage.getItem('users');
  return storedUsers ? JSON.parse(storedUsers) : MOCK_USERS;
};

export const addUser = (userData: Omit<User, 'id'>) => {
  const users = getUsers();
  const newUser = {
    ...userData,
    id: Date.now().toString()
  };
  
  users.push(newUser);
  localStorage.setItem('users', JSON.stringify(users));
  return newUser;
};

export const loginUser = (email: string, password: string) => {
  const users = getUsers();
  const user = users.find(u => u.email === email && u.password === password);
  
  if (user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    localStorage.setItem('userType', user.userType);
    return user;
  }
  
  return null;
};

export const getCurrentUser = () => {
  const storedUser = localStorage.getItem('currentUser');
  return storedUser ? JSON.parse(storedUser) : null;
};

export const logoutUser = () => {
  localStorage.removeItem('currentUser');
  localStorage.removeItem('userType');
}; 