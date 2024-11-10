import Product from "./Product";

const ProductList = (props) => {
  const { data } = props;
  return (
    <>
      <div className="flex flex-wrap">
        {data.map((item, index) => (
          <Product margin={(index + 1) % 5 !== 0} key={index} data={item} />
        ))}
      </div>
    </>
  )
}

export default ProductList;