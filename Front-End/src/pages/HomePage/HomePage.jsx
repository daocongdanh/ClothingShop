import { useEffect, useState } from "react";
import ButtonCategory from "../../components/ButtonCategory/ButtonCatgeory";
import Collection from "../../components/Collection/Collection";
import ProductList from "../../components/Product/ProductList";
import SlideHome from "../../components/SlideHome/SlideHome";
import Title from "../../components/Title/Title";
import { getAllCategoriesWithProduct } from "../../services/categoryService";
const HomePage = () => {
  const [categories, setCategories] = useState(null);
  useEffect(() => {
    const fetchApi = async () => {
      const categoriesRes = await getAllCategoriesWithProduct();
      setCategories(categoriesRes);
    }
    fetchApi();
  },[])
  return (
    <>
      <SlideHome />
      <div className="mb-[50px]">
        <img src="newrelease.png" alt="" className="w-full h-[150px] object-cover"/>
      </div>

      {categories && categories.data.map((item, index) => {
        return (
          item.name === "new collection" ? (
            <div key={index}>
              <ProductList data={item.products} />
              <ButtonCategory 
                title={"Street gang collection"} 
                link={`/danh-muc-san-pham?category=${item.slug}`}  
              />
              <div className="my-[20px] overflow-hidden">
                <img
                  src="cskh.png"
                  alt=""
                  className="w-full h-full object-cover transition-transform duration-1000 ease-in-out hover:scale-110"
                />
              </div>
            </div>
          ) : (
            <div key={index}>
              <Title data={{ title: `${item.name} STREET GANG`, link: `/danh-muc-san-pham?category=${item.slug}` }} />
              <ProductList data={item.products} />
              <ButtonCategory 
                title={`${item.name} Street Gang`}
                link={`/danh-muc-san-pham?category=${item.slug}`}  
                />
            </div>
          )
        );
      })}

      <Collection />
    </>
  )
}

export default HomePage;