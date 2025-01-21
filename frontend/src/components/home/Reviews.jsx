import React from 'react'
import { Swiper, SwiperSlide } from "../../shared/Swiper";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import { motion } from "framer-motion";

const Reviews = () => {
  return (
    <div>
      <div className='md:px-10 max-lg:px-10 max-sm:px-5'>
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 1 }}
        >
          <h3 className="text-2xl font-semibold text-blue-600 mb-4 py-4">What Our Clients Say</h3>
        </motion.div>
        <Swiper
          modules={[Autoplay]}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          spaceBetween={30}
          breakpoints={{
            1200: { slidesPerView: 3 },
            768: { slidesPerView: 2 },
            320: { slidesPerView: 1 },
          }}
        >
          
          <SwiperSlide>
              <div className="bg-white p-8 rounded-lg shadow-lg mx-auto mb-8 max-w-3xl">
                
                <p className="text-lg text-gray-700 italic mb-4">
                  "Thanks to the grant I received, I was able to expand my small business and hire 
                  more staff. The process was easy and the team was very supportive every step of the way."
                </p>
                <p className="text-lg text-gray-700 font-semibold">- Sarah J., Small Business Owner</p>
              </div>
            </SwiperSlide>
            
            <SwiperSlide>
              <div className="bg-white p-8 rounded-lg shadow-lg mx-auto mb-8 max-w-3xl">
                
                <p className="text-lg text-gray-700 italic mb-4">
                  "I received my loan within days, allowing me to expand my business seamlessly. Highly recommended service!."
                </p>
                <p className="text-lg text-gray-700 font-semibold">- Jonah EKe., Boutique Company Owner</p>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="bg-white p-8 rounded-lg shadow-lg mx-auto mb-8 max-w-3xl">
                
                <p className="text-lg text-gray-700 italic mb-4">
                  "The grant application process was effortless, and the funds arrived quickly, helping us achieve our project goals."
                </p>
                <p className="text-lg text-gray-700 font-semibold">- Shedrach</p>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="bg-white p-8 rounded-lg shadow-lg mx-auto mb-8 max-w-3xl">
                
                <p className="text-lg text-gray-700 italic mb-4">
                  "Exceptional service! I got approval faster than expected, and the money arrived directly in my account."
                </p>
                <p className="text-lg text-gray-700 font-semibold">- Divine</p>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="bg-white p-8 rounded-lg shadow-lg mx-auto mb-8 max-w-3xl">
                
                <p className="text-lg text-gray-700 italic mb-4">
                  "Their professionalism and dedication ensured my loan application succeeded without complications. Highly grateful for their support!"
                </p>
                <p className="text-lg text-gray-700 font-semibold">- Christian Maduka</p>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="bg-white p-8 rounded-lg shadow-lg mx-auto mb-8 max-w-3xl">
                
                <p className="text-lg text-gray-700 italic mb-4">
                  "Reliable and trustworthy! I never thought getting funding for my small business could be this fast."
                </p>
                <p className="text-lg text-gray-700 font-semibold">- Ann Eze</p>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="bg-white p-8 rounded-lg shadow-lg mx-auto mb-8 max-w-3xl">
                
                <p className="text-lg text-gray-700 italic mb-4">
                  "Their stellar online form made applying for a loan simple and stress-free. A truly hassle-free experience!"
                </p>
                <p className="text-lg text-gray-700 font-semibold">- George L.</p>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="bg-white p-8 rounded-lg shadow-lg mx-auto mb-8 max-w-3xl">
                
                <p className="text-lg text-gray-700 italic mb-4">
                  "This platform connected me to the perfect grant opportunity, and the process was smooth and transparent."
                </p>
                <p className="text-lg text-gray-700 font-semibold">- Livinus N.</p>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="bg-white p-8 rounded-lg shadow-lg mx-auto mb-8 max-w-3xl">
                
                <p className="text-lg text-gray-700 italic mb-4">
                  "Securing a grant through this platform was straightforward, with funds delivered quickly to fuel my project!"
                </p>
                <p className="text-lg text-gray-700 font-semibold">- Grace J., Small Business Owner</p>
              </div>
            </SwiperSlide>
        </Swiper>
      </div>
    </div>
  )
}

export default Reviews
