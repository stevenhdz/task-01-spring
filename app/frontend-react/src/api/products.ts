import axiosInstance from './axiosInstance';

export interface Product {
  id?: number;
  name: string;
  category: {
    id: number;
    name?: string;
  };
  price: number;
  imageUrl: string;
  description: string;
}

export const getProducts = (category?: string, token?: string) => {
  console.log('Obteniendo productos con categoría:', category, 'y token:', token);
  const url = category ? `/products?category=${encodeURIComponent(category)}` : '/products';
  return axiosInstance.get(url, { headers: { Authorization: `Bearer ${token}` } });
};

export const getProductById = (id: number, token?: string) => {
  console.log('Obteniendo producto por ID:', id, 'y token:', token);
  return axiosInstance.get(`/products/${id}`, { headers: { Authorization: `Bearer ${token}` } });
};
  
export const searchProducts = (query: string, token?: string) => {
  console.log('Buscando productos con query:', query, 'y token:', token);
  return axiosInstance.get(`/products/search?q=${encodeURIComponent(query)}`, { headers: { Authorization: `Bearer ${token}` } });
};

export const createProduct = (product: Product, token?: string) => {
  console.log('Creando producto con datos:', product, 'y token:', token);
  return axiosInstance.post('/products', product, { headers: { Authorization: `Bearer ${token}` } });
};
