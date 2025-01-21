import { useEffect, useState } from "react";
import { addNewAddressByMyInfo, deleteAddressByMyInfo, getMyInfo, updateAddressByMyInfo } from "../../../../services/userService";
import { HomeOutlined, PlusOutlined } from '@ant-design/icons';
import { FaEllipsis } from "react-icons/fa6";
import { Form, Modal } from "antd";
import { toast } from "sonner";
import { Dropdown } from 'antd';

const AddressPage = () => {
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalUpdate, setIsModalUpdate] = useState(false);
  const [addressUpdate, setAddressUpdate] = useState({
    id: '',
    name: '',
    detail: '',
    isDefault: false
  })
  const [form] = Form.useForm();
  const [formUpdate] = Form.useForm();
  const [reload, setReload] = useState(false);
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const result = await getMyInfo();
        setUser(result.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchApi();
  },[reload]);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const showModalUpdate = () => {
    setIsModalUpdate(true);
  };
  const handleCancelUpdate = () => {
    setIsModalUpdate(false);
  };
  const input = [
    {
      label: "Họ và tên",
      name: 'name',
      placeholder: 'Họ và tên'
    },
    {
      label: "Địa chỉ",
      name: 'detail',
      placeholder: 'Địa chỉ chi tiết'
    }
  ];
  const handleFinish = async (values) => {
    try {
      await addNewAddressByMyInfo(values);
      setReload(!reload);
      form.resetFields();
      handleCancel();
      setTimeout(() => {
        toast.success('Thêm mới địa chỉ thành công', { duration: 1000 });
      },500)
    } catch (error) {
      console.log(error);
    }
  }
  const items = [
    {
      label: 'Cập nhật',
      key: 'edit',
    },
    {
      label: 'Xóa',
      key: 'delete',
    },
  ];
  const handleMenuClick = async (e, addressId) => {
    if(e.key === 'edit'){
      const address = user.address.filter(item => item._id === addressId)[0];
      setAddressUpdate({
        id: addressId,
        name: address.name,
        detail: address.detail,
        isDefault: address.isDefault
      })
      showModalUpdate();
    }
    else{
      try {
        await deleteAddressByMyInfo(addressId);
        setReload(!reload);
        toast.success('Xóa địa chỉ thành công địa chỉ thành công', { duration: 1000 });
      } catch (error) {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    formUpdate.setFieldsValue(addressUpdate);
  }, [addressUpdate, formUpdate]);

  const handleUpdateAddress = async (values) => {
    try {
      await updateAddressByMyInfo(addressUpdate.id, values);
      setReload(!reload);
      handleCancelUpdate();
      setTimeout(() => {
        toast.success('Cập nhật địa chỉ thành công địa chỉ thành công', { duration: 1000 });
      },500)
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      {user && (
        <div className="bg-white py-[20px] px-[60px] min-h-[600px] rounded-[15px] border-[1px] border-gray-200 text-center">
          <div className="text-start mb-[10px]">
            <button className="border-[1px] rounded-[6px] px-[8px] py-[4px] border-gray-200 hover:border-gray-950 transition-all duration-100 ease-in-out" onClick={showModal}>
              <PlusOutlined className="mr-[6px]" />
              <span>Thêm mới</span>
            </button>
          </div>
          {user.address.map((item, index) => (
            <div key={index} className="flex items-center px-[20px] py-[8px] justify-between rounded-[10px] border-[1px] border-gray-200 mb-[20px]">
              <div className="flex items-center">
                <span className="text-[40px] mr-[12px]"><HomeOutlined /></span>
                <div className="">
                  <div className="flex items-center">
                    <p className="text-start font-[700] mr-[15px]">{item.name}</p>
                    {item.isDefault && (
                      <span className="text-[12px] text-gray-200 font-[500] bg-gray-500 rounded-[5px] px-[8px] py-[5px] border-[1px] border-gray-200 ">Mặc định</span>
                    )}
                  </div>
                  <p className="text-[14px] text-start font-[500] text-gray-500">{item.detail}</p>
                </div>
              </div>
              <div className="">
                <Dropdown
                  menu={{
                    items,
                    onClick: (e) => handleMenuClick(e, item._id)
                  }}
                  trigger={['click']}
                >
                  <FaEllipsis className="cursor-pointer text-[22px]" />
                </Dropdown>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Add */}
      <Modal 
        title="Thêm mới địa chỉ"
        open={isModalOpen} 
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          onFinish={handleFinish}
        >
          {input.map((item, index) => (
            <Form.Item
              name={item.name}
              key={index}
            >
            <div className="flex flex-col">
              <label className="w-[20%] text-start font-[500] mb-[10px]" htmlFor={item.name}>{item.label}</label>
              <input id={item.name} type="text" className="h-[45px] py-[5px] px-[20px] outline-none border-[1px] border-gray-400 font-[500] text-[16px] w-full focus:border-black rounded-[10px]" placeholder={item.placeholder} required/>
            </div>
            </Form.Item>
          ))}
          <Form.Item name="isDefault" valuePropName="checked">
            <div className="flex items-center">
              <input id="default" type="checkbox" className="mr-[10px] w-[16px] h-[16px] accent-[#080808]" />
              <label htmlFor="default" className="font-[500] cursor-pointer">Mặc định</label>
            </div>
          </Form.Item>
          <Form.Item>
            <button
              className="bg-[#080808] text-white text-center cursor-pointer px-[10px] py-[8px] rounded-[10px] font-[500] hover:bg-[#3b3b3b] transition-all duration-100 ease-in-out w-full"
              type="submit"
            >
              Thêm mới
            </button>
          </Form.Item>
        
        </Form>
      </Modal>

      {/* Modal Update */}
      <Modal 
        title="Cập nhật địa chỉ"
        open={isModalUpdate} 
        onCancel={handleCancelUpdate}
        footer={null}
      >
        <Form
          form={formUpdate}
          onFinish={handleUpdateAddress}
        >
          <Form.Item name="name">
            <div className="flex flex-col">
              <label className="w-[20%] text-start font-[500] mb-[10px]" htmlFor="nameUpdate">Họ và tên</label>
              <input
                id="nameUpdate"
                type="text"
                className="h-[45px] py-[5px] px-[20px] outline-none border-[1px] border-gray-400 font-[500] text-[16px] w-full focus:border-black rounded-[10px]"
                placeholder="Họ và tên"
                value={addressUpdate.name} 
                onChange={(e) => setAddressUpdate({ ...addressUpdate, name: e.target.value })}
                required
              />
            </div>
          </Form.Item>
          <Form.Item
            name="detail"
          >
          <div className="flex flex-col">
            <label className="w-[20%] text-start font-[500] mb-[10px]" htmlFor="detailUpdate">Địa chỉ</label>
            <input 
              id="detailUpdate" 
              type="text" 
              className="h-[45px] py-[5px] px-[20px] outline-none border-[1px] border-gray-400 font-[500] text-[16px] w-full focus:border-black rounded-[10px]" 
              placeholder="Địa chỉ chi tiết"
              value={addressUpdate.detail} 
              onChange={(e) => setAddressUpdate({ ...addressUpdate, detail: e.target.value })} 
              required/>
          </div>
          </Form.Item>
          <Form.Item name="isDefault" valuePropName="checked">
            <div className="flex items-center">
              <input 
                id="defaultUpdate" 
                type="checkbox" 
                onChange={(e) => setAddressUpdate({ ...addressUpdate, isDefault: e.target.checked })} 
                checked={addressUpdate.isDefault}
                className="mr-[10px] w-[16px] h-[16px] accent-[#080808]" />
              <label htmlFor="defaultUpdate" className="font-[500] cursor-pointer">Mặc định</label>
            </div>
          </Form.Item>
          <Form.Item>
            <button
              className="bg-[#080808] text-white text-center cursor-pointer px-[10px] py-[8px] rounded-[10px] font-[500] hover:bg-[#3b3b3b] transition-all duration-100 ease-in-out w-full"
              type="submit"
            >
              Cập nhật
            </button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default AddressPage;