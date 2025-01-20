import { Button, Form, Image, Input, Modal, Select, Spin, Table, Tag, Tooltip, Upload } from "antd";
import { useEffect, useState } from "react";
import useMessage from "../../../hooks/useMessage";
import { CameraOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { createPaymentMethod, getAllPaymentMethods, getPaymentMethodById, updatePaymentMethod } from "../../../services/paymentMethodService";
import { createFile } from "../../../services/fileService";

const PaymentMethodAdmin = () => {
  const [dataSource, setDataSource] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [reload, setReload] = useState(false);
  const [actionType, setActionType] = useState('create');
  const [paymentId, setPaymentId] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [form] = Form.useForm();
  const message = useMessage();
  const { Search } = Input;

  useEffect(() => {
    const fetchApi = async () => {
      setIsLoading(true);
      const paymentMethodRes = await getAllPaymentMethods();
      const data = paymentMethodRes.data;
      setTimeout(() => {
        setIsLoading(false);
        setPaymentMethodData(data);
      },100)
    }
    fetchApi();
  },[reload])

  const setPaymentMethodData = (data) => {
    setDataSource(data.map((item, index) => {
      return {
        key: item._id,
        stt: index + 1,
        name: item.name,
        image: item.image,
        status: item.status,
        action: item._id
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
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name), 
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (image) => (
        image && (
          <Image src={image.startsWith("https") ? image : `http://localhost:8080/api/v1/files/${image}`} alt="image" width={100} />
        )
      ),
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
      const paymentMethodRes = await getPaymentMethodById(id);
      const data = paymentMethodRes.data;
      form.setFieldsValue({
        name: data.name,
        status: data.status
      });
      const image = data.image;
      setFileList( image ?
        [{
          uid: `1`,
          name: `Image 1`,
          status: "done",
          thumbUrl: image.startsWith("https") ? image : `http://localhost:8080/api/v1/files/${image}`,
        }]
        : []
      );
      setActionType('update');
      setPaymentId(id);
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

  const onChange = ({ file, fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const handleRemove = async (file) => {
    setFileList(prev => prev.filter(item => item.uid !== file.uid));
  }


  const handleFinish = async (data) => {
    var images = [];
    if(actionType === 'create'){
      if(fileList.length > 0){
        const formData= new FormData();
        fileList.forEach(file => {
          formData.append('files', file.originFileObj);
        });
        const files = await createFile(formData);
        if(files.code !== 201){
          message.error(files.message);
          return;
        }
        images = files.data;
      }
    }
    const newData = {
      ...data,
      image: images.length > 0 ? images[0] : null
    }
    try {
      setConfirmLoading(true);
      if(actionType === 'create'){
        await createPaymentMethod(newData);
      }
      else{
        if(fileList.length > 0 && fileList[0].uid !== '1'){
          const formData= new FormData();
          fileList.forEach(file => {
            formData.append('files', file.originFileObj);
          });
          const files = await createFile(formData);
          if(files.code !== 201){
            message.error(files.message);
            return;
          }
          await updatePaymentMethod(paymentId, {
            ...data,
            image: files.data[0]
          })
        }
        else if(fileList.length > 0 && fileList[0].uid === '1'){
          await updatePaymentMethod(paymentId, {
            ...data,
            image: undefined
          })
        }
        else{
          await updatePaymentMethod(paymentId, {
            ...data,
            image: null
          })
        }
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

  const searchByName = async (value, _e, info) => {
    if(value === ''){
      onReload();
    }
    else{
      const paymentMethodRes = await getAllPaymentMethods(`name=${value}`);
      setPaymentMethodData(paymentMethodRes.data);
    }
  }

  return (
    <>
      {message.contextHolder}
      <div className='flex justify-between items-center mb-[30px]'>
        <div>
          <Search
            placeholder="Search by name..."
            allowClear
            onSearch={searchByName}
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
        title={actionType === 'create' ? "Create Payment Method" : "Update Payment Method"} 
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
          <Form.Item
            label="Image"
          >
            <Upload
              listType="picture-card"
              accept="image/*"
              fileList={fileList}
              onChange={onChange}
              onPreview={false}
              onRemove={handleRemove}
              maxCount={1}
              beforeUpload={() => false} // Tắt tự động upload
            >
              <div className="flex flex-col items-center">
                <CameraOutlined className="text-[30px]" />
                <h2 className="text-center font-[600] text-[13px]">Thêm hình ảnh</h2>
              </div>
            </Upload>

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

export default PaymentMethodAdmin;