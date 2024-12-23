"use client"

import { useState, useEffect, useMemo, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ProductList from '@/components/ProductList';
import ProductFormModal from '@/components/ProductFormModal';
import SearchInput from '@/components/SearchInput';
import { Product } from '@/types/product';
import { useRouter } from 'next/navigation';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

// Datos de ejemplo más extensos para mejor testing
const mockProductsData: Product[] = [
  {
    id: '1',
    name: 'Manzanas Rojas',
    category: 'Frutas',
    price: 100,
    producer: 'Productor A',
    image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6',
    phone: '+54 11 1234-5678',
    email: 'productor.a@ejemplo.com',
    location: 'San Telmo, Buenos Aires',
    description: 'Manzanas rojas frescas'
  },
  {
    id: '2',
    name: 'Manzanas Verdes',
    category: 'Frutas',
    price: 90,
    producer: 'Productor A',
    image: 'https://images.unsplash.com/photo-1619546813926-a78fa6372cd2',
    phone: '+54 11 1234-5678',
    email: 'productor.a@ejemplo.com',
    location: 'San Telmo, Buenos Aires',
    description: 'Manzanas verdes frescas'
  },
  {
    id: '3',
    name: 'Mandarinas',
    category: 'Frutas',
    price: 85,
    producer: 'Productor B',
    image: 'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b',
    phone: '+54 11 2345-6789',
    email: 'productor.b@ejemplo.com',
    location: 'Palermo, Buenos Aires',
    description: 'Mandarinas dulces'
  },
  {
    id: '4',
    name: 'Zanahorias',
    category: 'Verduras',
    price: 50,
    producer: 'Productor B',
    image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37',
    phone: '+54 11 2345-6789',
    email: 'productor.b@ejemplo.com',
    location: 'Palermo, Buenos Aires',
    description: 'Zanahorias frescas'
  },
  {
    id: '5',
    name: 'Naranjas',
    category: 'Frutas',
    price: 80,
    producer: 'Productor C',
    image: 'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b',  
    phone: '+54 11 3456-7890',
    email: 'productor.c@ejemplo.com',
    location: 'Belgrano, Buenos Aires',
    description: 'Naranjas jugosas'
  }
];

// Agregar estos datos mock cerca de mockProductsData
const mockUsersData: User[] = [
  {
    id: '1',
    name: 'Juan Vendedor',
    email: 'juan@ejemplo.com',
    type: 'vendedor',
    active: true,
    isLoggedIn: true
  },
  {
    id: '2',
    name: 'Ana Compradora',
    email: 'ana@ejemplo.com',
    type: 'comprador',
    active: true,
    isLoggedIn: true
  },
  {
    id: '3',
    name: 'Carlos Admin',
    email: 'carlos@ejemplo.com',
    type: 'admin',
    active: true,
    isLoggedIn: true
  }
];

// Agregar este tipo cerca de los otros tipos
type User = {
  id: string;
  name: string;
  email: string;
  type: 'admin' | 'vendedor' | 'comprador' | 'vendedor_comprador';
  active: boolean;
  isLoggedIn: boolean;
};


export default function Dashboard() {
  const router = useRouter();
  
  // 1. Definir todos los estados
  const [isClient, setIsClient] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [userType, setUserType] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [location, setLocation] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // 2. Definir la función initializeProducts antes de usarla
  const initializeProducts = () => {
    if (typeof window === 'undefined') return mockProductsData;
    
    const storedProducts = window.localStorage.getItem('products');
    
    if (!storedProducts) {
      window.localStorage.setItem('products', JSON.stringify(mockProductsData));
      return mockProductsData;
    }

    try {
      return JSON.parse(storedProducts);
    } catch {
      window.localStorage.setItem('products', JSON.stringify(mockProductsData));
      return mockProductsData;
    }
  };

  // 3. Memos
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = category === 'all' || product.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchTerm, category]);

  const myProducts = useMemo(() => {
    return products.filter(product => product.producer === 'Usuario Actual');
  }, [products]);

  // 4. Effects
  useEffect(() => {
    const checkSessionAndLoadData = () => {
      const currentUser = localStorage.getItem('currentUser');
      const storedUserType = localStorage.getItem('userType');
      setIsLoggedIn(!!currentUser && !!storedUserType);

      // Cargar usuario si está autenticado
      if (currentUser && storedUserType) {
        try {
          const userData = JSON.parse(currentUser);
          setUser(userData);
          setUserType(storedUserType);
        } catch (error) {
          console.error('Error parsing user data:', error);
        }
      }

      // Cargar productos siempre
      const currentProducts = initializeProducts();
      setProducts(currentProducts);
      setIsClient(true);
      setIsLoading(false);
    };

    checkSessionAndLoadData();
  }, []);

  // Mostrar loading mientras se inicializa
  if (isLoading) {
    return <div>Cargando...</div>;
  }

  if (!isClient) return null;

  // Manejadores de eventos
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
  };

  const handleAddProduct = (productData: any) => {
    const newProduct = {
      id: Date.now().toString(),
      ...productData,
      producer: 'Usuario Actual'
    };
    
    // Obtener productos actuales directamente del localStorage
    const currentProducts = initializeProducts();
    const updatedProducts = [...currentProducts, newProduct];
    
    // Actualizar localStorage y estado
    window.localStorage.setItem('products', JSON.stringify(updatedProducts));
    setProducts(updatedProducts);
    console.log('Producto agregado:', newProduct);
  };

  const handleEditProduct = (id: string, productData: any) => {
    const currentProducts = initializeProducts();
    const updatedProducts = currentProducts.map((product: Product) => 
      product.id === id ? { ...product, ...productData } : product
    );
    
    window.localStorage.setItem('products', JSON.stringify(updatedProducts));
    setProducts(updatedProducts);
  };

  const handleDeleteProduct = (id: string) => {
    const currentProducts = initializeProducts();
    const updatedProducts = currentProducts.filter((product: Product) => product.id !== id);
    
    window.localStorage.setItem('products', JSON.stringify(updatedProducts));
    setProducts(updatedProducts);
  };
  const handleActionRequiringAuth = () => {
    if (!isLoggedIn) {
      router.push('/login');
      return;
    }
  };

  if (!isClient) return null;

  const handleLogout = () => {
    // Preservar productos en localStorage
    const currentProducts = window.localStorage.getItem('products');
    
    // Limpiar solo la sesión
    window.localStorage.removeItem('userType');
    
    // Restaurar productos si existían
    if (currentProducts) {
      window.localStorage.setItem('products', currentProducts);
    }
    
    setIsLoggedIn(false);
    setUserType('');
    router.push('/');
  };

  const SearchSection = () => {
    return (
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Buscar Productos</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Ubicación</label>
            <SearchInput
              placeholder="Ingresa tu ubicación"
              value={location}
              onChange={handleLocationChange}
              className="w-full"
              autoComplete="street-address"
            />
          </div>
          <div className="flex items-center space-x-2">
            <SearchInput
              placeholder="¿Qué estás buscando?"
              value={searchTerm}
              onChange={handleInputChange}
              className="flex-grow"
              autoComplete="off"
            />
            <Select onValueChange={setCategory} value={category}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Categoría" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las categorías</SelectItem>
                <SelectItem value="Frutas">Frutas</SelectItem>
                <SelectItem value="Verduras">Verduras</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
    );
  };

  const SellerContent = () => (
    <>
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Mis Productos en Venta</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Productos Publicados</h3>
            <ProductFormModal onSubmit={handleAddProduct} />
          </div>
          <div className="grid gap-4">
            {myProducts.map((product) => (
              <div key={product.id} className="flex justify-between items-center p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">{product.name}</h4>
                  <p className="text-sm text-gray-500">Precio: ${product.price}</p>
                </div>
                <div className="space-x-2">
                  <ProductFormModal 
                    isEdit 
                    product={product} 
                    onSubmit={(data) => handleEditProduct(product.id, data)} 
                  />
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => handleDeleteProduct(product.id)}
                  >
                    Eliminar
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <SearchSection />
      <ProductList products={filteredProducts} onViewDetails={handleViewDetails} />
    </>
  );

  const BuyerContent = () => (
    <>
      <SearchSection />
      <ProductList products={filteredProducts} onViewDetails={handleViewDetails} />
    </>
  );

  const AdminContent = () => {
    const [showUserManagement, setShowUserManagement] = useState(false);
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
      // Cargar usuarios del localStorage o usar datos mock iniciales
      const storedUsers = window.localStorage.getItem('users');
      if (!storedUsers) {
        // Si no hay usuarios en localStorage, usar los mock y guardarlos
        window.localStorage.setItem('users', JSON.stringify(mockUsersData));
        setUsers(mockUsersData);
      } else {
        try {
          setUsers(JSON.parse(storedUsers));
        } catch {
          // Si hay error al parsear, usar los mock y guardarlos
          window.localStorage.setItem('users', JSON.stringify(mockUsersData));
          setUsers(mockUsersData);
        }
      }
    }, []);

    return (
      <>
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>Administración de Productos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2 mb-4">
              <Button onClick={() => setShowUserManagement(false)}>Gestionar Productos</Button>
              <Button onClick={() => setShowUserManagement(true)}>Gestionar Usuarios</Button>
            </div>

            {showUserManagement ? (
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Usuarios Registrados</h3>
                <div className="grid gap-4">
                  {users.map((user) => (
                    <div key={user.id} className="flex justify-between items-center p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{user.name}</h4>
                        <p className="text-sm text-gray-500">{user.email}</p>
                        <p className="text-sm text-gray-500">Tipo: {user.type}</p>
                      </div>
                      <div className="space-x-2">
                        <Button 
                          variant={user.active ? "default" : "secondary"}
                          size="sm"
                          onClick={() => {
                            const updatedUsers = users.map(u => 
                              u.id === user.id ? {...u, active: !u.active} : u
                            );
                            setUsers(updatedUsers);
                            window.localStorage.setItem('users', JSON.stringify(updatedUsers));
                          }}
                        >
                          {user.active ? 'Desactivar' : 'Activar'}
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => {
                            const updatedUsers = users.filter(u => u.id !== user.id);
                            setUsers(updatedUsers);
                            window.localStorage.setItem('users', JSON.stringify(updatedUsers));
                          }}
                        >
                          Eliminar
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              // Contenido existente de gestión de productos
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">Gestionar Productos</h3>
                  <ProductFormModal onSubmit={handleAddProduct} />
                </div>
                <div className="grid gap-4">
                  {myProducts.map((product) => (
                    <div key={product.id} className="flex justify-between items-center p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{product.name}</h4>
                        <p className="text-sm text-gray-500">Precio: ${product.price}</p>
                      </div>
                      <div className="space-x-2">
                        <ProductFormModal 
                          isEdit 
                          product={product} 
                          onSubmit={(data) => handleEditProduct(product.id, data)} 
                        />
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => handleDeleteProduct(product.id)}
                        >
                          Eliminar
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </>
    );
  };

  const handleViewDetails = (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      setSelectedProduct(product);
      setShowDetailsModal(true);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">
          agroBaires {isLoggedIn && `- ${userType.charAt(0).toUpperCase() + userType.slice(1).replace('_', ' ')}`}
        </h1>
        {isLoggedIn ? (
          <Button variant="outline" onClick={handleLogout}>
            Cerrar sesión
          </Button>
        ) : (
          <Button variant="outline" onClick={() => router.push('/login')}>
            Iniciar sesión
          </Button>
        )}
      </div>

      {isLoggedIn ? (
        // Vista para usuarios autenticados
        <>
          {userType === 'admin' && <AdminContent />}
          {userType === 'vendedor_comprador' ? (
            <Tabs defaultValue="comprar" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="comprar">Comprar</TabsTrigger>
                <TabsTrigger value="vender">Vender</TabsTrigger>
              </TabsList>
              <TabsContent value="comprar">
                <BuyerContent />
              </TabsContent>
              <TabsContent value="vender">
                <SellerContent />
              </TabsContent>
            </Tabs>
          ) : (
            <>
              {userType === 'comprador' && <BuyerContent />}
              {userType === 'vendedor' && <SellerContent />}
            </>
          )}
        </>
      ) : (
        // Vista pública
        <>
          <SearchSection />
          <ProductList 
            products={filteredProducts} 
            onViewDetails={handleViewDetails}
          />
        </>
      )}

      {showDetailsModal && selectedProduct && (
        <Dialog open={showDetailsModal} onOpenChange={setShowDetailsModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{selectedProduct.name}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <img 
                src={selectedProduct.image} 
                alt={selectedProduct.name} 
                className="w-full h-48 object-cover rounded-md"
              />
              <div>
                <p className="font-bold">Precio: ${selectedProduct.price}</p>
                <p>Productor: {selectedProduct.producer}</p>
                <p>Categoría: {selectedProduct.category}</p>
                <p>Ubicación: {selectedProduct.location}</p>
                <p>Descripción: {selectedProduct.description}</p>
              </div>
              {!isLoggedIn && (
                <div className="bg-gray-100 p-4 rounded-md">
                  <p className="text-sm text-gray-600">
                    Para ver información de contacto, por favor 
                    <Button 
                      variant="link" 
                      className="px-2 text-blue-600"
                      onClick={() => router.push('/login')}
                    >
                      inicia sesión
                    </Button>
                  </p>
                </div>
              )}
              {isLoggedIn && (
                <div className="space-y-2">
                  <p>Email: {selectedProduct.email}</p>
                  <p>Teléfono: {selectedProduct.phone}</p>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}