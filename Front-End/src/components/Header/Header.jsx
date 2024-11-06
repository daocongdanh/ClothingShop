import Slider from "react-slick";
import { Link, NavLink } from "react-router-dom";
import { FaShoppingCart, FaRegUser, FaSistrix  } from "react-icons/fa";
const Header = () => {
  var settings = {
    infinite: true,
    fade: true,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false
  };

  const totalCartItem = 2;
  return (
    <>
      <div className="sticky z-9999">
        <Slider {...settings} className="bg-black pt-[5px] pb-[8px] text-center">
          <div className="text-white text-[13px]">
            Miễn phí vận chuyển với đơn hàng trên 2.000.000đ
          </div>
          <div className="text-white text-[13px]">
            Order Shopee để nhận nhiều ưu đãi khủng !
          </div>
        </Slider>
        <nav className="shadow-md">
          <div className="w-[1192px] mx-auto flex items-center justify-between">
            <Link to={"/"} className="py-[10px]">
              <img src={"logo.png"} alt="" className="w-[250px] object-cover" />
            </Link>
            <ul className="flex items-center text-[17px]">
              <li className="px-[15px]">
                <NavLink to="/">Trang chủ</NavLink>
              </li>
              <li className="px-[15px]">
                <NavLink to="/">SALE</NavLink>
              </li>
              <li className="px-[15px]">
                <NavLink to="/">Sản phẩm</NavLink>
              </li>
              <li className="px-[15px]">
                <NavLink to="/">Blog</NavLink>
              </li>
              <li className="px-[15px]">
                <NavLink to="/">Liên hệ</NavLink>
              </li>
            </ul>
            <div className="flex items-center">
              <form className="flex items-center relative">
                <button className="text-gray-300 absolute top-3 left-4">
                  <FaSistrix className="text-[20px]" />
                </button>
                <input required type="text" placeholder="Tìm kiếm sản phẩm..." className="text-[14px] py-[10px] pr-[10px] pl-[50px]
                 border-[1px] border-gray-400 rounded-s-[22px] rounded-e-[22px]"/>
              </form>
              <Link to="/">
                <FaRegUser className="text-gray-600 text-[22px] ml-[20px]" />
              </Link>
              <Link to="/" className="relative">
                <FaShoppingCart className="text-gray-600 text-[22px] ml-[20px]" />
                <div className="w-[16px] h-[16px] bg-[#C50017] text-white px-[3px] rounded-[50%] text-[11px] flex 
                items-center justify-center absolute top-[-5px] right-[-8px]">
                  {totalCartItem}
                </div>
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </>
  )
}

export default Header;