
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
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [categories, setCategories] = useState<string[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    handleFilter();
  }, [search, categoryFilter, products]);

  const fetchProducts = async () => {
    const response = await fetch('/api/products');
    const data = await response.json();
    setProducts(data);
    setFilteredProducts(data);

    const uniqueCategories: string[] = Array.from(
      new Set(data.map((p: Product) => p.category).filter((c): c is string => Boolean(c)))
    );
    setCategories(uniqueCategories);
  };

  const handleFilter = () => {
    let filtered = [...products];

    if (search.trim()) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (categoryFilter) {
      filtered = filtered.filter((p) => p.category === categoryFilter);
    }

    setFilteredProducts(filtered);
  };

  return (
    <div className="container mx-auto p-4 mt-12">
      <h1 className="text-2xl font-bold mb-4">Products</h1>

      {/* Search and Filter Controls */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search gadgets..."
          className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="w-full md:w-1/4 px-4 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <RecentlyViewed />

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
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
              {product.imageUrl ? (
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
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
