'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuth } from '@/app/context/AuthContext';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  rentPerDay?: number;
  imageUrl?: string;
  category?: string;
}

export default function ProductDetailPage() {
  const { productid } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [mode, setMode] = useState<'buy' | 'rent' | null>(null);
  const [days, setDays] = useState(1);
  const { user } = useAuth();

  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  const taxRate = 0.1;

  useEffect(() => {
    if (!productid) return;
    fetch(`/api/products/${productid}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data._id) return setProduct(null);
        setProduct(data);
      })
      .catch(() => setProduct(null));
  }, [productid]);

  if (product === null) {
    return <div className="p-8 text-red-400">Product not found or failed to load.</div>;
  }

  const rentTotal = product.rentPerDay ? product.rentPerDay * days : 0;
  const rentTotalWithTax = (rentTotal + rentTotal * taxRate).toFixed(2);
  const buyTotalWithTax = (product.price + product.price * taxRate).toFixed(2);

  const handleRentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const total = Number((rentTotal + rentTotal * taxRate).toFixed(2));
  
    const res = await fetch('/api/rent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        productId: product._id,
        name: userInfo.name,
        email: userInfo.email,
        phone: userInfo.phone,
        address: userInfo.address,
        days,
        total,
      }),
    });
  
    if (res.ok) {
      alert('Rent request submitted!');
      setUserInfo({ name: '', email: '', phone: '', address: '' });
      setDays(1);
      setMode(null);
    } else {
      alert('Failed to submit rent request. Please try again.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 text-white">
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.name}
              className="rounded-lg shadow-lg object-cover w-full h-80"
            />
          ) : (
            <div className="bg-gray-700 w-full h-80 flex items-center justify-center rounded-lg">
              No Image
            </div>
          )}
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-gray-400 mb-4">{product.description}</p>
          <p className="mb-2">
            <span className="font-semibold text-green-400">Buy:</span> ${product.price}
          </p>
          {product.rentPerDay && (
            <p className="mb-4">
              <span className="font-semibold text-yellow-400">Rent Per Day:</span> ${product.rentPerDay}
            </p>
          )}
          <div className="flex gap-4">
            <button
              onClick={() => setMode('buy')}
              className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
            >
              Buy
            </button>
            {product.rentPerDay && (
              <button
                onClick={() => setMode('rent')}
                className="bg-green-600 px-4 py-2 rounded hover:bg-green-700"
              >
                Rent
              </button>
            )}
          </div>
        </div>
      </div>

      {mode === 'buy' && (
        <div className="mt-10 bg-gray-900 border border-gray-700 rounded p-6">
          <h2 className="text-xl font-semibold mb-4">Buy Summary</h2>
          <p><strong>Product:</strong> {product.name}</p>
          <p><strong>Price:</strong> ${product.price}</p>
          <p><strong>Tax (10%):</strong> ${product.price * taxRate}</p>
          <p className="text-lg mt-2 text-green-400">
            <strong>Total:</strong> ${buyTotalWithTax}
          </p>
          <p className="mt-4 text-sm text-gray-400">
            * This is just a preview. Checkout and payment coming soon.
          </p>
        </div>
      )}

      {mode === 'rent' && (
        <form onSubmit={handleRentSubmit} className="mt-10 bg-gray-900 border border-gray-700 rounded p-6">
          <h2 className="text-xl font-semibold mb-4">Rent Form</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              placeholder="Full Name"
              value={userInfo.name}
              onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
              className="px-4 py-2 rounded bg-gray-800 border border-gray-600"
            />
            <input
              type="email"
              placeholder="Email"
              value={userInfo.email}
              onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
              className="px-4 py-2 rounded bg-gray-800 border border-gray-600"
            />
            <input
              type="tel"
              placeholder="Phone"
              value={userInfo.phone}
              onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
              className="px-4 py-2 rounded bg-gray-800 border border-gray-600"
            />
            <input
              type="text"
              placeholder="Address"
              value={userInfo.address}
              onChange={(e) => setUserInfo({ ...userInfo, address: e.target.value })}
              className="px-4 py-2 rounded bg-gray-800 border border-gray-600"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">How many days?</label>
            <input
              type="number"
              min={1}
              value={days}
              onChange={(e) => setDays(parseInt(e.target.value))}
              className="w-32 px-4 py-2 rounded bg-gray-800 border border-gray-600"
            />
          </div>

          <div className="text-lg text-yellow-400">
            <strong>Total Rent:</strong> ${rentTotalWithTax}
          </div>
          <p className="mt-2 text-sm text-gray-400">
            * 10% tax applied. This is a preview only.
          </p>
          <button type="submit" className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 py-2 rounded">
            Submit Rent Request
          </button>
        </form>
      )}
    </div>
  );
}
