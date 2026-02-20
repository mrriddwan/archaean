import { BsShop } from 'react-icons/bs'
import { BiHome, BiHomeAlt, BiStore, BiUser } from 'react-icons/bi'
import { Link, useLocation } from '@tanstack/react-router'
import { FaHome, FaMapMarkedAlt, FaShoppingCart, FaShopware, FaStore, FaUser } from 'react-icons/fa'

export const TopNavbar = () => {
  const location = useLocation()

  const isActive = (path: string) => location.pathname === path

  const navItems = [
    {
      label: 'Home',
      icon: <FaHome className='size-6' />,
      path: '/',
    },
    {
      label: 'Marketplace',
      icon: <FaStore className='size-6' />,
      path: '/marketplace',
    },
  ]

  const isMarketplace = location.pathname === '/marketplace'

  return (
    <nav className='flex fixed top-0 left-0 w-full bg-white border-b border-gray-200 z-10 justify-between items-center px-6 py-4 shadow-sm'>
      <div className="flex items-center gap-2">
        {navItems.map((item) => (
          <Link
            to={item.path}
            key={item.path}
            className={`p-2 rounded-md transition-colors ${isActive(item.path)
              ? 'text-black'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
          >
            {item.icon}
          </Link>
        ))}
      </div>
      {
        isMarketplace && (
          <div className="flex items-center gap-1">
            <button className="rounded-md transition-colors">
              <FaShoppingCart className='size-5 ' />
            </button>
            <button className="rounded-md transition-colors">
              <FaUser className='size-5 ' />
            </button>
          </div>
        )
      }
    </nav >
  )
}
