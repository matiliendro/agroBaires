"use client"

import { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ProductList from '@/components/ProductList';
import ProductFormModal from '@/components/ProductFormModal';
import SearchInput from '@/components/SearchInput';
import { Product } from '@/types/product';

// Datos de ejemplo más extensos para mejor testing
const mockProductsData: Product[] = [
  { id: '1', name: 'Manzanas Rojas', category: 'Frutas', price: 100, producer: 'Productor A' },
  { id: '2', name: 'Manzanas Verdes', category: 'Frutas', price: 90, producer: 'Productor A' },
  { id: '3', name: 'Mandarinas', category: 'Frutas', price: 85, producer: 'Productor B' },
  { id: '4', name: 'Zanahorias', category: 'Verduras', price: 50, producer: 'Productor B' },
  { id: '5', name: 'Naranjas', category: 'Frutas', price: 80, producer: 'Productor C' },
  { id: '6', name: 'Mangos', category: 'Frutas', price: 120, producer: 'Usuario Actual' },
  { id: '7', name: 'Melones', category: 'Frutas', price: 150, producer: 'Usuario Actual' },
];

export default function Dashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [userType, setUserType] = useState('');
  const [location, setLocation] = useState('');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const storedUserType = localStorage.getItem('userType') || 'comprador';
    setUserType(storedUserType);
    setProducts(mockProductsData);
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    setProducts([...products, newProduct]);
  };

  const handleEditProduct = (id: string, productData: any) => {
    setProducts(products.map(product => 
      product.id === id ? { ...product, ...productData } : product
    ));
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter(product => product.id !== id));
  };

  // Usando useMemo para optimizar el filtrado de productos
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

  if (!isClient) {
    return null;
  }

  const SearchSection = () => (
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
        <div className="flex space-x-2">
          <SearchInput
            placeholder="¿Qué estás buscando?"
            value={searchTerm}
            onChange={handleSearchChange}
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
          <Button>Buscar</Button>
        </div>
      </CardContent>
    </Card>
  );

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
      <ProductList products={filteredProducts} />
    </>
  );

  const BuyerContent = () => (
    <>
      <SearchSection />
      <ProductList products={filteredProducts} />
    </>
  );

  const AdminContent = () => (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>Administración de Productos</CardTitle>
      </CardHeader>
      <CardContent>
      <Button className="mr-2">Agregar Producto</Button>
        <Button  className="mr-2">Gestionar Usuarios</Button>
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
      </CardContent>
    </Card>
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">agroBaires - {userType.charAt(0).toUpperCase() + userType.slice(1)}</h1>
      
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
    </div>
  );
}