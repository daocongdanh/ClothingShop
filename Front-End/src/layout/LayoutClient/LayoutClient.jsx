import { Outlet } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";

const LayoutClient = () => {
  return (
    <>
      <Header/>
        <div className="bg-[#FAFAFA]">
          <div className="w-[1192px] mx-auto">
            <Outlet />
          </div>
        </div>
      <Footer/>
    </>
  )
}

export default LayoutClient;