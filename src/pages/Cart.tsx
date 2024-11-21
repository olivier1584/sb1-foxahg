import React from 'react';
import { useCartStore } from '../store/cartStore';
import { Trash2, Plus, Minus } from 'lucide-react';

export default function Cart() {
  const { items, removeItem, updateQuantity } = useCartStore();

  const total = items.length;

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

      {items.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">Your cart is empty</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow">
          <div className="divide-y">
            {items.map((item) => (
              <div key={item.article.id} className="p-6 flex items-center gap-6">
                <img
                  src={item.article.url_image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e'}
                  alt={item.article.libelle}
                  className="w-24 h-24 object-cover rounded"
                />
                
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">{item.article.libelle}</h3>
                  <p className="text-sm text-gray-500">Code: {item.article.code}</p>
                  <p className="text-sm text-gray-500">Category: {item.article.famille}</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(item.article.id, Math.max(1, item.quantity - 1))}
                    className="p-1 rounded-md hover:bg-gray-100"
                  >
                    <Minus size={16} />
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.article.id, Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-16 text-center border rounded-md"
                  />
                  <button
                    onClick={() => updateQuantity(item.article.id, item.quantity + 1)}
                    className="p-1 rounded-md hover:bg-gray-100"
                  >
                    <Plus size={16} />
                  </button>
                </div>

                <button
                  onClick={() => removeItem(item.article.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-md"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>

          <div className="p-6 bg-gray-50 border-t">
            <div className="flex justify-between items-center">
              <p className="text-lg font-semibold">Total Items: {total}</p>
              <button
                className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition-colors"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}