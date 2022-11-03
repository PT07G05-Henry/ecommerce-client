import React from "react";
import img1 from "./assets Banner/img1.png";
import img2 from "./assets Banner/img2.png";
import img3 from "./assets Banner/img3.png";
import img4 from "./assets Banner/img4.png";
import img5 from "./assets Banner/img5.png";
import img6 from "./assets Banner/img6.png";
import img7 from "./assets Banner/img7.png";
import img8 from "./assets Banner/img8.png";
import img9 from "./assets Banner/img9.png";
import img10 from "./assets Banner/img10.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "./Banner.css";

const Banner = () => {
  return (
    <div className="container">
      <>
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          modules={[Autoplay, Pagination]}
          className="mySwiper"
        >
          <SwiperSlide>
            <img className="image__banner" src={img1} alt="banner" />
          </SwiperSlide>
          <SwiperSlide>
            <img className="image__banner" src={img2} alt="banner" />
          </SwiperSlide>
          <SwiperSlide>
            <img className="image__banner" src={img3} alt="banner" />
          </SwiperSlide>
          <SwiperSlide>
            <img className="image__banner" src={img4} alt="banner" />
          </SwiperSlide>
          <SwiperSlide>
            <img className="image__banner" src={img5} alt="banner" />
          </SwiperSlide>
          <SwiperSlide>
            <img className="image__banner" src={img6} alt="banner" />
          </SwiperSlide>
          <SwiperSlide>
            <img className="image__banner" src={img7} alt="banner" />
          </SwiperSlide>
          <SwiperSlide>
            <img className="image__banner" src={img8} alt="banner" />
          </SwiperSlide>
          <SwiperSlide>
            <img className="image__banner" src={img9} alt="banner" />
          </SwiperSlide>
          <SwiperSlide>
            <img className="image__banner" src={img10} alt="banner" />
          </SwiperSlide>
        </Swiper>
      </>
    </div>
  );
};

export default Banner;
