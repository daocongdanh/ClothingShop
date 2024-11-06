import { FaSistrix  } from "react-icons/fa";
import { useState } from 'react';
import { Drawer } from 'antd';
import { Link } from "react-router-dom";
const Search = () => {
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  return (
    <>
      <form 
        className="flex items-center relative"
        onClick={showDrawer}
      >
        <button className="text-gray-300 absolute top-3 left-4">
          <FaSistrix className="text-[20px]" />
        </button>
        <input required type="text" placeholder="Tìm kiếm sản phẩm..." className="text-[14px] py-[10px] pr-[10px] pl-[50px]
          border-[1px] border-gray-400 rounded-s-[22px] rounded-e-[22px]"/>
      </form>

      <Drawer
        placement={'top'}
        onClose={onClose}
        open={open}
        key={'top'}
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
              <input required type="text" placeholder="Tìm kiếm sản phẩm..." className="text-[14px] w-[700px] py-[10px] pr-[10px] pl-[50px]
                border-[1px] border-gray-400 rounded-s-[22px] rounded-e-[22px]"/>
            </div>
            <div className="text-[14px] text-[#080808]">Gợi ý cho bạn:</div>
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