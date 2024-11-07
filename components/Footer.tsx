import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-green-800 text-white py-4 text-center">
      <p>&copy; {new Date().getFullYear()} agroBaires. Todos los derechos reservados.</p>
    </footer>
  );
}

export default Footer;