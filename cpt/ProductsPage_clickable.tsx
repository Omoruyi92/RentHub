
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/context/AuthContext';
import RecentlyViewed from '../components/RecentlyViewed';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  category?: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [category, setCategory] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isAddFormVisible, setIsAddFormVisible] = useState(false);

  const { user, token } = useAuth();
  const isAdmin = user?.role === 'admin';

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const response = await fetch('/api/products');
    const data = await response.json();
    setProducts(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAdmin) {
      setError('Only admins can manage products');
      return;
    }

    try {
      if (editingId) {
        await updateProduct(editingId);
        setSuccessMessage('Product updated successfully!');
      } else {
        await addProduct();
        setSuccessMessage('Product added successfully!');
        setIsAddFormVisible(false);
      }
      resetForm();
      fetchProducts();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      setError('Failed to save product');
    }
  };

  const addProduct = async () => {
    const response = await fetch('/api/products', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        name,
        description,
        price: parseFloat(price),
        imageUrl,
        category,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to add product');
    }
  };

  const updateProduct = async (id: string) => {
    const response = await fetch(`/api/products/${id}`, {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        name,
        description,
        price: parseFloat(price),
        imageUrl,
        category,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to update product');
    }
  };

  const deleteProduct = async (id: string) => {
    if (!isAdmin) {
      setError('Only admins can delete products');
      return;
    }

    if (confirm('Are you sure you want to delete this product?')) {
      const response = await fetch(`/api/products/${id}`, { 
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        setError('Failed to delete product');
        return;
      }

      fetchProducts();
    }
  };

  const startEditing = (product: Product) => {
    if (!isAdmin) {
      setError('Only admins can edit products');
      return;
    }

    setEditingId(product._id);
    setName(product.name);
    setDescription(product.description);
    setPrice(product.price.toString());
    setImageUrl(product.imageUrl || '');
    setCategory(product.category || '');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsAddFormVisible(true);
  };

  const resetForm = () => {
    setName('');
    setDescription('');
    setPrice('');
    setImageUrl('');
    setCategory('');
    setEditingId(null);
    setError(null);
  };

  return (
    <div className="container mx-auto p-4 mt-12">
      <h1 className="text-2xl font-bold mb-4">Products</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          {error}
          <button onClick={() => setError(null)} className="absolute top-0 right-0 px-4 py-3">×</button>
        </div>
      )}

      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
          {successMessage}
          <button onClick={() => setSuccessMessage(null)} className="absolute top-0 right-0 px-4 py-3">×</button>
        </div>
      )}

      {isAdmin && (
        <div className="mb-6">
          <button 
            onClick={() => {
              setIsAddFormVisible(!isAddFormVisible);
              if (editingId) setEditingId(null);
              resetForm();
            }}
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
          >
            {isAddFormVisible ? 'Cancel' : 'Add New Product'}
          </button>
        </div>
      )}

      {isAddFormVisible && (
        <form onSubmit={handleSubmit} className="mt-4 p-6 bg-gray-900 rounded-lg shadow-lg border border-gray-700">
          {/* form fields */}
        </form>
      )}

      <RecentlyViewed />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Link
            key={product._id}
            href={`/products/${product._id}`}
            onClick={() => {
              const viewedProduct = {
                id: product._id,
                name: product.name,
                image: product.imageUrl || '',
                price: product.price,
              };
              let viewed = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
              viewed = viewed.filter((g: any) => g.id !== viewedProduct.id);
              viewed.unshift(viewedProduct);
              viewed = viewed.slice(0, 8);
              localStorage.setItem('recentlyViewed', JSON.stringify(viewed));
            }}
            className="bg-gray-800 rounded-lg overflow-hidden shadow-lg block hover:ring-2 hover:ring-blue-500 transition"
          >
            <div className="w-full h-48 bg-gray-700 flex items-center justify-center">
              {product.imageUrl && product.imageUrl.trim() !== '' ? (
                <img 
                  src={product.imageUrl} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const imgElement = e.currentTarget;
                    imgElement.style.display = 'none';
                    const parentDiv = imgElement.parentElement!;
                    parentDiv.innerHTML = `
                      <div class='w-full h-full flex items-center justify-center bg-gray-600 text-gray-300'>
                        Image Not Available
                      </div>
                    `;
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-600 text-gray-300">
                  No Image Available
                </div>
              )}
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <span className="text-green-500 font-bold">${product.price}</span>
              </div>
              {product.category && (
                <span className="inline-block bg-gray-700 text-sm px-2 py-1 rounded mb-2">
                  {product.category}
                </span>
              )}
              <p className="text-gray-400 mb-4">{product.description}</p>
              {isAdmin && (
                <div className="flex space-x-2">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      startEditing(product);
                    }}
                    className="flex-1 bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      deleteProduct(product._id);
                    }}
                    className="flex-1 bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
