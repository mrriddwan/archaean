
import { FaShoppingCart } from 'react-icons/fa'
import { formatPrice } from '../../../util/price'
import type { Product } from '../../../types/product/product'

interface ProductCardProps {
  product: Product
}

export const ProductCard = ({ product }: ProductCardProps) => {

  const handleAddToCart = () => {
    console.log('Add to cart')
  }
  return (
    <div className="group relative bg-white rounded-lg border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-gray-300">
      <div className="flex flex-col gap-4 p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-gray-700 transition-colors">
              {product.name}
            </h3>
            <p className="text-sm text-gray-500">{product.shop?.name}</p>
          </div>
        </div>

        <div className="w-full h-48 object-cover rounded-lg overflow-hidden">
          <img src={product.image_url} alt={product.name} className="size-full object-cover" />
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-gray-900">
            {formatPrice(product.price)}
          </span>
          <button className="flex items-center gap-1 px-4 py-2 text-gray-900 text-sm font-medium rounded-md border border-gray-300 shadow-sm hover:bg-gray-800 transition-colors " onClick={handleAddToCart}>
            + <FaShoppingCart className='size-4' />
          </button>
        </div>
      </div>
    </div>
  )
}

