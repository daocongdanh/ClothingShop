import { Outlet, Link, NavLink } from "react-router-dom";
import { AimOutlined, HistoryOutlined, HomeOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
const SideBar = () => {
  const menu = [
    {
      icon: <HomeOutlined />,
      link: "/account",
      title: "Trang chủ"
    },
    {
      icon: <HistoryOutlined />,
      link: "/account/history",
      title: "Lịch sử mua hàng"
    },
    {
      icon: <UserOutlined />,
      link: "/account/information",
      title: "Tài khoản của bạn"
    },
    {
      icon: <AimOutlined />,
      link: "/account/address",
      title: "Địa chỉ của bạn"
    },
    {
      icon: <LogoutOutlined />,
      link: "/account/logout",
      title: "Thoát tài khoản"
    }
  ]
  return (
    <div className="flex py-[40px]">
      <ul className="bg-white w-[25%] mr-[30px] rounded-[15px] border-[1px] border-gray-200 p-[15px]">
        {menu.map((item, index) => (
          <li key={index} className={`text-[18px] ${index !== menu.length - 1 ? 'mb-[15px]' : ''}`}>
            <NavLink to={item.link} end={item.link === "/account"} className="sidebar flex items-center px-[5px] pt-[3px] rounded-[8px] border-[1px] border-transparent">
              {item.icon}
              <span className="ml-[20px]">{item.title}</span>
            </NavLink>
          </li>
        ))}
      </ul>
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  )
}

export default SideBar;