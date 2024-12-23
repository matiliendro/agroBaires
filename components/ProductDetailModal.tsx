import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Product } from "@/types/product";
import Image from "next/image";

interface ProductDetailModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductDetailModal({ product, isOpen, onClose }: ProductDetailModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{product.name}</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative h-64">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover rounded-lg"
            />
          </div>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">Detalles del Producto</h3>
              <p>Categoría: {product.category}</p>
              <p>Precio: ${product.price}</p>
              <p>Productor: {product.producer}</p>
            </div>
            
            <div>
              <h3 className="font-semibold">Información de Contacto</h3>
              <p>Teléfono: {product.phone || "No disponible"}</p>
              <p>Email: {product.email || "No disponible"}</p>
              <p>Ubicación: {product.location || "No especificada"}</p>
            </div>
            
            <div className="space-x-2">
              <Button onClick={() => window.location.href = `tel:${product.phone}`}>
                Llamar
              </Button>
              <Button onClick={() => window.location.href = `mailto:${product.email}`}>
                Enviar Email
              </Button>
              <Button variant="outline" onClick={onClose}>
                Cerrar
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 