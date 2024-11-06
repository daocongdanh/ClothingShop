import Slider from "react-slick";
import { Link, NavLink } from "react-router-dom";
import { FaShoppingCart, FaRegUser } from "react-icons/fa";
import Search from "../Search/Search";
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
  const menuLink = [
    {
      title: "Trang chủ",
      link: "/"
    },
    {
      title: "SALE",
      link: "/collections/sale"
    },
    {
      title: "Sản phẩm",
      link: "/collections/tat-ca-san-pham"
    },
    {
      title: "Blog",
      link: "/blogs/news"
    },
    {
      title: "Liên hệ",
      link: "/pages/about-us"
    }
  ];

  const menuCategory = [
    {
      title: "NEW COLLECTION",
      link: "/"
    },
    {
      title: "JACKET",
      link: "/"
    },
    {
      title: "HOODIE",
      link: "/"
    },
    {
      title: "ÁO THUN",
      link: "/"
    },
    {
      title: "QUẦN",
      link: "/"
    },
    {
      title: "PHỤ KIỆN",
      link: "/"
    }
  ]
  return (
    <>
      <div className="sticky z-[999] top-0 bg-white">
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
              {menuLink.map((item, index) => (
                <li key={index} className="relative group">
                  <NavLink
                    to={item.link}
                    className="px-[15px] border-b-[2px] border-white py-[18px] transition-all duration-200 ease-in-out hover:text-gray-400 hover:border-b-[2px] hover:border-black"
                  >
                    {item.title}
                  </NavLink>

                  {item.title === 'Sản phẩm' && (
                    <div className="absolute left-0 hidden group-hover:block bg-white text-black shadow-md p-[10px] w-[250px] mt-[5px]">
                      <ul>
                        {menuCategory.map((item, index) => (
                          <li className="py-[8px] text-[14px]" key={`${index}aaa`}>
                            <Link to={item.link}>{item.title}</Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              ))}
            </ul>

            <div className="flex items-center">
              <Search />
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