import { useEffect, useRef, useState } from "react";
import { FaSistrix  } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { filterProduct } from "../../../services/productService";
import ProductList from "../../../components/Product/ProductList";
import { Pagination } from 'antd';
const SearchPage = () => {
  const inputRef = useRef();
  const location = useLocation();
  const [products, setProducts] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const pathName = location.pathname;
  const searchParams = new URLSearchParams(location.search);
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const value = location.search.substring(1);
        if(value !== ''){
          const result = await filterProduct(location.search.substring(1));
          setProducts(result.data);
        }
        else setProducts(null);
      } catch (error) {
        console.log(error);
      }
    }
    fetchApi();
  },[location.search]);
  const handleChange = (page) => {
    setCurrentPage(page);

    searchParams.set('page', page);
    searchParams.set('limit', 10);

    const url = `${pathName}?${searchParams.toString()}`;
    navigate(url);
  }
  const handleSearch = () => {
    const value = inputRef.current.value;

    searchParams.set('filter', `name:${value}`);
    searchParams.set('page', 1);
    searchParams.set('limit', 10);
    
    const url = `${pathName}?${searchParams.toString()}`;
    navigate(url);
  }
  return (
    <>
      <div className={`pt-[30px] text-center text-[#080808] ${(products && products.totalItem > 0) ? '' : ' h-[80vh]'}`}>
        <h1 className="text-[30px] font-[600]">Tìm kiếm</h1>
        {products && products.totalItem > 0 && (
          <h4 className="text-[14px]">Có <b>{products.totalItem} sản phẩm</b> cho tìm kiếm</h4>
        )}
        <div className="w-[60px] h-[4px] bg-[#080808] mx-auto mb-[30px] mt-[15px]"></div>
        {(products === null || products.totalItem === 0) && (
          <>
            {products === null && (
              <>
                <p className="text-[14px] mb-[8px]">Rất tiếc, chúng tôi không tìm thấy kết quả cho từ khóa của bạn</p>
                <p className="text-[14px]">Vui lòng kiểm tra chính tả, sử dụng các từ tổng quát hơn và thử lại!</p>
              </>
            )}
            {products !== null && products.totalItem === 0 && (
              <>
                <p className="text-[20px] font-[700] mb-[8px]">Không tìm thấy nội dung bạn yêu cầu</p>
                <p className="text-[14px]">Không tìm thấy <b>"{searchParams.get("filter").split(":")[1]}".</b> Vui lòng kiểm tra chính tả, sử dụng các từ tổng quát hơn và thử lại!</p>
              </>
            )}
            <div className="flex items-center justify-center mt-[40px]">
              <input ref={inputRef} type="text" placeholder="Tìm kiếm" className="text-[14px] bg-[#EDEDED] outline-none px-[20px] py-[12px] w-[45%]" />
              <button onClick={handleSearch} className="bg-[#0C0C0C] w-[55px] h-[45px] flex justify-center items-center">
                <FaSistrix className="text-[26px] text-white" />
              </button>
            </div>
          </>
        )}
        {products && products.totalItem > 0 && (
          <>
            <h4 className="text-start text-[14px] mb-[20px]">
              Kết quả tìm kiếm cho <b>"{searchParams.get("filter") && searchParams.get("filter").split(":")[1]}".</b>
            </h4>
            <ProductList data={products.result} />
            <Pagination 
              align="center" 
              current={currentPage}
              defaultCurrent={1}
              total={products.totalItem}
              showSizeChanger={false} 
              className="mt-[20px] mb-[30px]" 
              onChange={handleChange} 
            />
          </>
        )}
        
      </div>
    </>
  )
}

export default SearchPage;