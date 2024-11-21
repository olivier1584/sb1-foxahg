import React from 'react';
import { Article } from '../types';
import { Plus, Minus } from 'lucide-react';
import { useCartStore } from '../store/cartStore';

interface ArticleCardProps {
  article: Article;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  const [quantity, setQuantity] = React.useState(1);
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem(article, quantity);
    setQuantity(1);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src={article.url_image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e'}
        alt={article.libelle}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900">{article.libelle}</h3>
        <p className="text-sm text-gray-500">Code: {article.code}</p>
        <p className="text-sm text-gray-500">Category: {article.famille}</p>
        
        <div className="mt-4 flex items-center gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="p-1 rounded-md hover:bg-gray-100"
            >
              <Minus size={16} />
            </button>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-16 text-center border rounded-md"
            />
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="p-1 rounded-md hover:bg-gray-100"
            >
              <Plus size={16} />
            </button>
          </div>
          
          <button
            onClick={handleAddToCart}
            className="flex-1 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}