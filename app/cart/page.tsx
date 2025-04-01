'use client';

import { useCart } from '@/app/context/CartContext';

export default function CartPage() {
  const { cartItems, removeFromCart, getTotal, clearCart } = useCart();

  const total = getTotal().toFixed(2);

  const handleCheckout = () => {
    alert('Checkout not implemented yet, but your total is $' + total);
    clearCart(); // Optional: Clear cart after mock checkout
  };

  return (
    <div className="container mx-auto px-4 py-12 text-white">
      <h1 className="text-3xl font-bold mb-6">🛒 Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-400">Your cart is empty.</p>
      ) : (
        <div className="space-y-6">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center bg-gray-800 p-4 rounded shadow-sm border border-gray-700"
            >
              <div>
                <h2 className="text-xl font-semibold">{item.name}</h2>
                <p className="text-gray-400">
                  ${item.price} × {item.quantity}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <p className="text-lg font-semibold text-green-400">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-sm bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="mt-8 border-t border-gray-700 pt-6 text-right">
            <p className="text-xl font-bold text-yellow-400 mb-4">
              Total: ${total}
            </p>
            <button
              onClick={handleCheckout}
              className="bg-yellow-500 text-black font-semibold px-6 py-2 rounded hover:bg-yellow-600 transition"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
