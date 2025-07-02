import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const About = () => {
  return (
    <div>

      <div className='text-2xl text-center pt-14 border-t'>
          <Title text1={'ABOUT'} text2={'US'} />
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'>
          <img className='w-full md:max-w-[450px]'src={assets.about} alt="" />
          <div className='flex flex-col justify-center gap-6 md:w-2/4 text-black'>
              <p>Nandi Agrotech is your one-stop destination for high-quality agricultural equipment designed to enhance productivity and efficiency. We offer a wide range of farming tools, including tractors, plows, seeders, irrigation systems, and more, ensuring that farmers get the best solutions for their needs. Our products are built for durability and performance, helping you cultivate success with ease.</p>
              <p>At Nandi Agrotech, we believe in empowering farmers with modern technology at affordable prices. Whether you need advanced machinery or essential farming tools, our collection is carefully selected to support every stage of cultivation. With great deals and reliable customer service, we are committed to making farming easier, more efficient, and more profitable for you! 🚜🌿</p>
              <b className='text-gray-800'>Our Mission</b>
              <p>At Nandi Agrotech, our mission is to empower farmers with high-quality, reliable, and affordable agricultural equipment. We strive to enhance farming efficiency through innovative solutions, helping growers maximize productivity while reducing effort.

By providing advanced tools and machinery, we aim to support sustainable agriculture and contribute to the growth of the farming community. Our commitment is to deliver the best products and services, ensuring that every farmer has access to the technology they need for a successful harvest. 🌱💪</p>
          </div>
      </div>

      <div className=' text-xl py-4'>
          <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>

      <div className='flex flex-col md:flex-row text-sm mb-20'>
          <div className='border border-black px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
            <b className='text-black'>Quality Assurance:</b>
            <p className=' text-black'>We meticulously select and vet each product to ensure it meets our stringent quality standards.</p>
          </div>
          <div className='border border-black px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
            <b className='text-black'>Convenience:</b>
            <p className=' text-black'>With our user-friendly interface and hassle-free ordering process, shopping has been easier.</p>
          </div>
          <div className='border border-black px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
            <b className='text-black'>Exceptional Customer Service:</b>
            <p className=' text-black'>Our team of dedicated professionals is here to assist you the way, ensuring your satisfaction is our top priority.</p>
          </div>
      </div>

      <NewsletterBox/>
      
    </div>
  )
}

export default About
