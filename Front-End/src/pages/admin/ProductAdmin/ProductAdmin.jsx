import React, { useEffect, useState } from "react";
import { addImageToProduct, createProduct, deleteImageProduct, filterProduct, getAllProducts, getProductById, getProductsByCategory, updateProduct } from "../../../services/productService";
import { Button, Form, Image, Input, InputNumber, Modal, Popconfirm, Select, Table, Tag, Tooltip, Upload } from "antd";
import { EditOutlined, PlusOutlined, CameraOutlined } from "@ant-design/icons";
import { getCodeColor } from "../../../utils/getCodeColor";
import useMessage from "../../../hooks/useMessage";
import TextArea from "antd/es/input/TextArea";
import { getAllCategories } from "../../../services/categoryService";
import { createFile } from "../../../services/fileService";
const { Search } = Input;

const ProductAdmin = () => {
  const [dataSource, setDataSource] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [reload, setReload] = useState(false);
  const [actionType, setActionType] = useState('create');
  const [productId, setProductId] = useState(null);
  const [categories, setCategories] = useState(null);
  const [form] = Form.useForm();
  const message = useMessage();
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    const fetchApi = async () =>{
      const productsRes = await getAllProducts();
      const categoryRes = await getAllCategories();
      setCategories(categoryRes.data);
      const data = productsRes.data;
      setProductData(data);
      
    }
    fetchApi();
  },[reload])

  const setProductData = (data) => {
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
      sorter: (a, b) => a.stt - b.stt
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
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      sorter: (a, b) => a.category.localeCompare(b.category),
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (image) => (
        image && (
          <Image src={image.startsWith("https") ? image : `http://localhost:8080/api/v1/files/${image}`} alt="image" width={50} />
        )
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
      render: (price) => (
        <>
          {price.toLocaleString('vi-VN') + "đ"}
        </>
      ),
      sorter: (a, b) => a.price - b.price
    },
    {
      title: 'Discounted Price',
      dataIndex: 'discountedPrice',
      key: 'discountedPrice',
      render: (discountedPrice) => (
        <>
          {discountedPrice + "%"}
        </>
      ),
      sorter: (a, b) => a.discountedPrice - b.discountedPrice
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      sorter: (a, b) => a.quantity - b.quantity
    },
    {
      title: 'Colors',
      dataIndex: 'colors',
      key: 'colors',
      render: (colors) => (
        <>
          {colors.map(item => (
            <Tag key={item + "color"} className="text-[12px] font-[500] mr-[2px]" style={{
              color: `${item === 'Trắng' ? 'black' : 'white'}`
            }}
            color={getCodeColor(item)}>
              {item}
            </Tag>
          ))}
        </>
      )
    },
    {
      title: 'Sizes',
      dataIndex: 'sizes',
      key: 'sizes',
      render: (sizes) => (
        <>
          {sizes.map(item => (
            <Tag key={item + "size"} className='text-[12px] font-[500] mr-[2px]' color="red">
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
      key: '',
      render: (_, record) => (
        <Tooltip title="Update">
          <Button type="primary" ghost icon={<EditOutlined />} onClick={() => handleUpdate(record.key)}>
          </Button>
        </Tooltip>
      ),
    }

  ];
  const onReload = () => {
    setReload(prev => !prev); 
  }
  const handleCreate = () => {
    setActionType('create');
    showModal('create');
  }
  const showModal = (type) => {
    if(type === 'create'){
      form.resetFields();
      setFileList([]);
    }
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  
  const colors = [
    "Tím", "Vàng", "Cam", "Hồng", "Đen", "Xám", "Trắng", "Xanh dương", "Xanh", "Xanh lá", "Nâu", "Xanh mint", "Đỏ"
  ];
  const sizes = [
    "S", "M", "L", "XL"
  ];

  const onChange = async ({ file, fileList: newFileList }) => {
    const isDuplicate = fileList.some(
      (f) => f.name === file.name && f.size === file.size
    );

    if (isDuplicate) {
      return;
    }

    if(newFileList.length > 4){
      message.error("Chỉ được upload tối đa 4 ảnh");
      return;
    }

    if(actionType === 'update'){
      try {
        const formData= new FormData();
        formData.append('files', file);
        const files = await createFile(formData);
        if(files.code === 201){
          await addImageToProduct(productId, {
            image: files.data[0]
          });
          onReload();
        }
      } catch (error) {
        message.error(error.response.data.message)
      }
    }

    setFileList(newFileList);
  };
  const onPreview = async (file) => {
    if(actionType === 'update'){
      window.open(file.thumbUrl);
      return;
    }
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


  const handleRemove = async (file) => {
    if(actionType === 'update'){
      try {
        await deleteImageProduct(productId, file.thumbUrl);
        onReload();
      } catch (error) {
        message.error(error.response.data.message)
      }
    }
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
      images: images
    }
    try {
      setConfirmLoading(true);
      if(actionType === 'create'){
        await createProduct(newData);
      }
      else{
        await updateProduct(productId, data);
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

  const handleUpdate = async (id) => {
    try {
      const productRes = await getProductById(id);
      const data = productRes.data;
        form.setFieldsValue({
          name: data.name,
          description: data.description,
          price: data.price,
          discountedPrice: data.discountedPrice,
          quantity: data.quantity,
          colors: data.colors,
          status: data.status,
          sizes: data.sizes,
          categoryId: data.categoryId._id,
        });
        setFileList(data.images.map((item, index) => (
          {
            uid: `${index}`,
            name: `Image ${index + 1}`,
            status: "done",
            thumbUrl: item.startsWith("https") ? item : `http://localhost:8080/api/v1/files/${item}`,
          }
        )));
        setProductId(id);
        setActionType('update')
        showModal('update');
    } catch (error) {
      message.error(error.response.data.message)
    }
  }
  
  // Custom thêm Popconfirm vào nút xóa
  const customItemRender = (originNode, file) => {
    return React.cloneElement(originNode, {
      children: originNode.props.children.map((child, index) => {
        if (index === 3) {
          return (
            actionType === 'update' 
            ? (<Popconfirm
                title="Bạn có chắc chắn muốn xóa ảnh này không?"
                onConfirm={() => {
                  handleRemove(file);
                }}
                okText="Có"
                cancelText="Không"
              >
                {child}
              </Popconfirm>) 
            : child
          );
        }
        return child; // Giữ nguyên các phần tử khác
      }),
    });
  };

  const searchByName = async (value, _e, info) => {
    if(value === ''){
      const productsRes = await getAllProducts();
      setProductData(productsRes.data);
    }
    else{
      const productsRes = await filterProduct(`filter=name:${value}&limit=1000`);
      const data = productsRes.data.result.map(item => {
        const { category, categoryId, ...rest } = item;
        return {
          categoryId: category,
          ...rest
        }
      });
      setProductData(data);
    }
  }

  const searchByCategory = async (value) => {
    if(value === 'all'){
      const productsRes = await getAllProducts();
      setProductData(productsRes.data);
    }
    else{
      const productsRes = await getProductsByCategory(value);
      setProductData(productsRes.data);
    }
  }
  
  return (
    <>
      {message.contextHolder}
      <div className='flex justify-between items-center mb-[30px]'>
        <div className="">
          <Search
            placeholder="Search by name..."
            allowClear
            onSearch={searchByName}
            style={{
              width: 300,
              marginRight: "40px"
            }}
          />
          <Select
            options={[
              {
                value: "all",
                label: "all"
              },
              ...(Array.isArray(categories) ? categories.map(item => ({
                value: item._id,
                label: item.name
              })) : [])
            ]}
            style={{
              width: 150
            }}
            placeholder = "Category..."
            onChange={searchByCategory}
          />
        </div>
        <div className="">
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
        title={actionType === 'create' ? "Create Product" : "Update Product"} 
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
            description: '',
            price: '',
            discountedPrice: '',
            quantity: '',
            colors: null,
            status: true,
            sizes: null,
            categoryId: '',
          }}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: 'Please input your product name!',
              },
            ]}
          >
            <Input placeholder="Name..." />
          </Form.Item>
          <Form.Item
            label="Price"
            name="price"
            rules={[
              {
                required: true,
                message: 'Please input your product price!',
              },
            ]}
          >
            <InputNumber 
              min={1} 
              style={{
                width: "100%"
              }}
              placeholder="Price..."
            />
          </Form.Item>
          <Form.Item
            label="Discounted Price"
            name="discountedPrice"
            rules={[
              {
                required: true,
                message: 'Please input your product Discounted Price!',
              },
            ]}
          >
            <InputNumber 
              min={1}
              max={100} 
              style={{
                width: "100%"
              }}
              placeholder="Discount Price..."
            />
          </Form.Item>
          <Form.Item
            label="Quantity"
            name="quantity"
            rules={[
              {
                required: true,
                message: 'Please input your product quantity!',
              },
            ]}
          >
            <InputNumber 
              min={1}
              style={{
                width: "100%"
              }}
              placeholder="Quantity..."
            />
          </Form.Item>
          <Form.Item
            label="Category"
            name="categoryId"
            rules={[
              {
                required: true,
                message: 'Please input your category!',
              },
            ]}
          >
            <Select
              placeholder="Category..." 
              options={categories?.map(item => (
                {
                  value: item._id,
                  label: item.name
                }
              ))}
            />
          </Form.Item>
          <Form.Item
            label="Colors"
            name="colors"
            rules={[
              {
                required: true,
                message: 'Please input your product color!',
              },
            ]}
          >
            <Select
              placeholder="Color..."
              mode="multiple"
              options={colors.map(item => (
                {
                  value: item,
                  label: item
                }
              ))}
            />
          </Form.Item>
          <Form.Item
            label="Sizes"
            name="sizes"
          >
            <Select
              placeholder="Size..." 
              mode="multiple"
              options={sizes.map(item => (
                {
                  value: item,
                  label: item
                }
              ))}
            />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[
              {
                required: true,
                message: 'Please input your product description!',
              },
            ]}
          >
            <TextArea rows={4} placeholder="Description..." />
          </Form.Item>
          <Form.Item
            label="Image"
          >
            <Upload
              listType="picture-card"
              accept="image/*"
              fileList={fileList}
              onChange={onChange}
              onPreview={onPreview}
              onRemove={actionType === 'create' ? handleRemove : false}
              multiple={true}
              beforeUpload={() => false} // Tắt tự động upload
              itemRender={customItemRender}
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

export default ProductAdmin;