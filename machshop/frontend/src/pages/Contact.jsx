import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const Contact = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-14 border-t'>
        <Title text1={'CONTACT'} text2={'US'} />
      </div>

      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
        <img className='w-full md:max-w-[480px]' src={assets.contact} alt="Contact" />
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold text-xl text-black'>Our Store</p>
          <p className='text-black'>
            Mayasandra Road <br /> Turuvekere, Karnataka, 572227
          </p>
          <p className='text-black'>
            Tel: Kiran Kumar (+91) 6366542135, G R Rangegowda(+91) 9448536281 , Chetan (+91) 990050585<br />
            Email: nandiagrotech363@gmail.com
          </p>
          <p className='font-semibold text-xl text-black'>Nandi Agrotech</p>
          <p className='text-black'>Learn more about our terms and conditions.</p>
          <a 
            href="https://www.google.com/maps/place/+Turuvekere,+Karnataka+572227" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <button className='text-black border border-black py-2 px-4 hover:bg-black hover:text-white transition-all duration-500'>
              Explore
            </button>
          </a>
        </div>
      </div>

      <NewsletterBox />
    </div>
  )
}

export default Contact
