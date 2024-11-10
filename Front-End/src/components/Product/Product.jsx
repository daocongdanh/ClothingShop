import { Link } from "react-router-dom";
import "./style.css";
const Product = (props) => {
  const { margin, data } = props;
  return (
    <>
      <div className={`w-[19%] mb-[15px] bg-white relative border-[1px] border-gray-100 
        ${margin === false ? (" mr-[0px]") : " mr-[14px]"}`}>
        {data.quantity === 0 ? (
          <div className="text-[11px] bg-[#565656] px-[5px] py-[3px] inline-block text-white absolute top-1 left-1 z-10">
          Sold Out
          </div>
        ) : ""}
        <div className="product cursor-pointer w-[225px] h-[225px]">
          <Link to="/">
            <img src={data.images[0]} alt="image1" className="image1 w-full h-full object-contain" />
            <img src={data.images[1]} alt="image2" className="image2 w-full h-full object-contain" />
          </Link>
        </div>
        <div className="px-[10px] pt-[12px] pb-[4px]">
          <Link to="/">
            <span className="text-[11px] text-[#666666]">STREET GANG</span>
            <h3 className="text-[16px] font-[700] text-[#080808]">{data.name}</h3>
          </Link>
          <h3 className="font-[700] text-[#252A2B] text-[14px] mt-[20px]">{data.price.toLocaleString("en-US")}<u>đ</u></h3>
        </div>
      </div>
    </>
  )
}

export default Product;