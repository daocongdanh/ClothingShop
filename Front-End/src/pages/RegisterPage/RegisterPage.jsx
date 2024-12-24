import { Form } from 'antd';
import Button from '../../components/Button/Button';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../../services/userService';
import { toast } from 'sonner';
const RegisterPage = () => {
  const navigate = useNavigate();
  const onFinish = async (values) => {
    const { name, email, phone, password, confirmPassword } = values;

    if(password !== confirmPassword){
      toast.error("Mật khẩu không khớp");
      return;
    }

    try {
      await register({
        fullName: name,
        email: email,
        phone: phone,
        password: password
      });
  
      toast.success("Đăng ký tài khoản thành công", { duration: 900 });
      setTimeout(() => {
        navigate("/login");
      },1000)
    } catch (err) {
      console.log(err);
    }
  }
  const input = [
    {
      name: 'name',
      type: 'text',
      placeholder: 'Họ và tên'
    },
    {
      name: 'email',
      type: 'email',
      placeholder: 'Email'
    },
    {
      name: 'phone',
      type: 'text',
      placeholder: 'Số điện thoại'
    },
    {
      name: 'password',
      type: 'password',
      placeholder: 'Mật khẩu'
    },
    {
      name: 'confirmPassword',
      type: 'password',
      placeholder: 'Nhập lại mật khẩu'
    },
  ];
  return (
    <>
      <div className="text-center pt-[30px] pb-[100px]">
        <Form 
          onFinish={onFinish}
          initialValues={{
            name: '',
            email: '',
            phone: '',
            password: '',
            confirmPassword: ''
          }} 
          className="text-[#080808] bg-white p-[30px] inline-block w-[620px]"
        >
          <h1 className="text-[25px] font-[600] mb-[15px]">Tạo tài khoản</h1>
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
            <div className='text-[#0C0C0C] text-[14px] text-start'>
              <span className='text-[#959898] mr-[5px]'>Bạn đã có tài khoản?</span>
              <Link to={'/login'} className='hover:text-[#959898]'>Đăng nhập</Link>
            </div>
            <div className='flex justify-center items-center'>
              <Button title='Đăng ký'/>
            </div>
          </Form.Item>
        </Form>
      </div>
    </>
  )
}

export default RegisterPage;