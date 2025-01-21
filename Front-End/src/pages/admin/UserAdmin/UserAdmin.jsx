import { Button, Form, Input, Modal, Select, Spin, Table, Tag, Tooltip } from "antd";
import { useEffect, useState } from "react";
import useMessage from "../../../hooks/useMessage";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { getAllUsers, getUserById, register, updateUser } from "../../../services/userService";

const UserAdmin = () => {
  const [dataSource, setDataSource] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [reload, setReload] = useState(false);
  const [actionType, setActionType] = useState('create');
  const [userId, setUserId] = useState(null);
  const [form] = Form.useForm();
  const message = useMessage();
  const { Search } = Input;

  useEffect(() => {
    const fetchApi = async () => {
      setIsLoading(true);
      const userRes = await getAllUsers();
      const data = userRes.data;
      setTimeout(() => {
        setIsLoading(false);
        setUserData(data);
      },100)
    }
    fetchApi();
  },[reload])
  
  const setUserData = (data) => {
    setDataSource(data.map((item, index) => {
      return {
        key: item._id,
        stt: index + 1,
        fullName: item.fullName,
        email: item.email,
        phone: item.phone,
        role: item.roles,
        status: item.active,
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
      title: 'Full Name',
      dataIndex: 'fullName',
      key: 'fullName'
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone'
    },
    {
      title: 'role',
      dataIndex: 'role',
      key: 'role',
      render: (role) => (
        <>
          {role.map(item => (
            <Tag key={item + "role"} className='text-[12px] font-[500] mr-[2px]' color="red">
              {item}
            </Tag>
          ))}
        </>
      )
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
        </>
      ),
    },
  ];

  const onReload = () => {
    setReload(prev => !prev); 
  }
  const handleUpdate = async (id) => {
    try {
      const userRes = await getUserById(id);
      const data = userRes.data;
      form.setFieldsValue({
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        role: data.roles,
        status: data.active,
        password: ''
      });
      setActionType('update');
      setUserId(id);
      showModal('update');
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
        if(data.password !== data.retypedPassword){
          message.error("Mật khẩu không khớp");
          return;
        }
        await register(data);
      }
      else{
        await updateUser(userId, data);
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

  const searchByKeyword = async (value, _e, info) => {
    if(value === ''){
      onReload();
    }
    else{
      const userRes = await getAllUsers(`q=${value}`);
      setUserData(userRes.data);
    }
  }

  return (
    <>
      {message.contextHolder}
      <div className='flex justify-between items-center mb-[30px]'>
        <div>
          <Search
            placeholder="Search by name, email, phone..."
            allowClear
            onSearch={searchByKeyword}
            style={{
              width: 300,
              marginRight: "40px"
            }}
          />
        </div>
        <div>
          <Tooltip title="Create">
            <Button type="primary" ghost icon={<PlusOutlined />} onClick={handleCreate}>
              Add new
            </Button>
          </Tooltip>
        </div>
      </div>
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
      <Modal 
        title={actionType === 'create' ? "Create User" : "Update User"} 
        open={isModalOpen} 
        onCancel={handleCancel}
        footer={null}
        >
        <Form
          layout="vertical"
          onFinish={handleFinish}
          form={form}
          initialValues={{
            fullName: '',
            email: '',
            phone: '',
            role: null,
            status: true,
            password: null,
          }}
        >
          <Form.Item
            label="Full Name"
            name="fullName"
            rules={[
              {
                required: true,
                message: 'Please input your full name!',
              },
            ]}
          >
            <Input placeholder='Full Name...' />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: 'Please input your email!',
              },
            ]}
          >
            <Input placeholder='Email...' />
          </Form.Item>
          <Form.Item
            label="Phone"
            name="phone"
            rules={[
              {
                required: true,
                message: 'Please input your phone!',
              },
            ]}
          >
            <Input placeholder='Phone...' />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: actionType === 'create',
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password placeholder='Password...' />
          </Form.Item>
          {actionType === 'create' && (
            <Form.Item
              label="Retyped Password"
              name="retypedPassword"
              rules={[
                {
                  required: true,
                  message: 'Please input your retypedPassword!',
                },
              ]}
            >
              <Input.Password placeholder='Retyped Password...' />
            </Form.Item>
          )}
          {actionType === 'update' && (
            <>
              <Form.Item
                label="Role"
                name="role"
                rules={[
                  {
                    required: true,
                    message: 'Please input your role!',
                  },
                ]}
              >
                <Select
                  placeholder="Role..."
                  mode="multiple" 
                  options={[
                    {
                      value: 'User',
                      label: 'User'
                    },
                    {
                      value: 'Admin',
                      label: 'Admin'
                    }
                  ]}
                />
              </Form.Item>
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
            </>
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

export default UserAdmin;