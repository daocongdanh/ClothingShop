import { Link } from "react-router-dom";

const ButtonCategory = (props) => {
  const { title } = props;
  return (
    <div className="text-center">
      <Link
        to="/"
        className="inline-block px-[28px] py-[12px] text-[13px] font-[500] text-white rounded-[2px] tracking-widest bg-[#252a2b] transition-all duration-500 ease-in-out"
        style={{
          backgroundImage: "linear-gradient(to right, #7e8080 50%, #252a2b 50%)",
          backgroundSize: "200% 100%",
          backgroundPosition: "right bottom",
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundPosition = "left bottom";
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundPosition = "right bottom";
        }}
      >
        XEM THÊM SẢN PHẨM <b className="uppercase">{title}</b>
      </Link>
    </div>
  );
};

export default ButtonCategory;
