export interface Product {
  id?: string;
  name: string;
  description: string;
  price: number;

  status: 'inStock' | 'lowStock' | 'outOfStock';

  supplier: string | null;
  category: string;
  imageUrl: string;
  createdAt: string;
  productCode: string;

  location: string;
  quantity: number;
  minStock: number;
  lastRestocked: string | null;
}
