"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import SearchInput from '@/components/SearchInput';

interface SearchSectionProps {
  location: string;
  searchTerm: string;
  category: string;
  onLocationChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCategoryChange: (value: string) => void;
}

export default function SearchSection({
  location,
  searchTerm,
  category,
  onLocationChange,
  onSearchChange,
  onCategoryChange
}: SearchSectionProps) {
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
            onChange={onLocationChange}
            className="w-full"
            autoComplete="street-address"
          />
        </div>
        <div className="flex space-x-2">
          <SearchInput
            placeholder="¿Qué estás buscando?"
            value={searchTerm}
            onChange={onSearchChange}
            className="flex-grow"
            autoComplete="off"
          />
          <Select onValueChange={onCategoryChange} value={category}>
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
} 