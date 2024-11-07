import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Leaf } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-8rem)] flex flex-col items-center justify-center bg-gradient-to-b from-green-100 to-green-200 p-4">
      <Card className="w-full max-w-3xl bg-white/80 backdrop-blur">
        <CardContent className="p-8 text-center">
          <div className="flex justify-center mb-6">
            <Leaf className="h-16 w-16 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold mb-4 text-green-800">Bienvenido a agroBaires</h1>
          <p className="text-xl mb-8 text-green-700">
            Conectando productores y consumidores
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/login">
              <Button className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white px-8">
                Iniciar sesión
              </Button>
            </Link>
            <Link href="/register">
              <Button variant="outline" className="w-full sm:w-auto border-green-600 text-green-600 hover:bg-green-50 px-8">
                Registrarse
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="secondary" className="w-full sm:w-auto px-8">
                Buscar Productos
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}