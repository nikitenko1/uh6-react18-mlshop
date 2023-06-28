import React from "react";
import { Navigation, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css"; // Navigation module
import "./banner.css";
import { v4 } from "uuid";

const slider = [
  { image: "/banners/rozetka1.jpg" },
  { image: "/banners/rozetka2.jpg" },
  { image: "/banners/rozetka3.jpg" },
  { image: "/banners/rozetka4.jpg" },
  { image: "/banners/rozetka5.jpg" },
  { image: "/banners/rozetka6.jpg" },
  { image: "/banners/silpo0.png" },
  { image: "/banners/silpo1.png" },
  { image: "/banners/silpo2.jpg" },
  { image: "/banners/rozetka7.jpg" },
];

export default function Banner() {
  return (
    <div className="aspect-[720/220] mt-6 rounded-md overflow-hidden border-none">
      <Swiper
        loop={true}
        autoplay={{
          delay: 10000,
          disableOnInteraction: false,
        }}
        navigation={true}
        modules={[Navigation, Autoplay]}
        className="mySwiper"
      >
        {slider.map((p) => (
          <SwiperSlide key={v4()}>
            <img src={p.image} alt="anime" example />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
