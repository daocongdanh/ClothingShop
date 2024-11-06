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
        <Title data={{title: "JACKET STREET GANG", link: "/"}}/>
        <ProductList />
      </div>
    </>
  )
}

export default HomePage;