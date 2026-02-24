
import { Link, useLocation } from '@tanstack/react-router'
import { FaHome, FaShoppingCart, FaStore } from 'react-icons/fa'

import { AuthButton } from '../../features/auth/auth-button'

const CHILL_AURORA_GRADIENT =
  'linear-gradient(90deg, #67e8f9, #a5b4fc, #c4b5fd, #5eead4, #67e8f9)'

export const TopNavbar = () => {
  const location = useLocation()

  const isActive = (path: string) => location.pathname === path

  const navItems = [
    {
      label: 'Home',
      icon: <FaHome className="size-5 sm:size-6" />,
      path: '/',
    },
    {
      label: 'Marketplace',
      icon: <FaStore className="size-5 sm:size-6" />,
      path: '/marketplace',
    },
  ]

  const isMarketplace = location.pathname === '/marketplace'

  return (
    <nav className="flex fixed top-0 left-0 w-full backdrop-blur-md z-10 justify-between items-center px-4 py-4 shadow-sm sm:px-6">
      <div className="flex items-center gap-1 sm:gap-2">
        {navItems.map((item) => (
          <Link
            to={item.path}
            key={item.path}
            className={`flex items-center gap-1.5 p-2 rounded-md transition-colors sm:gap-2 ${
              isActive(item.path)
                ? ''
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            {isActive(item.path) ? (
              <>
                <span
                  className="bg-clip-text text-transparent font-medium text-sm sm:text-base"
                  style={{
                    backgroundImage: CHILL_AURORA_GRADIENT,
                    backgroundSize: '200% auto',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                  }}
                >
                  {item.label}
                </span>
                <span className="shrink-0 text-cyan-400">{item.icon}</span>
              </>
            ) : (
              <>
                <span className="hidden text-sm font-medium text-slate-400 sm:inline">
                  {item.label}
                </span>
                {item.icon}
              </>
            )}
          </Link>
        ))}
      </div>
      {
        isMarketplace && (
          <div className="flex items-center gap-4">
            <button className="rounded-md p-2">
              <FaShoppingCart className='size-5 ' />
            </button>
            <AuthButton />
          </div>
        )
      }
    </nav >
  )
}


