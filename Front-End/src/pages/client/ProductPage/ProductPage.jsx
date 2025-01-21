import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductBySlug, getTop5Product } from '../../../services/productService';
import Slider from "react-slick";
import NextArrow from '../../../components/CustomArrow/NextArrow';
import PrevArrow from '../../../components/CustomArrow/PrevArrow';
import Button from '../../../components/Button/Button';
import { getCodeColor } from '../../../utils/getCodeColor';
import { addToCart } from '../../../services/cartService';
import ProductList from '../../../components/Product/ProductList';
import Review from '../../../components/Review/Review';
import { toast } from 'sonner';
const ProductPage = () => {
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  let sliderRef1 = useRef(null);
  let sliderRef2 = useRef(null);
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState(null);
  const [size, setSize] = useState(null);
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [top5Product, setTop5Product] = useState(null);
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const result = await getProductBySlug(slug);
        setProduct(result.data);
        setColor(result.data.colors[0]);
        setSize(result.data.sizes[0]);
        const result1 = await getTop5Product(slug);
        setTop5Product(result1.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchApi();
  },[slug])

  useEffect(() => {
    setNav1(sliderRef1);
    setNav2(sliderRef2);
  }, [product]);
  const handleAddToCart = async () => {
    if(product.quantity === 0){
      toast.error('Sản phẩm đã hết hàng', {duration:1000});
      return;
    }
    const data = {
      productId: product._id,
      quantity: quantity,
      color: color,
      size: size
    }
    try {
      const result = await addToCart(data);
      if(result.code === 200){
        toast.success('Thêm sản phẩm vào giỏ hàng thành công', {duration:1000});
      }
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <>
      {product && (
        <div className='flex py-[50px]'>
          <div className='w-[50%] mr-[30px] slider-container flex'>
            <Slider
              asNavFor={nav1}
              ref={slider => (sliderRef2 = slider)}
              slidesToShow={4}
              swipeToSlide={true}
              focusOnSelect={true}
              vertical={true}
              infinite={false}
              className='w-[12%] mr-[20px]'
            >
              {product.images.map((item, index) => (
                <img src={item} key={index} alt="" className='w-full h-full object-cover border-[1px] cursor-pointer border-gray-300 mb-[8px]' />
              ))}
            </Slider>
            <Slider 
              asNavFor={nav2} 
              ref={slider => (sliderRef1 = slider)}
              dots={true}
              infinite={false}
              nextArrow={<NextArrow />}
              prevArrow={<PrevArrow />}
              className='w-[86%]'
            >
              {product.images.map((item, index) => (
                <img src={item} key={index} alt="" className='w-full h-full object-cover ' />
              ))}
            </Slider>
          </div>
          <div className='flex-1 text-[#080808] text-[14px] bg-white p-[15px]'>
            <h1 className='text-[24px] font-[600]'>{product.name}</h1>
            <p className='mb-[20px]'>Thương hiệu: Street Gang</p>
            <p className='text-[25px] text-[#FF0000] font-[600] mb-[15px]'>{product.price.toLocaleString("en-US")}<u>đ</u></p>
            <div className='mt-[15px] mb-[20px] flex items-center'>
              <div className=''>Kích thước:</div>
              <div className='flex items-center ml-[60px]'>
                {product.sizes.map((item, index) => (
                  <div className='p-[3px] mr-[5px] radio-container' key={`size${index}`}>
                    <input type="radio" onChange={() => setSize(item)} defaultChecked={index === 0} name='size' id={item} className='radio-color hidden'/>
                    <label htmlFor={item} className='w-[25px] h-[25px] flex justify-center items-center text-[12px] text-[#515B5C] font-[600] border-[1px] border-gray-300 cursor-pointer'>{item}</label>
                  </div>
                ))}
              </div>
            </div>
            <div className='pb-[15px] border-b-[1px] border-gray-200 flex'>
              <div className='mr-[70px]'>
                <div className=''>Màu sắc:</div>
                {color && (
                  <p className='text-[13px] font-[600] text-[#4EA8CD]'>{color}</p>
                )}  
              </div>
              <div className='flex items-center'>
                {product.colors.map((item, index) => (
                  <div className='p-[4px] mr-[5px] color-container' key={`color${index}`}>
                    <input onChange={() => setColor(item)} defaultChecked={index === 0} type="radio" id={item} name='color' className='hidden'/>
                    <label 
                      htmlFor={item} 
                      className='w-[35px] h-[35px] block rounded-full cursor-pointer'
                      style={{background: `${getCodeColor(item)}`}}
                      ></label>
                  </div>
                ))}
                
              </div>
            </div>
            <div className='flex items-center justify-between'>
              <div className='flex items-center font-[600] mr-[20px]'>
                <button 
                  className='w-[45px] h-[46px] flex items-center justify-center bg-[#F3F4F4]'
                  onClick={() => setQuantity(prev => {
                    if(prev >= 2){
                      return prev - 1;
                    }
                    return prev;
                  })}
                >-</button>
                <div className='w-[60px] h-[45px] flex items-center justify-center border-y-[1px] border-gray-200'>{quantity}</div>
                <button 
                  className='w-[45px] h-[46px] flex items-center justify-center bg-[#F3F4F4]'
                  onClick={() => setQuantity(prev => prev + 1)}
                >+</button>
              </div>
              {product.quantity === 0 ? (
                <div className='w-full' onClick={handleAddToCart}>
                  <Button title={'Hết hàng'} block={true}/>
                </div>
                
              ): (
                <div className='w-full' onClick={handleAddToCart}>
                  <Button title={'Thêm vào giỏ'} block={true}/>
                </div>
              )}
            </div>
            <div className='flex items-center justify-between'>
              <div className='p-[15px] w-[49%] bg-[#F1F0EE]'>
                FRESHIP đơn hàng giá trị từ 2 triệu đồng.
              </div>
              <div className='p-[15px] w-[49%] bg-[#F1F0EE]'>
                Miễn phí đổi trả lỗi phát sinh từ nhà sản xuất
              </div>
            </div>
          </div>
        </div>
      )}
      
      <h2 className='text-[28px] text-center font-[600] mb-[30px]'>Sản phẩm liên quan</h2>

      {top5Product && (
        <ProductList data={top5Product}/>
      )}
      {product && (
        <Review productId = {product._id} />
      )}
      
    </>
  )
}

export default ProductPage;