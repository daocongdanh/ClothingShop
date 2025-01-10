import { Button, Table, Tag, Tooltip } from 'antd';
import { useEffect, useState } from 'react';
import { getAllCategories } from '../../../services/categoryService';
import {EditOutlined} from "@ant-design/icons";
const CategoryAdmin = () => {
  const [dataSource, setDataSource] = useState([]);
  useEffect(() => {
    const fetchApi = async () => {
      const categoriesRes = await getAllCategories();
      const data = categoriesRes.data;
      setDataSource(data.map((item, index) => {
        return {
          key: item._id,
          stt: index + 1,
          name: item.name,
          slug: item.slug,
          status: item.status,
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
      sorter: (a, b) => a.stt - b.stt, 
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name), 
    },
    {
      title: 'Slug',
      dataIndex: 'slug',
      key: 'slug',
      sorter: (a, b) => a.slug.localeCompare(b.slug),
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
      render: (_, record) => (
        <Tooltip title="Update">
          <Button type="primary" ghost icon={<EditOutlined />}>
          </Button>
        </Tooltip>
      ),
    },
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

export default CategoryAdmin;