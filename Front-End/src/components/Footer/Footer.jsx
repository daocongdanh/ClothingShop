import { FaPhoneVolume, FaFacebookF, FaInstagram } from "react-icons/fa";
const Footer = () => {
  return (
    <>
      <div className="bg-black text-white">
        <div className="w-[1192px] mx-auto">
          <div className="pt-[40px] pb-[30px] flex justify-between text-[14px]">
            <div className="w-[50%]">
              <h3 className="text-[18px] py-[12px]"><b>Về STREET GANG</b></h3>
              <div className="flex justify-between">
                <p className="w-[45%]">Được thành lập từ 2018. <b>Street Gang</b>, một thương hiệu thời trang đường phố gắn liền với những thiết kế cá tính, táo bạo và nhiều màu sắc nhưng không mất đi tính thực tiễn của thời trang - <b>đó là sự đa dụng</b>.</p>
                <div className="w-[45%]">
                  <p className="mb-[8px]"><b>Địa chỉ</b>: 12 Đường Hoa Giấy, Phường 7, Phú Nhuận, TP. Hồ Chí Minh</p>
                  <p className="mb-[8px]"><b>Điện thoại</b>: 0767.060.995</p>
                  <p className="mb-[8px]"><b>Email</b>: streetgangco.ltd@gmail.com</p>
                </div>
              </div>
            </div>
            <div className="w-[20%]">
              <h3 className="text-[18px] py-[12px] ml-[-16px]"><b>Hỗ trợ khách hàng</b></h3>
              <ul className="list-disc">
                <li className="mb-[8px]">Tìm kiếm</li>
                <li className="mb-[8px]">Giới thiệu</li>
                <li className="mb-[8px]">Chính sách đổi trả</li>
                <li className="mb-[8px]">Chính sách bảo mật</li>
                <li className="mb-[8px]">Điều khoản dịch vụ</li>
              </ul>
            </div>
            <div className="w-[20%]">
              <h3 className="text-[18px] py-[12px]"><b>Chăm sóc khách hàng</b></h3>
              <div className="flex items-center">
                <span className="mr-[10px]"><FaPhoneVolume className="text-[40px]" /></span>
                <div className="flex flex-col">
                  <span className="text-[25px]">0767 060 995</span>
                  <span><u>streetgangco.ltd@gmail.com</u></span>
                </div>
              </div>
              <h3 className="text-[18px] py-[12px]"><b>Follow Us</b></h3>
              <div className="flex items-center">
                <div className="w-[32px] h-[32px] border-[1px] border-white rounded-[5px] flex items-center justify-center mr-[10px] cursor-pointer hover:bg-[#7E8080] hover:border-[0px]"><FaFacebookF className="text-[18px]" /></div>
                <div className="w-[32px] h-[32px] border-[1px] border-white rounded-[5px] flex items-center justify-center cursor-pointer hover:bg-[#7E8080] hover:border-[0px]"><FaInstagram className="text-[18px]" /></div>
              </div>
            </div>
          </div>
          <div className="py-[12px] text-[13px] text-center">
            Copyright © 2024 <span className="opacity-[0.8]">Street Gang. Powered by Haravan</span>
          </div>
        </div>
      </div>
    </>
  )
}

export default Footer;