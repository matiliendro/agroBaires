"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Mock de la API de registro
const mockRegisterAPI = async (userData: any) => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  if (userData.email && userData.password) {
    return { success: true, message: 'Registro exitoso', userType: userData.userType };
  } else {
    throw new Error('Error en el registro');
  }
};

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await mockRegisterAPI({ name, email, password, userType });
      if (result.success) {
        alert("Registro exitoso. Tu cuenta ha sido creada correctamente.");
        router.push('/dashboard');
      }
    } catch (error) {
      alert("Error en el registro. Hubo un problema al crear tu cuenta. Por favor, intenta de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-green-100 to-green-200">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Registrarse</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre</Label>
              <Input
                id="name"
                type="text"
                placeholder="Tu nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Correo electrónico</Label>
              <Input
                id="email"
                type="email"
                placeholder="correo@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="userType">Tipo de usuario</Label>
              <Select onValueChange={setUserType} value={userType}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona un tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vendedor">Vendedor</SelectItem>
                  <SelectItem value="comprador">Comprador</SelectItem>
                  <SelectItem value="vendedor_comprador">Vendedor y Comprador</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Registrando...' : 'Registrarse'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}