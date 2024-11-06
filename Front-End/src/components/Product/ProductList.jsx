import Product from "./Product";

const ProductList = (props) => {
  const array = [1, 2, 3, 4, 5, 6, 7];
  // const { data } = props;
  return (
    <>
      <div className="flex flex-wrap">
        {array.map((item, index) => (
          <Product margin={(index + 1) % 5 !== 0} key={index} />
        ))}
      </div>
    </>
  )
}

export default ProductList;