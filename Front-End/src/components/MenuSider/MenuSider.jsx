import { Menu } from 'antd';
import {
  DashboardOutlined,
  ShoppingCartOutlined,
  TagsOutlined,
  AppstoreOutlined,
  CreditCardOutlined,
  StarOutlined,
  UserOutlined,
  LogoutOutlined
} from "@ant-design/icons";
import { Link, useLocation } from 'react-router-dom';
const MenuSider = () => {
  const location = useLocation(); 
  const currentPath = location.pathname; 

  const items = [
    {
      key: "/admin",
      label: <Link to="/admin" >Dashboard</Link>,
      icon: <DashboardOutlined style={{ fontSize: '17px' }} />
    },
    {
      key: "/admin/orders",
      label: <Link to="/admin/orders">Order</Link>,
      icon: <ShoppingCartOutlined style={{ fontSize: '17px' }}/>
    },
    {
      key: "/admin/categories",
      label: <Link to="/admin/categories">Category</Link>,
      icon: <TagsOutlined style={{ fontSize: '17px' }}/>
    },
    {
      key: "/admin/products",
      label: <Link to="/admin/products">Product</Link>,
      icon: <AppstoreOutlined style={{ fontSize: '17px' }}/>
    },
    {
      key: "/admin/payment-methods",
      label: <Link to="/admin/payment-methods">Payment Method</Link>,
      icon: <CreditCardOutlined style={{ fontSize: '17px' }}/>
    },
    {
      key: "/admin/reviews",
      label: <Link to="/admin/reviews">Review</Link>,
      icon: <StarOutlined style={{ fontSize: '17px' }}/>
    },
    {
      key: "/admin/users",
      label: <Link to="/admin/users">User</Link>,
      icon: <UserOutlined style={{ fontSize: '17px' }}/>
    },
    {
      key: "Logout",
      label: <Link to="/logout">Logout</Link>,
      icon: <LogoutOutlined style={{ fontSize: '17px' }}/>
    }
  ];
  return (
    <>
      <Menu
        mode="inline"
        items={items}
        // defaultSelectedKeys = {["Dashboard"]}
        selectedKeys={[currentPath]}
        style={{ fontSize: '17px'}}
      />
    </>
  )
}

export default MenuSider;