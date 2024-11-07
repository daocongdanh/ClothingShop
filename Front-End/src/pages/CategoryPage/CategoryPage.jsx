import Banner from "../../components/Banner/Banner";
import ButtonCategory from "../../components/ButtonCategory/ButtonCatgeory";
import FilterProduct from "../../components/FilterProduct/FilterProduct";
import ProductList from "../../components/Product/ProductList";

const CategoryPage = () => {
  return (
    <>
      <Banner image={"banner.jpg"}/>
      <FilterProduct title={"Tất cả sản phẩm"} />
      {/* <ProductList data={20} />
      <ButtonCategory title={"Street gang"}/> */}
    </>
  )
}

export default CategoryPage;