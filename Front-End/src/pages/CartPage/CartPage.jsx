import { InputNumber, ConfigProvider } from 'antd';
import { useEffect, useState } from 'react';
import { deleteCart, getCartByUser, updateCart } from '../../services/cartService';
import { ShoppingCartOutlined } from '@ant-design/icons';
import useMessage from '../../hooks/useMessage';
const CartPage = () => {
  const [cart, setCart] = useState(null);
  const [reLoad, setReload] = useState(true);
  const userId = localStorage.getItem("userId");
  const { error, contextHolder } = useMessage();
  useEffect(() => {
    const fetchApi = async () => {
      const result = await getCartByUser(userId);
      setCart(result.data);
    }
    fetchApi();
  },[userId, reLoad]);
  const onReload = () => {
    setReload(prev => !prev);
  }
  const handleQuantity = async (value, productId) => {
    const result = await updateCart(productId, {
      userId: userId,
      quantity: value
    });
    if(result.code === 200){
      onReload();
    }
    else{
      error("Lỗi Server");
    }
  }

  const handleRemove = async (productId) => {
    const result = await deleteCart(productId, {
      userId: userId
    });
    if(result.code === 200){
      onReload();
    }
    else{
      error("Lỗi Server");
    }
  }
  const handleCheckout = () => {
    console.log("ok");
  } 
  return (
    <>
      {contextHolder}
      <ConfigProvider
        theme={{
          token: {
            hoverBorderColor: "#080808"
          },
        }}
      ></ConfigProvider>
      <div className="flex justify-between text-[#0808080] my-[20px] items-start">
        <div className="bg-white w-[65%] mr-[30px]">
          <h1 className="py-[10px] px-[15px] text-[20px] font-bold border-b-[1px] border-gray-300">Giỏ hàng của bạn</h1>
          <div className="p-[15px]">
            {(cart && cart.items.length > 0) ? (
              <>
                <h2 className="mb-[15px]">Bạn đang có <b>{cart.items.length} sản phẩm </b>trong giỏ hàng</h2>
                <div className="px-[10px] py-[8px] border-[2px] border-gray-200 rounded-[4px]">
                  {cart.items.map((item, index) => (
                    <div key={index} className={`px-[10px] py-[15px] flex justify-between ${index !== cart.items.length - 1 ? ('border-b-[1px] border-gray-200') : ('')}`}>
                      <div className="flex">
                        <div className="w-[80x] h-[80px] border-[1px] border-gray-300 relative">
                          <img src={item.image} alt="" className="w-full h-full object-contain" />
                          <button className='cursor-pointer w-[20px] h-[20px] flex justify-center items-center rounded-full text-[8px] bg-[#8f9bb3] text-white absolute top-[-9px] left-[-9px]'
                            onClick={() => handleRemove(item.productId)}
                          >
                            Xóa
                          </button>
                        </div>
                        <div className="px-[18px]">
                          <p className='text-[15px]'>{item.name}</p>
                          <p className='text-[12px] text-[#777777] mb-[10px]'>{`${item.color} / ${item.size}`}</p>
                          <p className='text-[14px] text-[#8f9bb3] font-bold'>{item.price.toLocaleString("en-US")}<u>đ</u></p>
                        </div>
                      </div>
                      <div className="">  
                        <p className='text-end text-[15px] font-bold mb-[10px]'>{(item.price * item.quantity).toLocaleString("en-US")}<u>đ</u></p>
                        <InputNumber onChange={(value) => handleQuantity(value, item.productId)} min={1} max={100} defaultValue={item.quantity} />
                      </div>
                    </div>
                  ))}
                </div>
                <div className='bg-[#F7F7F7] px-[12px] pt-[10px] pb-[15px] mt-[20px]'>
                  <h2 className='text-[14px] font-bold'>Ghi chú đơn hàng</h2>
                  <textarea rows={3} className='w-full border-[1px] border-[#080808] rounded-[5px]'></textarea>
                </div>
              </>
            ) : (
              <div className='text-center'>
                <ShoppingCartOutlined className='text-[150px] font-[200] text-gray-600' />
                <h2 className='text-[24px] text-gray-600'>Hiện chưa có sản phẩm</h2>
              </div>
            )}
          </div>
        </div>
        <div className="bg-white flex-1 flex flex-col">
          <div className='p-[15px]'>
            <h2 className='text-[20px] font-bold mt-[10px] mb-[15px]'>Thông tin đơn hàng</h2>
            <div className='py-[10px] border-dashed border-y-[1px] border-gray-300 flex items-center justify-between'>
              <h3 className='text-[16px] font-[500]'>Tổng tiền:</h3>
              <p className='text-[24px] text-[#FF0000] font-[500]'>
                {cart != null ? cart.items.reduce((total, item) => total + item.quantity * item.price, 0).toLocaleString("en-US") : 0}
                <u>đ</u></p>
            </div>
            <div className='text-[14px] pt-[5px] relative'>
              <p className='pl-[15px]'>Phí vận chuyển sẽ được tính ở trang thanh toán.</p>
              <span className="absolute top-[14px] left-0 w-1 h-1 bg-gray-600 rounded-full opacity-100"></span>
              <p className='pl-[15px]'>Bạn cũng có thể nhập mã giảm giá ở trang thanh toán.</p>
              <span className="absolute top-[34px] left-0 w-1 h-1 bg-gray-600 rounded-full opacity-100"></span>
              {cart && cart.items.length === 0 ? (
                <button className={`text-white text-center text-[15px] font-bold px-[5px] py-[10px] bg-[#FF0000] block w-full rounded-[5px] mt-[20px] hover:bg-[#f95151] cursor-not-allowed`}>THANH TOÁN</button>
              ) : (
                <button onClick={handleCheckout} className={`text-white text-center text-[15px] font-bold px-[5px] py-[10px] bg-[#FF0000] block w-full rounded-[5px] mt-[20px] hover:bg-[#f95151] `}>THANH TOÁN</button>
              )}
              
            </div>
          </div>
          <div className='text-[14px] px-[15px] py-[12px] bg-[#D9EDF7] border-[1px] border-[#bce8f1] rounded-[5px] mt-[15px]'>
            <h3 className='font-bold'>Chính sách mua hàng</h3>
            <p>Hiện chúng tôi chỉ áp dụng thanh toán với đơn hàng có giá trị tối thiểu 90.000₫ trở lên.</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default CartPage;