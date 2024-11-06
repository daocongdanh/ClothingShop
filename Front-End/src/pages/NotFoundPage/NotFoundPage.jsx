import Button from "../../components/Button/Button";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <> 
      <div className="text-center w-[750px] mx-auto mb-[50px]">
        <div className="block text-white text-[170px] font-bold" style={{textShadow: "0 1px 0 #ccc, 0 2px 0 #c9c9c9, 0 3px 0 #bbb, 0 4px 0 #b9b9b9, 0 5px 0 #aaa, 0 6px 1px rgba(0, 0, 0, 0.1), 0 0 5px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.3), 0 3px 5px rgba(0, 0, 0, 0.2), 0 5px 10px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.2), 0 20px 20px rgba(0, 0, 0, 0.15)"}}>
          404
        </div>
        <h1 className="font-[700] line-clamp-1 text-[#080808] text-[36px]">
          Không tìm thấy trang
        </h1>
        <p className="text-[#080808] mx-[100px] mb-[30px]">Trang bạn đang tìm kiếm có thể đã bị xóa,
				chuyển đi, thay đổi link hoặc chưa bao giờ tồn tại.</p>
        <Link to={"/"}>
          <Button title ={"Trở về trang chủ"}/>
        </Link>
      </div>
    </>
  ) 
}

export default NotFoundPage;