import Slider from "react-slick";
import NextArrow from "../CustomArrow/NextArrow";
import PrevArrow from "../CustomArrow/PrevArrow";

const SlideHome = () => {
  var settings = {
    dots: true,
    infinite: true,
    fade: true,
    speed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />
  };
  return (
    <>
      <Slider {...settings} className="mb-[50px]">
        <div className="h-[800px]">
          <img src="/slide1.gif" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="h-[800px]">
          <img src="/slide2.png" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="h-[800px]">
          <img src="/slide3.gif" alt="" className="w-full h-full object-cover"/>
        </div>
      </Slider>
    </>
  )
}

export default SlideHome;