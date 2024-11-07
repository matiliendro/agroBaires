"use client"

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userType = localStorage.getItem('userType');
    setIsLoggedIn(!!userType);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userType');
    setIsLoggedIn(false);
    router.push('/login');
  };

  return (
    <nav className="bg-green-800 text-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold">
            agroBaires
          </Link>
          <div className="flex items-center space-x-4">
            <Link href="/dashboard">
              <Button variant="ghost" className="text-white hover:text-green-200">
                Búsqueda
              </Button>
            </Link>
            {isLoggedIn && (
              <Button 
                variant="outline" 
                className="text-white hover:text-green-800 hover:bg-white"
                onClick={handleLogout}
              >
                Cerrar Sesión
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}