import { Link, useParams } from "react-router-dom";
import Button from "../../../components/Button/Button";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";

const PaymentStatus = () => {
  const { status } = useParams();
  return (
    <>
      <div className="text-center w-[750px] mx-auto h-[80vh]">
        <div className="flex justify-center pt-[150px] mb-[10px]">
          {status === '00' ? (
            <CheckCircleOutlined className="text-[#338dbc] text-[100px]"/>
          ) : (
            <CloseCircleOutlined className="text-[#338dbc] text-[100px]"/>
          )}
        </div>
        <h1 className="font-[700] line-clamp-1 text-[#080808] text-[30px]">
          {status === '00' ? (
            "Đặt hàng thành công"
          ) : (
            "Đặt hàng thất bại"
          )}
        </h1>
        <p className="text-[#080808] mx-[100px]">
          {status === '00' ? (
            "Cảm ơn bạn đã đặt hàng, chúng tôi sẽ sớm xử lý đơn hàng của bạn."
          ) : (
            "Thanh toán không thành công. Vui lòng thử lại hoặc liên hệ hỗ trợ."
          )}
          
        </p>
        <Link to={"/"}>
          <Button title={"Trở về trang chủ"} />
        </Link>
      </div>
    </>
  )
}

export default PaymentStatus;