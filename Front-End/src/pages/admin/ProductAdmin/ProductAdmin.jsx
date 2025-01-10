import { useEffect, useState } from "react";
import { getAllProducts } from "../../../services/productService";
import { Button, Image, Table, Tag, Tooltip } from "antd";
import { EditOutlined } from "@ant-design/icons";

const ProductAdmin = () => {
  const [dataSource, setDataSource] = useState([]);
  useEffect(() => {
    const fetchApi = async () =>{
      const productsRes = await getAllProducts();
      const data = productsRes.data;
      setDataSource(data.map((item, index) => {
        return {
          key: item._id,
          stt: index + 1,
          name: item.name,
          slug: item.slug,
          category: item.categoryId?.name,
          image: item.images[0],
          description: item.description,
          price: item.price,
          discountedPrice: item.discountedPrice,
          quantity: item.quantity,
          colors: item.colors,
          sizes: item.sizes,
          status: true,
          action: item._id
        }
      }))
    }
    fetchApi();
  },[])
  const columns = [
    {
      title: 'STT',
      dataIndex: 'stt',
      key: 'stt',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Slug',
      dataIndex: 'slug',
      key: 'slug',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (image) => (
        <Image src={image} alt="image" width={50} />
      ),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Discounted Price',
      dataIndex: 'discountedPrice',
      key: 'discountedPrice',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Colors',
      dataIndex: 'colors',
      key: 'colors',
    },
    {
      title: 'Sizes',
      dataIndex: 'sizes',
      key: 'sizes',
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
      key: '',
      render: (_, record) => (
        <Tooltip title="Update">
          <Button type="primary" ghost icon={<EditOutlined />}>
          </Button>
        </Tooltip>
      ),
    }

  ];
  return (
    <>
      <Table 
        dataSource={dataSource} 
        columns={columns} 
        pagination={{
          position: ["bottomCenter"],
          pageSize: 10
        }}
        style={{ fontSize: '16px' }}
      />
    </>
  )
}

export default ProductAdmin;