import { Link } from "react-router-dom";
const Title = (props) => {
  const { data} = props;
  return (
    <>
      <div className="mt-[40px] mb-[30px] text-[#0C0C0C] flex items-center justify-between">
        <h2 className="text-[24px] font-[500]">
          {data.title}
        </h2>
        <Link to={data.link} className="text-[14px] hover:text-gray-400 transition ease-in-out">
          Xem tất cả
        </Link>
      </div>
    </>
  )
}

export default Title;