// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import Slide from './Slide';

import bgImgOne from '../assets/images/carousel1.jpg'
import bgImgTwo from '../assets/images/carousel2.jpg'
import bgImgThree from '../assets/images/carousel3.jpg'

export default function Carousel() {
  return (
    <div className='container px-6 py-10 mx-auto'>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
            <Slide image={bgImgOne} text='Get your web development Projects done in minutes'/>
        </SwiperSlide>
        <SwiperSlide>
            <Slide image={bgImgTwo} text={'Get your web development Projects done in minutes'}/>
        </SwiperSlide>
        <SwiperSlide>
            <Slide image={bgImgThree}  text={'Get your web development Projects done in minutes'}/>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
