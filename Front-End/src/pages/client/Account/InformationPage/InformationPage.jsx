import { useEffect, useState } from "react";
import { getMyInfo, updateMyInfo } from "../../../../services/userService";
import { EditOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
import { toast } from 'sonner';

const InformationPage = () => {
  const [user, setUser] = useState(null);
  const [input, setInput] = useState([]);
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const result = await getMyInfo();
        setUser(result.data);
        setInput([
          {
            name: 'name',
            value: result.data.fullName,
            type: 'text',
            placeholder: 'Họ và tên'
          },
          {
            name: 'email',
            value: result.data.email,
            type: 'email',
            placeholder: 'Email'
          },
          {
            name: 'phone',
            value: result.data.phone,
            type: 'text',
            placeholder: 'Số điện thoại'
          }
        ])
      } catch (error) {
        console.log(error);
      }
    }
    fetchApi();
  },[]);
  const handleChange = (name, e) => {
    const newInput = [...input];
    const index = newInput.findIndex(item => item.name === name);
    if (index !== -1) {
      newInput[index].value = e.target.value;
      setInput(newInput);
    }
  }
  const handleUpdate = async () => {
    if (input[0].value === '') {
      toast.error('Họ và tên không được rỗng', { duration: 1000 });
      return;
    }
    if (input[1].value === '') {
      toast.error('Email không được rỗng', { duration: 1000 });
      return;
    }
    if (input[2].value === '') {
      toast.error('Số điện thoại không được rỗng', { duration: 1000 });
      return;
    }
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(input[1].value)) {
      toast.error('Email không hợp lệ', { duration: 1000 });
      return;
    }
  
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(input[2].value)) {
      toast.error('Số điện thoại phải là 10 chữ số', { duration: 1000 });
      return;
    }
    const data = {
      fullName: input[0].value,
      email: input[1].value,
      phone: input[2].value
    }
    try {
      console.log(data);
      await updateMyInfo(data);
      toast.success('Cập nhật thông tin thành công', { duration: 1000 });
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <>
      {user && (
        <div className="bg-white py-[20px] px-[80px] min-h-[600px] rounded-[15px] border-[1px] border-gray-200 text-center">
          {input.map((item, index) => (
            <div key={index} className="flex items-center mb-[30px]">
              <label className="w-[20%] text-start" htmlFor={item.name}>Họ và tên:</label>
              <input onChange={(e) => handleChange(item.name, e)} defaultValue={item.value} id={item.name} type={item.type} className="h-[45px] py-[5px] px-[20px] outline-none border-[1px] border-gray-400 font-[500] text-[16px] w-[500px] focus:border-black rounded-[10px]" placeholder={item.placeholder}/>
            </div>
          ))}
          <div className="flex items-center mb-[30px]">
            <label className="w-[20%] text-start" htmlFor="address">Địa chỉ:</label>
            <input value={user?.address.filter(item => item.isDefault)[0].detail} disabled id="address" type="text" className="h-[45px] py-[5px] px-[20px] outline-none border-[1px] border-gray-400 font-[500] text-[16px] w-[500px] focus:border-black rounded-[10px]"/>
            <Link to={"/account/address"}>
              <span className="cursor-pointer ms-4"><EditOutlined className="text-[22px]" /></span>
            </Link>
          </div>
          <div className="flex items-center">
            <div className="w-[20%]"></div>
            <button onClick={handleUpdate} className="bg-[#080808] text-white text-center cursor-pointer h-[40px] py-[5px] px-[20px] rounded-[10px] font-[500] hover:bg-[#3b3b3b] text-[14px] w-[500px] transition-all duration-100 ease-in-out">
                Cập nhật
              </button>
          </div>
        </div>
      )}
    </>
  )
}

export default InformationPage;