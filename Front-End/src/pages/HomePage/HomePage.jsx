import ButtonCategory from "../../components/ButtonCategory/ButtonCatgeory";
import Collection from "../../components/Collection/Collection";
import ProductList from "../../components/Product/ProductList";
import SlideHome from "../../components/SlideHome/SlideHome";
import Title from "../../components/Title/Title";

const HomePage = () => {
  return (
    <>
      <SlideHome />
      <div className="mb-[50px]">
        <img src="newrelease.png" alt="" className="w-full h-[150px] object-cover"/>
      </div>

      <div className="">
        <ProductList />
        <ButtonCategory title = {"Street gang collection"}/>
      </div>
      <div className="my-[20px] overflow-hidden">
        <img src="cskh.png" alt="" className="w-full h-full object-cover transition-transform duration-1000 ease-in-out hover:scale-110" />
      </div>

      <div className="">
        <Title data={{title: "JACKET STREET GANG", link: "/"}}/>
        <ProductList />
        <ButtonCategory title = {"Jacket Street Gang"}/>
      </div>
      <Collection />
    </>
  )
}

export default HomePage;