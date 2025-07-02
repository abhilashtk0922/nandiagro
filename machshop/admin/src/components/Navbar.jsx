import React from 'react'
import {assets} from '../assets/assets'

const Navbar = ({setToken}) => {
  return (
    <div className='w-full fixed top-0 left-0 right-0 flex items-center justify-between py-2 font-medium bg-orange-800 text-white px-6'>
        <p className='w-[max(10%,80px)] text-lg font-bold text-black'>Nandi Agrotech</p>

        <button onClick={()=>setToken('')} className='bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm'>Logout</button>
    </div>
  )
}

export default Navbar