// import { Link } from "react-router-dom";
import { SortAscendingOutlined, CaretDownOutlined, FilterOutlined, CloseOutlined } from '@ant-design/icons';
import { useState } from "react";
const FilterProduct = (props) => {
  const { title } = props;
  const filter = [
    "Sản phẩm nổi bật",
    "Giá: Tăng dần",
    "Giá: Giảm dần",
    "Tên: A-Z",
    "Tên: Z-A",
    "Cũ nhất",
    "Mới nhất",
    "Bán chạy nhất",
    "Tồn kho giảm dần"
  ];

  const priceList = [
    "Dưới 1.000.000đ",
    "1.000.000đ - 2.000.000đ",
    "2.000.000đ - 3.000.000đ",
    "3.000.000đ - 4.000.000đ",
    "Trên 4.000.000đ"
  ];

  const colorList = [
    { label: "Tím", code: "#eb11eb" },
    { label: "Vàng", code: "#ffff05" },
    { label: "Cam", code: "#f54105" },
    { label: "Hồng", code: "#f23895" },
    { label: "Đen", code: "#000000" },
    { label: "Xám", code: "#cccaca" },
    { label: "Trắng", code: "#ffffff" },
    { label: "Xanh dương", code: "#1757eb" },
    { label: "Xanh", code: "#099116" },
    { label: "Xanh lá", code: "#52ff52" },
    { label: "Nâu", code: "#8b572a" },
    { label: "Xanh mint", code: "#91cca5" },
  ];

  const sizeList = ["S", "M", "L", "XL", "XXL"];

  const [filterValues, setFilterValues] = useState([]);

  const handleClick = (event, data) => {
    const { checked } = event.target;
    const { type, value } = data

    setFilterValues((prev) => {
      var indexType = prev.findIndex(item => item.type === type);

      if(checked){
        if(indexType !== -1){
          return prev.map((item, index) =>
            index === indexType
              ? { ...item, values: [...item.values, value] }
              : item
          );
        }
        else{
          return [...prev, { type, values: [value] }];
        }
      }
      else{

        if(indexType !== -1){

          return prev.map((item, index) =>
            index === indexType
              ? { ...item, values: item.values.filter(val => val !== value) }
              : item
          );
        } 
      }
      return prev;
    })
  }

  const handleClickSort = (data) => {
    const { type, value } = data;
    setFilterValues(prev => {
      var indexType = prev.findIndex(item => item.type === type);
      if(indexType !== -1){
        return prev.map((item, index) =>
          index === indexType
            ? { ...item, values: [value] }
            : item
        );
      }
      else{
        return [...prev, { type, values: [value] }];
      }
    })
  }
  const handleRemove = (type) => {
    setFilterValues(prev => {
      return prev.filter(item => item.type !== type);
    })
  }

  const handleRemoveAll = () => {
    setFilterValues([]);
  }

  const isFilterChecked = (type, value) => {
    const filterType = filterValues.find(item => item.type === type);
    return filterType && filterType.values.includes(value);
  };

  return (
    <>
      <div className="bg-white px-[20px] py-[15px] flex items-center justify-between">
        <h1 className="text-[#080808] text-[26px] font-[500] uppercase">{title}</h1>
        <div className="border-[1px] border-[#e7e7e7] w-[250px] px-[12px] py-[8px] cursor-pointer relative group">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <SortAscendingOutlined className="text-[20px]"/>
              <span className="ml-[10px] text-[14px] font-[500]">Sắp xếp</span>
            </div>
            <div className="">
              <CaretDownOutlined className="text-gray-500" />
            </div>
          </div>
          <ul className="absolute top-[40px] w-[250px] hidden group-hover:block bg-white border-[1px] border-[#e7e7e7] left-[-0.5px] text-[14px] z-50">
            {filter.map((item, index) => (
              <li 
                key={index} 
                className="py-[8px] px-[15px] hover:text-gray-600"
                onClick={() => handleClickSort({
                  type: "Sắp xếp",
                  value: item
                })}
              >{item}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="py-[15px] flex items-center">
        <div className="flex items-center pr-[30px] border-r-[1px] border-gray-300">
          <FilterOutlined className='text-gray-600 text-[24px]' />
          <span className='text-[14px] font-bold ml-[10px]'>BỘ LỌC</span>
        </div>

        <div className="border-[1px] border-[#e7e7e7] w-[250px] px-[12px] py-[8px] cursor-pointer relative group ml-[30px]">
          <div className="flex items-center justify-between">
            <div className="text-[13px] font-bold">
              Lọc giá
            </div>
            <div className="">
              <CaretDownOutlined className="text-gray-500" />
            </div>
          </div>
          <ul className="absolute z-50 top-[40px] w-[250px] hidden group-hover:block bg-white border-[1px] border-[#e7e7e7] left-[-0.5px] text-[14px]">
            {priceList.map((item, index) => (
              <li 
                key={`${index}price`} 
                className="py-[8px] px-[15px] flex items-center"
                >
                <input 
                  onClick={(e) => handleClick(e, {
                    type: "Lọc giá",
                    value: item
                  })}
                  checked={isFilterChecked("Lọc giá", item)} 
                  id={item} 
                  type="checkbox" 
                  className='mr-[10px] w-[16px] h-[16px] accent-[#080808]' 
                  />
                <label htmlFor={item}  className="hover:text-gray-600 cursor-pointer">{item}</label>
              </li>
            ))}
          </ul>
        </div>

        <div className="border-[1px] border-[#e7e7e7] w-[250px] px-[12px] py-[8px] cursor-pointer relative group ml-[50px]">
          <div className="flex items-center justify-between">
            <div className="text-[13px] font-bold">
              Màu sắc
            </div>
            <div className="">
              <CaretDownOutlined className="text-gray-500" />
            </div>
          </div>
          <ul className="absolute z-50 top-[40px] py-[8px] px-[15px] hidden w-[250px] group-hover:block bg-white border-[1px] border-[#e7e7e7] left-[-0.5px] text-[14px]">
            {colorList.map((item, index) => (
              <li key={`${index}color`} className="inline-block">
                <input 
                  onClick={(e) => handleClick(e, {
                    type: "Màu sắc",
                    value: item.label
                  })}
                  checked={isFilterChecked("Màu sắc", item.label)} 
                  className="hidden peer" 
                  type="checkbox" 
                  id={item.code} 
                  value={item.label} 
                />
                <label 
                  htmlFor={item.code} 
                  style={{ backgroundColor: item.code }}
                  className="relative inline-block w-[25px] h-[25px] mr-[15px] mb-[10px] border-[1px] border-gray-200 rounded-full cursor-pointer
                            peer-checked:after:content-['✔'] peer-checked:after:absolute peer-checked:after:text-white peer-checked:after:text-xs peer-checked:after:inset-0 peer-checked:after:flex peer-checked:after:items-center peer-checked:after:justify-center">
                </label> 
              </li>
            ))}
          </ul>
        </div>
        
        <div className="border-[1px] border-[#e7e7e7] w-[250px] px-[12px] py-[8px] cursor-pointer relative group ml-[50px]">
          <div className="flex items-center justify-between">
            <div className="text-[13px] font-bold">
              Kích thước
            </div>
            <div className="">
              <CaretDownOutlined className="text-gray-500" />
            </div>
          </div>
          <ul className="absolute z-50 top-[40px] w-[250px] hidden group-hover:block bg-white border-[1px] border-[#e7e7e7] left-[-0.5px] text-[14px]">
            {sizeList.map((item, index) => (
              <li key={`${index}size`} className="py-[8px] px-[15px] flex items-center">
                <input 
                  onClick={(e) => handleClick(e, {
                    type: "Kích thước",
                    value: item
                  })}
                  checked={isFilterChecked("Kích thước", item)}
                  id={item} 
                  type="checkbox" 
                  className='mr-[10px] w-[16px] h-[16px] accent-[#080808]' 
                />
                <label htmlFor={item}  className="hover:text-gray-600 cursor-pointer">{item}</label>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className='flex flex-wrap items-center text-[#5D5D5D] text-[13px] mb-[20px]'>
        {filterValues.map((item, index) => (
          item.values.length > 0 && (
            <div key={item.type + index} className='inline-flex mb-[15px] items-center px-[14px] py-[4px] border-[1px] border-gray-300 rounded-[15px] mr-[15px]'>
            <span className='mr-[5px]'>{item.type}:</span>
            {item.values.map((citem, cindex) => (
              (cindex !== (item.values.length - 1)) ? (
                <span key={citem + cindex} className='font-bold mr-[4px]'>{citem}, </span>
              ) : (
                <span key={citem + cindex} className='font-bold mr-[4px]'>{citem} </span>
              )
            ))}
            <CloseOutlined onClick={() => handleRemove(item.type)} className='text-[17px] ml-[8px] cursor-pointer'/>
          </div>
          )
        ))}
        {filterValues.length > 1 && (
          <p onClick={handleRemoveAll} className='pb-[1px] border-b-[1px] border-gray-400 cursor-pointer font-bold mb-[15px]'>Xóa hết</p>
        )}
      </div>
    </>
  )
}

export default FilterProduct;

