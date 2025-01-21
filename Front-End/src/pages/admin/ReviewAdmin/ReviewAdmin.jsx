import { CheckCircleOutlined, StopOutlined } from "@ant-design/icons";
import { Button, Image, Spin, Table, Tag, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { getAllReviews, updateReviewStatus } from "../../../services/reviewService";

const ReviewAdmin = () => {
  const [dataSource, setDataSource] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    const fetchApi = async () => {
      setIsLoading(true);
      const reviewRes = await getAllReviews();
      const data = reviewRes.data;
      setTimeout(() => {
        setIsLoading(false);
        setReviewData(data);
      },100)
    }
    fetchApi();
  },[reload])

  const setReviewData = (data) => {
    setDataSource(data.map((item, index) => {
      return {
        key: item._id,
        stt: index + 1,
        product: item.product.name,
        rating: item.rating,
        comment: item.comment,
        images: item.images,
        reviewDate: (new Date(item.reviewDate)).toLocaleString("vi-VN"),
        user: item.user.fullName,
        status: item.status,
        action: item.status
      }
    }))
  }

  const columns = [
    {
      title: 'STT',
      dataIndex: 'stt',
      key: 'stt',
      sorter: (a, b) => a.stt - b.stt, 
    },
    {
      title: 'Product',
      dataIndex: 'product',
      key: 'product'
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      key: 'rating',
      sorter: (a, b) => a.rating - b.rating, 
    },
    {
      title: 'Comment',
      dataIndex: 'comment',
      key: 'comment'
    },
    {
      title: 'Images',
      dataIndex: 'images',
      key: 'images',
      render: (images) => (
        images.map((item, index) => (
          <Image key={index} src={item.startsWith("https") ? item : `http://localhost:8080/api/v1/files/${item}`} alt="image" width={50} />
        ))
      )
    },
    {
      title: 'Review Date',
      dataIndex: 'reviewDate',
      key: 'reviewDate'
    },
    {
      title: 'User',
      dataIndex: 'user',
      key: 'user'
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag className='text-[14px] font-[500]' color={status === true ? 'green' : 'red'}>
          {status === true ? 'Active' : 'Inactive'}
        </Tag>
      ),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (status, record) => (
        <>
          {status === true ? (
            <Tooltip title="Block">
              <Button color="danger" variant="outlined" icon={<StopOutlined />} onClick={() => handleUpdate(record.key, false)} >
              </Button>
            </Tooltip>
            
          ) : (
            <Tooltip title="Unlock">
              <Button type="primary" ghost icon={<CheckCircleOutlined />} onClick={() => handleUpdate(record.key, true)} >
              </Button>
            </Tooltip>
          )}
        </>
      ),
    },
  ];

  const onReload = () => {
    setReload(prev => !prev); 
  }

  const handleUpdate = async (id, status) => {
    const response = await updateReviewStatus(id, status);
    if(response.code === 200){
      onReload();
    }
  }

  return (
    <>
      <Spin
        tip="Loading..." 
        spinning={isLoading}
        size="large"
      >
        <Table 
        dataSource={dataSource} 
        columns={columns} 
        pagination={{
          position: ["bottomCenter"],
          pageSize: 10
        }}
        style={{ fontSize: '16px' }}
      />
      </Spin>
    </>
  )
}

export default ReviewAdmin;