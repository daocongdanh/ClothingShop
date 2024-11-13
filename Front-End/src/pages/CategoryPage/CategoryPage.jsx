import { useEffect, useState } from "react";
import Banner from "../../components/Banner/Banner";
import FilterProduct from "../../components/FilterProduct/FilterProduct";
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { getCategoryBySlug } from "../../services/categoryService";
import { filterProduct } from "../../services/productService";
import ProductList from "../../components/Product/ProductList";
import { Pagination } from 'antd';

const CategoryPage = () => {
  const [searchParams] = useSearchParams();
  const slug = searchParams.get('category');
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchApi = async () => {
      const categoryRes = await getCategoryBySlug(slug);
      const productsres = await filterProduct(location.search.slice(1));
      setCategory(categoryRes);
      setProducts(productsres);
    }
    fetchApi();
    
  },[slug, location.search, currentPage])
  
  useEffect(() => {
    setCurrentPage(1);
  },[slug])
  const handleChange = (page) => {
    setCurrentPage(page);
    const pathName = location.pathname;
    const searchParams = new URLSearchParams(location.search);

    searchParams.set('page', page);
    searchParams.set('limit', 10);

    const url = `${pathName}?${searchParams.toString()}`;
    navigate(url);
  }
  return (
    <>
      <Banner image={"/banner.jpg"}/>
      <FilterProduct 
        title = {(category !== null && category.data !== null) ? category.data.name : "Tất cả sản phẩm"} 
        slug = {slug}
        setCurrentPage = {setCurrentPage}
      />
      {(products && products.data.totalItem > 0) ? (
        <>
          <ProductList data={products.data.result} />
          <Pagination 
            align="center" 
            current={currentPage}
            defaultCurrent={1}
            total={products.data.totalItem}
            showSizeChanger={false} 
            className="mt-[20px] mb-[30px]" 
            onChange={handleChange} 
          />
        </>
      )
      :
      (<h1 className="mb-[50px] text-[24px] text-[#080808] font-[500]">Không tìm thấy kết quả. Vui lòng thử lại!</h1>)  
      }
    </>
  )
}

export default CategoryPage;