import { Link } from "react-router-dom";
import "./style.css";
const Product = (props) => {
  // const { data } = props;
  const { margin } = props;
  console.log(margin);
  const boolean = true;
  return (
    <>
      <div className={`w-[19%] mb-[15px] bg-white relative border-[1px] border-gray-100 
        ${margin === false ? (" mr-[0px]") : " mr-[14px]"}`}>
        {boolean ? (
          <div className="text-[11px] bg-[#565656] px-[5px] py-[3px] inline-block text-white absolute top-1 left-1 z-10">
          Sold Out
          </div>
        ) : ""}
        <div className="product cursor-pointer">
          <Link to="/">
            <img src="product1.png" alt="image1" className="image1" />
            <img src="product2.jpg" alt="image2" className="image2" />
          </Link>
        </div>
        <div className="px-[10px] pt-[12px] pb-[4px]">
          <Link to="/">
            <span className="text-[11px] text-[#666666]">STREET GANG</span>
            <h3 className="text-[16px] font-[700] text-[#080808]">Basic Bomber</h3>
          </Link>
          <h3 className="font-[500] text-[#252A2B] text-[14px] mt-[20px]">500,000<u>đ</u></h3>
        </div>
      </div>
    </>
  )
}

export default Product;