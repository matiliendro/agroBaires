"use client"

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ProductList from '@/components/ProductList';
import ProductFormModal from '@/components/ProductFormModal';
import { Product } from '@/types/product';

const getUserType = () => {
  return localStorage.getItem('userType') || 'comprador';
};

export default function Dashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [userType, setUserType] = useState('');
  const [location, setLocation] = useState('');

  useEffect(() => {
    setUserType(getUserType());
    const mockProducts: Product[] = [
      { id: '1', name: 'Manzanas', category: 'Frutas', price: 100, producer: 'Productor A' },
      { id: '2', name: 'Zanahorias', category: 'Verduras', price: 50, producer: 'Productor B' },
      { id: '3', name: 'Naranjas', category: 'Frutas', price: 80, producer: 'Productor C' },
    ];
    setProducts(mockProducts);
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

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (category === 'all' || product.category === category)
  );

  const BuyerContent = () => (
    <>
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Buscar Productos</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Ubicación</label>
            <Input
              placeholder="Ingresa tu ubicación"
              value={location}
              onChange={handleLocationChange}
              className="w-full"
            />
          </div>
          <div className="flex space-x-2">
            <Input
              placeholder="¿Qué estás buscando?"
              value={searchTerm}
              onChange={handleSearchChange}
              className="flex-grow"
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
      <ProductList products={filteredProducts} />
    </>
  );

  const SellerContent = () => (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>Mis Productos en Venta</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Productos Publicados</h3>
          <ProductFormModal onSubmit={handleAddProduct} />
        </div>
        <div className="grid gap-4">
          {products.map((product) => (
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

  const AdminContent = () => (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>Administración de Productos</CardTitle>
      </CardHeader>
      <CardContent>
        <Button className="mr-2">Agregar Producto</Button>
        <Button variant="outline">Gestionar Usuarios</Button>
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