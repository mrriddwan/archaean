import { BsShop } from 'react-icons/bs'
import { BiHome } from 'react-icons/bi'
import { Link } from '@tanstack/react-router'

export const TopNavbar = () => {
 return (
  <div className='flex fixed top-0 left-0 w-full bg-black z-10 justify-between items-center p-4'>
   <Link to="/">
    <BiHome className='size-6' />
   </Link>
   <Link to="/marketplace">
    <BsShop className='size-6' />
   </Link>
  </div>
 )
}
