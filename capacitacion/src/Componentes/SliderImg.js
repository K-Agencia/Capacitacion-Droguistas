import React from 'react';
import { slider } from '../Constantes/Imagenes';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper';
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const SliderImg = () => {
   return (
      <div className='SliderImg'>
         <Swiper
            spaceBetween={50} slidesPerView={1} navigation={true} loop={true} centeredSlides={true}
            autoplay={{
               delay: 10000,
               disableOnInteraction: false,
            }}
            pagination={{
               dynamicBullets: true,
            }}
            modules={[Pagination, Navigation, Autoplay]}
         >
            {slider.map((img, index) => (
               <SwiperSlide key={index}>
                  <img src={img.imgSlider} alt="" />
               </SwiperSlide>
            ))}
         </Swiper>
      </div>
   );
};

export default SliderImg;