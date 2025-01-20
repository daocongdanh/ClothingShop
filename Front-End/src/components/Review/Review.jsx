import { FaStar, FaRegStar, FaUser } from "react-icons/fa6";
import { CameraOutlined } from '@ant-design/icons';
import Button from "../Button/Button";
import { Image, Modal } from 'antd';
import { useEffect, useState } from "react";
import { Upload, Rate } from 'antd';
import { createReview, getReviewsByProduct } from "../../services/reviewService";
import useMessage from '../../hooks/useMessage';
import { createFile } from "../../services/fileService";
import { getProductById } from "../../services/productService";
const Review = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [rate, setRate] = useState(5);
  const [content, setContent] = useState('');
  const [reviews, setReviews] = useState(null);
  const [sort, setSort] = useState("reviewDate:-1");
  const [limit, setLimit] = useState(3);
  const [reload, setReload] = useState(true);
  const userId = localStorage.getItem("userId");
  const { productId } = props;
  const [product, setProduct] = useState(null);
  const { error, contextHolder } = useMessage();
  useEffect(() => {
    const fetchApi = async () => {
      const result = await getReviewsByProduct(productId, `sort=${sort}&limit=${limit}`);
      const productRes = await getProductById(productId);
      setProduct(productRes.data);
      setReviews(result.data);
    }
    fetchApi();
  },[productId, reload, limit, sort]);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  
  const onReload = () => {
    setReload(prev => !prev);
  }

  const onChange = ({ file, fileList: newFileList }) => {
    const isDuplicate = fileList.some(
      (f) => f.name === file.name && f.size === file.size
    );

    if (isDuplicate) {
      return;
    }

    setFileList(newFileList);
  };

  const handleRemove = (file) => {
    setFileList(prev => prev.filter(item => item.uid !== file.uid));
  }
  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new window.Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const handleSubmit = async () => {
    if(content === ''){
      error("Vui lòng nhập đánh giá !!!");
      return;
    }
    const data = {
      userId: userId,
      rating: rate,
      comment: content,
      productId: productId
    };
    if(fileList.length === 0){
      const result = await createReview(data);
      if(result.code === 201){
        onReload();
      }
      else{
        error("Lỗi server");
      }
    }
    else{
      const formData= new FormData();
      fileList.forEach(file => {
        formData.append('files', file.originFileObj);
      });

      const files = await createFile(formData);
      if(files.code !== 201){
        error("Lỗi server");
        return;
      }
      const data = {
        userId: userId,
        rating: rate,
        comment: content,
        productId: productId,
        images: files.data
      };
      const result = await createReview(data);
      if(result.code === 201){
        onReload();
      }
      else{
        error("Lỗi server");
      }
    }
    handleCancel();
  }

  const handleSort = (e) => {
    const value = e.target.value;
    setSort(value);
    setLimit(3);
  }
  const handleLimit = () => {
    setLimit(prev => prev + 3);
  }
  return ( 
    <>
      {contextHolder}
      <div className="text-[#080808] text-[15px]">
        <h2 className="text-[28px] text-center font-[600] my-[30px]">Đánh giá của khách hàng</h2>
        <div className="flex items-center justify-between">
          <div className="w-[25%]">
            <span className="mr-[10px] font-[600]">Sắp xếp:</span>
            <select 
              className="border-[1px] border-[#e7e7e7] w-[200px] px-[12px] py-[8px] cursor-pointer outline-none"
              onChange={handleSort}
            > 
              <option value="reviewDate:-1">Mới nhất</option>
              <option value="reviewDate:1">Cũ nhất</option>
              <option value="rating:-1">Đánh giá cao nhất</option>
              <option value="rating:1">Đánh giá thấp nhất</option>
              
            </select>
          </div>
          <div className="flex items-center justify-center w-[50%]">
            {reviews?.array.length > 0 ? (
              <>
                {new Array(reviews.avgRate).fill(1).map((_, index) => (
                  <FaStar className="text-[18px]" key={`star11${index}`} />
                ))}
                {reviews.avgRate < 5 &&
                  new Array(5 - reviews.avgRate).fill(1).map((_, index) => (
                    <FaRegStar className="text-[18px]" key={`star222${index}`} />
                  ))}
              </>
            ) : (
              <>
                <FaStar className="text-[18px]" />
                <FaStar className="text-[18px]"/>
                <FaStar className="text-[18px]"/>
                <FaStar className="text-[18px]"/>
                <FaStar className="text-[18px]"/>
              </>
            )}
            <span className="font-[600] ml-[10px]">Đánh giá ({reviews !== null ? reviews.totalItem : 0})</span>
          </div>
          <div className="flex-1 text-end">
            <div className="inline-block" onClick={showModal}>
              <Button title = 'Đánh giá'/>
            </div>
          </div>
        </div>
        {reviews  && reviews.array.length > 0 && reviews.array.map((item, index) => (
          <div className="p-[25px] border-[1px] border-gray-300 mb-[20px] flex" key={index}>
            <div className="w-[10%]">
              <div className="w-[80px] h-[80px] bg-[#F5F5F5] rounded-full flex items-center justify-center">
                <FaUser className="text-[#CCCCCC] text-[30px]" />
              </div>
            </div>
            <div className="flex-1">
              <div className="flex">
                {new Array(item.rating).fill(1).map((_, index) => (
                  <FaStar className="text-[18px]" key={`star1${index}`}/>
                ))}
                {item.rating < 5 && new Array(5 - item.rating).fill(1).map((_, index) => (
                  <FaRegStar className="text-[18px]" key={`star2${index}`}/>
                ))}
              </div>
              <p className="text-gray-500 mb-[20px]">{item.user.fullName}, {`${(new Date(item.reviewDate)).toLocaleDateString()} ${(new Date(item.reviewDate)).toLocaleTimeString()}`}</p>
              <p>{item.comment}</p>
              {item.images.length > 0 && (
                <div className="flex mt-[20px]">
                  {item.images.map((item, index) => (
                  <div className="mr-[20px]" key={`image${index}`}>
                    <Image
                      width={100}
                      height={100}
                      src={`http://localhost:8080/api/v1/files/${item}`}
                      className="border-[1px] border-gray-400 object-contain"
                    />
                  </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        {reviews && limit < reviews.totalItem && (
          <div className="text-center" onClick={handleLimit}>
            <Button title="Xem thêm" />
          </div>
        )}
        <Modal 
          title="Đánh giá & nhận xét" 
          open={isModalOpen} 
          onCancel={handleCancel}
          footer={null}
        >
          <div className="flex items-center mt-[20px] mb-[20px]">
            <div className="w-[80px] h-[80px] border-[2px] border-gray-200 rounded-[4px]">
              <img src={product?.images[0]} alt="" className="w-full h-full object-contain" />
            </div>
            <h2 className="text-[#080808] text-[16px] font-[600] ml-[20px]">Sản phẩm: {product?.name}</h2>
          </div>
          <h2 className="text-[#080808] text-[14px] font-[600] flex items-center">
            <span className="mr-[15px]">Đánh giá chung:</span>
            <Rate
              onChange={(value) => setRate(value)} 
              defaultValue={5}
              style={{
                color: '#080808'
              }}
            />
          </h2>
          <div className="w-full h-[1px] bg-gray-300 my-[10px]"></div>
          <textarea
          rows={4} 
          className='w-full border-[1px] border-[#080808] rounded-[5px] p-[10px] mb-[20px]' placeholder="Vui lòng đánh giá & nhận xét ở đây..."
          onBlur={(e) => setContent(e.target.value)}
          ></textarea>
          <Upload
            listType="picture-card"
            accept="image/*"
            fileList={fileList}
            onChange={onChange}
            onPreview={onPreview}
            multiple={true}
            beforeUpload={() => false} // Tắt tự động upload
            onRemove={handleRemove}
            
          >
            <div className="flex flex-col items-center">
              <CameraOutlined className="text-[30px]" />
              <h2 className="text-center font-[600] text-[13px]">Thêm hình ảnh</h2>
            </div>
          </Upload>
          <div
            className="bg-[#080808] text-white text-center cursor-pointer mt-[20px] px-[10px] py-[8px] rounded-[10px] font-[500] hover:bg-[#3b3b3b] transition-all duration-100 ease-in-out"
            onClick={handleSubmit}
          >
            Gửi đánh giá 
          </div>
        </Modal>
      </div>    
    </>
    
  )
}

export default Review;