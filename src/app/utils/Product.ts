export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;

  status: 'inStock' | 'lowStock' | 'outOfStock';

  category: string;
  imageUrl: string;
  createdAt: string;
  productCode: string;

  location: string;
  quantity: number;
  minStock: number;
}
