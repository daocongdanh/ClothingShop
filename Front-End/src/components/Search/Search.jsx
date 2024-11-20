import { FaSistrix  } from "react-icons/fa";
import { useEffect, useRef, useState } from 'react';
import { Drawer } from 'antd';
import { Link, useNavigate } from "react-router-dom";
import { filterProduct } from "../../services/productService";
const Search = () => {
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState(null);
  const [value, setValue] = useState(null);
  const inputRef = useRef();
  useEffect(() => {
    const fetchApi = async () => {
      const result = await filterProduct(`filter=name:${value === '' ? null : value}&limit=5`);
      setProducts(result.data);
    }
    fetchApi();
  },[value])

  const navigate = useNavigate();
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
    setValue('');
    inputRef.current.value = '';
  };
  const handleSearch = (e) => {
    setValue(e.target.value);
  }
  const handleNavigate = (slug) => {
    onClose();
    navigate(`/products/${slug}`);
  }
  return (
    <>
      <form 
        className="flex items-center relative"
        onClick={showDrawer}
      >
        <button className="text-gray-300 absolute top-3 left-4">
          <FaSistrix className="text-[20px]" />
        </button>
        <input  required type="text" placeholder="Tìm kiếm sản phẩm..." className="text-[14px] py-[10px] pr-[10px] pl-[50px]
          border-[1px] border-gray-400 rounded-s-[22px] rounded-e-[22px]"/>
      </form>

      <Drawer
        placement={'top'}
        onClose={onClose}
        open={open}
        key={'top'}
        height={'auto'}
        headerStyle={{ display: 'none' }}
      >
        <div className="w-[1192px] mx-auto flex relative">
          <Link to={"/"} className="py-[10px]">
            <img src={"logo.png"} alt="" className="w-[200px] object-cover" />
          </Link>
          <div className="flex flex-col ml-[50px]">
            <div className="mb-[20px] relative">
              <button className="text-gray-300 absolute top-3 left-4">
                <FaSistrix className="text-[20px]" />
              </button>
              <input ref={inputRef} onInput={handleSearch} required type="text" placeholder="Tìm kiếm sản phẩm..." className="text-[14px] w-[700px] py-[10px] pr-[10px] pl-[50px] border-[1px] border-gray-400 rounded-s-[22px] rounded-e-[22px]"/>
            </div>
            {products && (
              products.result.length > 0 ? (
                products.result.map((item, index) => (
                  <div onClick={() => handleNavigate(item.slug)} key={index} className="flex items-center justify-between border-b-[1px] border-gray-300 py-[10px] cursor-pointer">
                    <div className="">
                      <h3 className="text-[14px] font-[500] text-[#080808] mb-[5px]">{item.name}</h3>
                      <h3 className="font-[700] text-[#252A2B] text-[14px]">{item.price.toLocaleString("en-US")}<u>đ</u></h3>
                    </div>
                    <div className="">
                      <img src={item.images[0]} alt="" className="w-[50px] h-[50px] rounded-full object-contain" />
                    </div>
                  </div>
                ))
              ) : (
                <h4>Không có sản phẩm nào...</h4>
              )
            )}
            {products && products.totalItem > 5 && (
              <div onClick={() => {
                navigate(`/search?filter=name:${inputRef.current.value}&page=1&limit=10`)
                onClose();
              }} className="mt-[16px] hover:text-gray-500 text-center cursor-pointer">Xem thêm {products.totalItem - 5} sản phẩm</div>
            )}
          </div>
          <button 
            className="w-[40px] h-[40px] bg-[#F5F5F5] rounded-full flex items-center justify-center absolute right-[-120px]"
            onClick={onClose}
          >
            <span><svg fill="#111" height="12px" width="12px" viewBox="0 0 24 24"><path d="M15.04 12L24 2.96 21.04 0 12 8.96 3.04 0 0 2.96 9.04 12 0 20.96 3.04 24 12 14.96 21.04 24 24 20.96z"></path></svg></span>
          </button>
        </div>
      </Drawer>
    </>
  )
}

export default Search;