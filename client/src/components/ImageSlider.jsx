import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css/bundle";
// import { Autoplay, Pagination, Navigation } from "swiper";

const ImageSlider = ({ images }) => {
  SwiperCore.use([Navigation]);


  return (
    <Swiper
      navigation
      // //   spaceBetween={30}
      //   centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
      // //   pagination={{
      // //     clickable: true,
      // //   }}
      //   navigation={false}
      //   modules={[Autoplay, Pagination, Navigation]}
      //   className="w-96 h-52 rounded-t-2xl overflow-hidden"
    >
      <div className="flex-1">
        {images.map((url, i) => (
          <SwiperSlide key={i}>
            <SlideImage src={url} alt={"image slide " + i} />
          </SwiperSlide>
        ))}
      </div>
    </Swiper>
  );
};

const SlideImage = ({ src, alt }) => {
  return (
    <div className="w-full h-full relative ">
      <img src={src} alt={alt} className="object-cover" sizes="100vw" />
    </div>
  );
};

export default ImageSlider;
