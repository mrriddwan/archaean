
import { FaShoppingCart } from 'react-icons/fa'
import { formatPrice } from '../../../util/price'
import type { Product } from '../types'

interface ProductCardProps {
  product: Product
}

export const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="group relative bg-white rounded-lg border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-gray-300">
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-gray-700 transition-colors">
              {product.name}
            </h3>
            <p className="text-sm text-gray-500">{product.shop.name}</p>
          </div>
        </div>
        
        {product.description && (
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">
            {product.description}
          </p>
        )}
        
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <span className="text-2xl font-bold text-gray-900">
            {formatPrice(product.price)}
          </span>
          <button className="flex items-center gap-1 px-4 py-2 text-gray-900 text-sm font-medium rounded-md hover:bg-gray-800 transition-colors">
            + <FaShoppingCart className='size-4' />
          </button>
        </div>
      </div>
    </div>
  )
}

