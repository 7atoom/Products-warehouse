export interface Product {
  _id?: string;
  name: string;
  description: string;
  price: number;

  status: 'inStock' | 'lowStock' | 'outOfStock';

  supplier: string | null;
  category: {
    _id: string;
    name: string;
  } | string; 
  imageUrl: string;
  createdAt: string;
  productCode: string;

  location: string;
  quantity: number;
  minStock: number;
  lastRestocked: string | null;
}
