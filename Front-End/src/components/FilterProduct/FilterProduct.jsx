import { useNavigate, useLocation } from 'react-router-dom';
import { SortAscendingOutlined, CaretDownOutlined, FilterOutlined, CloseOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react";
const FilterProduct = (props) => {
  const { title, slug, setCurrentPage } = props;
  const filter = [
    {
      label: "Giá: Tăng dần",
      key: "price",
      value: "asc"
    },
    {
      label: "Giá: Giảm dần",
      key: "price",
      value: "desc"
    },
    {
      label: "Tên: A-Z",
      key: "name",
      value: "asc"
    },
    {
      label: "Tên: Z-A",
      key: "name",
      value: "desc"
    }
  ];

  const priceList = [
    {
      label: "Dưới 200.000đ",
      value: "0-200000"
    },
    {
      label: "200.000đ - 400.000đ",
      value: "200000-400000"
    },
    {
      label: "400.000đ - 600.000đ",
      value: "400000-600000"
    },
    {
      label: "600.000đ - 800.000đ",
      value: "600000-800000"
    },
    {
      label: "Trên 800.000đ",
      value: "800000-10000000"
    },
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
    { label: "Đỏ", code: "#FF0000"}
  ];

  const sizeList = ["S", "M", "L", "XL"];

  const [filterValues, setFilterValues] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();


  const handleClick = (event, data) => {
    const { checked } = event.target;
    const { label, type, operation, key, value } = data
    setFilterValues((prev) => {
      var indexType = prev.findIndex(item => item.label === label);

      if(checked){
        if(indexType !== -1){
          return prev.map((item, index) =>
            index === indexType
              ? { ...item, data: [...item.data, {x: value[0], y: value[1]}] }
              : item
          );
        }
        else{
          return [...prev, { 
            label: label,
            type: type,
            operation: operation,
            key: key,
            data: [{
              x: value[0],
              y: value[1]
            }]
          }];
        }
      }
      else{

        if(indexType !== -1){

          return prev.map((item, index) =>
            index === indexType
              ? { ...item, data: item.data.filter(val => val.x !== value[0]) }
              : item
          );
        } 
      }
      return prev;
    })
  }

  const handleClickSort = (data) => {
    const { label, type, operation, key, value } = data;
    setFilterValues(prev => {
      var indexType = prev.findIndex(item => item.label === label);
      if(indexType !== -1){
        return prev.map((item, index) =>
          index === indexType
            ? { ...item, 
                key: key, 
                data: [{x: value[0], y: value[1]}] 
              }
            : item
        );
      }
      else{
        return [...prev, { 
          label: label,
          type: type,
          operation: operation,
          key: key,
          data: [{
            x: value[0],
            y: value[1]
          }]
        }];
      }
    })
  }
  const handleRemove = (label) => {
    setFilterValues(prev => {
      return prev.filter(item => item.label !== label);
    })
  }

  const handleRemoveAll = () => {
    setFilterValues([]);
  }

  const isFilterChecked = (label, value) => {
    const filterType = filterValues.find(item => item.label === label);
    if(!filterType)
      return false;
    return filterType.data.findIndex(item => item.x === value) !== -1;
  };

  const generateURL = (filters) => {
    let filterParams = [];
    let sortParams = "";

    filters.forEach((filter) => {
      const { type, key, operation, data } = filter;


      if (type === "filter" && key === "price") {
        let minPrice = null;
        let maxPrice = null;

        data.forEach((item) => {
            const [min, max] = item.y.split("-").map(Number);
            if (minPrice === null || min < minPrice) minPrice = min;
            if (maxPrice === null || max > maxPrice) maxPrice = max;
        });

        if (minPrice !== null) filterParams.push(`${key}>${minPrice}`);
        if (maxPrice !== null) filterParams.push(`${key}<${maxPrice}`);
      } 


      else if (type === "filter") {
          const values = data.map((item) => item.y).join(",");
          filterParams.push(`${key}${operation}${values}`);
      } 

      else if (type === "sort") {
          const values = data.map((item) => item.y).join(",");
          sortParams = `${key}${operation}${values}`;
      }
    });

    const filterString = filterParams.length > 0 ? `filter=${filterParams.join(";")}` : "";
    const sortString = sortParams ? `sort=${sortParams}` : "";

    return [filterString, sortString].filter(Boolean).join("&");
  };

  useEffect(() => {
    setFilterValues([]);
  },[slug])

  useEffect(() => {
    let url = '';
    var filter = generateURL(filterValues);
    if(slug !== null){
      url = `category=${slug}`;
      url += filter !== '' ? `&${filter}` : filter;
    }
    else{
      url = filter;
    }
    setCurrentPage(1);
    navigate(`${location.pathname}?${url}`);
  },[filterValues, location.pathname, navigate, slug, setCurrentPage])

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
                  label: "Sắp xếp",
                  type: "sort",
                  operation: ':',
                  key: item.key,
                  value: [item.label, item.value]
                })}
              >{item.label}</li>
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
                  onChange={(e) => handleClick(e, {
                    label: "Lọc giá",
                    type: "filter",
                    operation: '><',
                    key: "price",
                    value: [item.label, item.value]
                  })}
                  checked={isFilterChecked("Lọc giá", item.label)} 
                  id={item.label} 
                  type="checkbox" 
                  className='mr-[10px] w-[16px] h-[16px] accent-[#080808]' 
                  />
                <label htmlFor={item.label}  className="hover:text-gray-600 cursor-pointer">{item.label}</label>
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
                  onChange={(e) => handleClick(e, {
                    label: "Màu sắc",
                    type: "filter",
                    operation: '~',
                    key: "colors",
                    value: [item.label, item.label]
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
                  onChange={(e) => handleClick(e, {
                    label: "Kích thước",
                    type: "filter",
                    operation: '~',
                    key: "sizes",
                    value: [item, item]
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
          item.data.length > 0 && (
            <div key={item.label + index} className='inline-flex mb-[15px] items-center px-[14px] py-[4px] border-[1px] border-gray-300 rounded-[15px] mr-[15px]'>
            <span className='mr-[5px]'>{item.label}:</span>
            {item.data.map((citem, cindex) => (
              (cindex !== (item.data.length - 1)) ? (
                <span key={citem.x + cindex} className='font-bold mr-[4px]'>{citem.x}, </span>
              ) : (
                <span key={citem.x + cindex} className='font-bold mr-[4px]'>{citem.x} </span>
              )
            ))}
            <CloseOutlined onClick={() => handleRemove(item.label)} className='text-[17px] ml-[8px] cursor-pointer'/>
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

