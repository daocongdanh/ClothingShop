import { Form } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import { login } from '../../services/userService';
import Cookies from 'js-cookie';
import { toast } from 'sonner';

const LoginPage = () => {
  const navigate = useNavigate();
  const onFinish = async (values) => {
    const { phone, password } = values;

    try {
      const result = await login({
        phone: phone, 
        password: password
      });
      toast.success('Đăng nhập thành công', {duration: 900});
      
      Cookies.set('token', result.data.accessToken);
      Cookies.set('refreshToken', result.data.refreshToken);
  
      setTimeout(() => {
        navigate("/");
      },1000)
    } catch (err) {
      console.log(err);
    }

  }
  const input = [
    {
      name: 'phone',
      type: 'text',
      placeholder: 'Số điện thoại'
    },
    {
      name: 'password',
      type: 'password',
      placeholder: 'Mật khẩu'
    }
  ];
  return(
    <>
      <div className="text-center pt-[30px] pb-[100px]">
        <Form 
          onFinish={onFinish} 
          className="text-[#080808] bg-white p-[30px] inline-block w-[620px]"
          initialValues={{
            phone: '',
            password: ''
          }}
        >
          <h1 className="text-[25px] font-[600] mb-[15px]">Đăng nhập</h1>
          <div className="w-[60px] h-[4px] bg-[#080808] mx-auto mb-[30px]"></div>
          {input.map((item, index) => (
            <Form.Item
              name={item.name}
              key={index}
              className="mb-[25px]"
            >
              <input type={item.type} placeholder={item.placeholder} required className="h-[55px] py-[5px] px-[20px] text-[#5c5c5c] bg-[#ededed] outline-none border-[1px] border-transparent focus:bg-white focus:border-[#ededed] font-[500] text-[14px] w-full"/>
            </Form.Item>
          ))}
          
          <Form.Item className=''>
            <div className='flex justify-center items-center'>
              <Button title='Đăng nhập'/>
              <div className='text-[#0C0C0C] text-[14px] ml-[20px]'>
                <p className='cursor-pointer hover:text-[#959898]'>Quên mật khẩu?</p>
                <span className='text-[#959898] mr-[5px]'>hoặc</span>
                <Link to={'/register'} className='hover:text-[#959898]'>Đăng ký</Link>
              </div>
            </div>
          </Form.Item>
        </Form>
      </div>
    </>
  )
}

export default LoginPage;