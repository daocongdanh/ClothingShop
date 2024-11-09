import { useEffect, useState } from "react";
import Banner from "../../components/Banner/Banner";
// import ButtonCategory from "../../components/ButtonCategory/ButtonCatgeory";
import FilterProduct from "../../components/FilterProduct/FilterProduct";
// import ProductList from "../../components/Product/ProductList";
import { useLocation, useSearchParams } from 'react-router-dom';
import { getCategoryBySlug } from "../../services/categoryService";
import { filterProduct } from "../../services/productService";
import ProductList from "../../components/Product/ProductList";

const CategoryPage = () => {
  const [searchParams] = useSearchParams();
  const slug = searchParams.get('category');
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState(null);
  const location = useLocation();
  useEffect(() => {
    const fetchApi = async () => {
      const categoryRes = await getCategoryBySlug(slug);
      const productsres = await filterProduct(location.search.slice(1));
      setCategory(categoryRes);
      setProducts(productsres);
    }
    fetchApi();
    
  },[slug, location.search])
  
  return (
    <>
      <Banner image={"/banner.jpg"}/>
      <FilterProduct 
        title = {(category !== null && category.data.length > 0) ? category.data[0].name : "Tất cả sản phẩm"} 
        slug = {slug}
      />
      {products && (
        <ProductList data={products.data} />
      )}
      
      {/* <ButtonCategory title={"Street gang"}/> */}
    </>
  )
}

export default CategoryPage;