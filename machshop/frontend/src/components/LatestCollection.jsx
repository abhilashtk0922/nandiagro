import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';

const LatestCollection = () => {

    const { products } = useContext(ShopContext);
    const [latestProducts,setLatestProducts] = useState([]);

    useEffect(()=>{
        setLatestProducts(products.slice(0,10));
    },[products])

  return (
    <div className='my-10'>
      <div className='text-center py-8 text-3xl'>
          <Title text1={'OUR'} text2={'COLLECTIONS'} />
          <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-black'>
          "A complete range of high-quality agricultural equipment, tailored for every farming need!" 🚜🌿
          </p>
      </div>

      {/* Rendering Products */}
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 gap-y-6 p-10'>
        {
          latestProducts.map((item,index)=>(
            <ProductItem key={index} id={item._id} image={item.image} name={item.name} />
          ))
        }
      </div>
    </div>
  )
}

export default LatestCollection
