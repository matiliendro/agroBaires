"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Mock de la API de inicio de sesión
const mockLoginAPI = async (credentials: { email: string; password: string }) => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  const users = [
    { email: 'admin@example.com', password: 'admin123', userType: 'admin' },
    { email: 'vendedor@example.com', password: 'vendedor123', userType: 'vendedor' },
    { email: 'comprador@example.com', password: 'comprador123', userType: 'comprador' },
    { email: 'ambos@example.com', password: 'ambos123', userType: 'vendedor_comprador' },
  ];

  const user = users.find(u => u.email === credentials.email && u.password === credentials.password);
  if (user) {
    return { success: true, userType: user.userType };
  } else {
    throw new Error('Credenciales inválidas');
  }
};

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await mockLoginAPI({ email, password });
      if (result.success) {
        alert(`Inicio de sesión exitoso. Bienvenido, ${result.userType}!`);
        router.push('/dashboard');
      }
    } catch (error) {
      alert("Error en el inicio de sesión. Por favor, verifica tus credenciales.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-green-100 to-green-200">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Iniciar sesión</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
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
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}