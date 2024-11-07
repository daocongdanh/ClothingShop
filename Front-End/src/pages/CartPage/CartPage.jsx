import { InputNumber, ConfigProvider } from 'antd';
const CartPage = () => {
  const cartCount = 3;

  const array = [1, 2, 3];
  return (
    <>
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
            <h2 className="mb-[15px]">Bạn đang có <b>{cartCount} sản phẩm </b>trong giỏ hàng</h2>
            <div className="px-[10px] py-[8px] border-[2px] border-gray-200 rounded-[4px]">
              {array.map((item, index) => (
                <div className={`px-[10px] py-[15px] flex justify-between ${index !== array.length - 1 ? ('border-b-[1px] border-gray-200') : ('')}`}>
                  <div className="flex">
                    <div className="w-[80x] h-[80px] border-[1px] border-gray-300 relative">
                      <img src="https://product.hstatic.net/200000013792/product/black_hoodie_front_7941ea7c0f074932b71335bbd712f2ba_medium.jpg" alt="" className="w-full h-full object-contain" />
                      <div className='cursor-pointer w-[20px] h-[20px] flex justify-center items-center rounded-full text-[8px] bg-[#8f9bb3] text-white absolute top-[-9px] left-[-9px]'>
                        Xóa
                      </div>
                    </div>
                    <div className="px-[18px]">
                      <p className='text-[15px]'>Drip Logo Hoodie</p>
                      <p className='text-[12px] text-[#777777] mb-[10px]'>Đen / L</p>
                      <p className='text-[14px] text-[#8f9bb3] font-bold'>600,000<u>đ</u></p>
                    </div>
                  </div>
                  <div className="">  
                    <p className='text-end text-[15px] font-bold mb-[10px]'>600,000đ</p>
                    <InputNumber min={1} max={100} defaultValue={1} />
                  </div>
                </div>
              ))}
            </div>
            <div className='bg-[#F7F7F7] px-[12px] pt-[10px] pb-[15px] mt-[20px]'>
              <h2 className='text-[14px] font-bold'>Ghi chú đơn hàng</h2>
              <textarea rows={3} className='w-full border-[1px] border-[#080808] rounded-[5px]'></textarea>
            </div>
          </div>
        </div>
        <div className="bg-white flex-1 flex flex-col">
          <div className='p-[15px]'>
            <h2 className='text-[20px] font-bold mt-[10px] mb-[15px]'>Thông tin đơn hàng</h2>
            <div className='py-[10px] border-dashed border-y-[1px] border-gray-300 flex items-center justify-between'>
              <h3 className='text-[16px] font-[500]'>Tổng tiền:</h3>
              <p className='text-[24px] text-[#FF0000] font-[500]'>1,580,000<u>đ</u></p>
            </div>
            <div className='text-[14px] pt-[5px] relative'>
              <p className='pl-[15px]'>Phí vận chuyển sẽ được tính ở trang thanh toán.</p>
              <span class="absolute top-[14px] left-0 w-1 h-1 bg-gray-600 rounded-full opacity-100"></span>
              <p className='pl-[15px]'>Bạn cũng có thể nhập mã giảm giá ở trang thanh toán.</p>
              <span class="absolute top-[34px] left-0 w-1 h-1 bg-gray-600 rounded-full opacity-100"></span>
              <button className='text-white text-center text-[15px] font-bold px-[5px] py-[10px] bg-[#FF0000] block w-full rounded-[5px] mt-[20px] hover:bg-[#f95151]'>THANH TOÁN</button>
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