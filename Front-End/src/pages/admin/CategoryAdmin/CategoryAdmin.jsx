import { Button, Form, Input, Modal, Select, Table, Tag, Tooltip } from 'antd';
import { useEffect, useState } from 'react';
import { createCategory, deleteCategory, getAllCategories, getCategoryById, updateCategory } from '../../../services/categoryService';
import { EditOutlined, PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import useMessage from '../../../hooks/useMessage';
const CategoryAdmin = () => {
  const [dataSource, setDataSource] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [reload, setReload] = useState(false);
  const [actionType, setActionType] = useState('create');
  const [categoryId, setCategoryId] = useState(null);
  const [form] = Form.useForm();
  const message = useMessage();
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
  },[reload])
  
  
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
        <>
          <Tooltip title="Update" className='mr-[10px]'>
            <Button type="primary" ghost icon={<EditOutlined />} onClick={() => handleUpdate(record.key)} >
            </Button>
          </Tooltip>
          <Tooltip title="Remove">
            <Button color="danger" variant="outlined" icon={<DeleteOutlined />} onClick={() => handleRemove(record.key)}>
            </Button>
          </Tooltip>
        </>
      ),
    },
  ];
  
  const onReload = () => {
    setReload(prev => !prev); 
  }
  const handleUpdate = async (id) => {
    try {
      const categoryRes = await getCategoryById(id);
      const data = categoryRes.data;
      form.setFieldsValue({
        name: data.name,
        status: data.status
      });
      setActionType('update');
      setCategoryId(id);
      showModal('update');
    } catch (error) {
      message.error(error.response.data.message)
    }
  }

  const handleRemove = async (id) => {
    try {
      await deleteCategory(id);
      onReload();
    } catch (error) {
      message.error(error.response.data.message)
    }
  }
  
  const handleCreate = () => {
    setActionType('create');
    showModal('create');
  }
  const showModal = (type) => {
    if(type === 'create'){
      form.resetFields();
    }
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleFinish = async (data) => {
    try {
      setConfirmLoading(true);
      if(actionType === 'create'){
        await createCategory(data);
      }
      else{
        await updateCategory(categoryId, data);
      }
      setTimeout(() => {
        handleCancel();
        onReload();
      },1000)
    } catch (error) {
      setTimeout(() => {
        message.error(error.response.data.message)
      },1000)
    } finally {
      setTimeout(() => {
        setConfirmLoading(false);
      },1000)
    }
  }
  
  return (
    <>
      {message.contextHolder}
      <div className='flex justify-between items-center mb-[30px]'>
        <div>
          search
        </div>
        <div>
          <Tooltip title="Create">
            <Button type="primary" ghost icon={<PlusOutlined />} onClick={handleCreate}>
              Add new
            </Button>
          </Tooltip>
        </div>
      </div>
      <Table 
        dataSource={dataSource} 
        columns={columns} 
        pagination={{
          position: ["bottomCenter"],
          pageSize: 10
        }}
        style={{ fontSize: '16px' }}
      />
      <Modal 
        title={actionType === 'create' ? "Create Category" : "Update Category"} 
        open={isModalOpen} 
        onCancel={handleCancel}
        footer={null}
        >
        <Form
          layout="vertical"
          onFinish={handleFinish}
          form={form}
          initialValues={{
            name: '',
            status: true
          }}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: 'Please input your category name!',
              },
            ]}
          >
            <Input placeholder='Name...' />
          </Form.Item>
          {actionType === 'update' && (
              <Form.Item
              label="Status"
              name="status"
            >
              <Select 
                options={[
                  {
                    value: true,
                    label: 'Active'
                  },
                  {
                    value: false,
                    label: 'InActive'
                  }
                ]}
              />
            </Form.Item>
          )}
          <Form.Item className='text-end'>
            <Button loading={confirmLoading} type="primary" htmlType="submit">
              {actionType === 'create' ? 'Create' : 'Update'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default CategoryAdmin;