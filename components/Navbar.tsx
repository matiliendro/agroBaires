"use client"

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = () => {
      const userType = typeof window !== 'undefined' ? localStorage.getItem('userType') : null;
      console.log('Estado de login:', !!userType);
      setIsLoggedIn(!!userType);
    };

    checkLoginStatus();

    window.addEventListener('focus', checkLoginStatus);
    window.addEventListener('storage', checkLoginStatus);

    return () => {
      window.removeEventListener('focus', checkLoginStatus);
      window.removeEventListener('storage', checkLoginStatus);
    };
  }, []);

  const handleLogout = () => {
    const currentProducts = localStorage.getItem('products');
    
    localStorage.removeItem('userType');
    localStorage.removeItem('currentUser');
    setIsLoggedIn(false);
    
    if (currentProducts) {
      localStorage.setItem('products', currentProducts);
    }
    
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
          </div>
        </div>
      </div>
    </nav>
  );
}