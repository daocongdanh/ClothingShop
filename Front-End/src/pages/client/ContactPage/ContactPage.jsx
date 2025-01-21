import { FaLocationDot, FaRegEnvelope, FaPhone, FaRegCalendarCheck } from "react-icons/fa6";
import Button from "../../../components/Button/Button";
const ContactPage = () => {
  const list = [
    {
      icon: <FaLocationDot className="text-[16px]"/>,
      title: "Địa chỉ",
      description: "12 Đường Hoa Giấy, Phường 7, Phú Nhuận, Thành phố Hồ Chí Minh, Việt Nam"
    },
    {
      icon: <FaRegEnvelope className="text-[16px]"/>,
      title: "Email",
      description: "streetgangco.ltd@gmail.com"
    },
    {
      icon: <FaPhone className="text-[16px]"/>,
      title: "Điện thoại",
      description: "0767 060 995"
    },
    {
      icon: <FaRegCalendarCheck className="text-[16px]"/>,
      title: "Thời gian làm việc",
      description: "Thứ 2 đến CN từ 9h đến 21h"
    }
  ];
  return (
    <>
      <div className="my-[20px]"> 
        <iframe title="my" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.674507703018!2d106.68729637485781!3d10.836202089316242!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175294d05e6b503%3A0xb41cb76f8e98d13a!2zMjA2IMSQxrDhu51uZyBz4buRIDIwLCBQaMaw4budbmcgNSwgR8OyIFbhuqVwLCBI4buTIENow60gTWluaCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1730884526214!5m2!1svi!2s" width="100%" height="450" className="border-0" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
      </div>
      <div className="flex">
        <div className="text-[14px] text-[#080808] w-[40%] mr-[20px]">
          <h2 className="text-[25px] my-[30px] font-[500]">Thông tin liên hệ</h2>
          {list.map((item, index) => (
            <div className="flex mb-[20px]" key={index}>
              <div className="w-[35px] h-[35px] rounded-full border-[1px] border-gray-300 flex items-center justify-center">
                {item.icon}
              </div>
              <div className="ml-[20px]">
                <b>{item.title}</b>
                <p className="text-gray-400">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
        <form action="" className="w-[55%]">
          <h2 className="text-[25px] my-[30px] font-[500]">Gửi thắc mắc cho chúng tôi</h2>
          <p className="text-[14px] mb-[10px]">Nếu bạn có thắc mắc gì, có thể gửi yêu cầu cho chúng tôi, và chúng tôi sẽ liên lạc lại với bạn sớm nhất có thể .</p>
          <div className="mb-[20px]">
            <input required type="text" className="w-full px-[20px] py-[8px] border-[1px] border-gray-300 focus:outline-none" placeholder="Tên của bạn" />
          </div>
          <div className="flex justify-between mb-[20px]">
            <input required type="text" className="w-[48%] px-[20px] py-[8px] border-[1px] border-gray-300 focus:outline-none" placeholder="Email của bạn" />
            <input required type="text" className="w-[48%] px-[20px] py-[8px] border-[1px] border-gray-300 focus:outline-none" placeholder="Số điện thoại của bạn" />
          </div>
          <div className="mb-[10px]">
            <textarea required rows={5} name="" id="" className="p-[20px] border-[1px] border-gray-300 w-full focus:outline-none" placeholder="Nội dung"></textarea>
          </div>
          <p className="text-gray-400 text-[13px]">This site is protected by reCAPTCHA and the Google <span className="text-blue-600">Privacy Policy</span> and <span className="text-blue-600">Terms of Service</span> apply.</p>
          <Button title = {"Gửi cho chúng tôi"}/>
        </form>
      </div>
    </>
  )
}

export default ContactPage;