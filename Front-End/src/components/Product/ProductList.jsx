import Product from "./Product";

const ProductList = (props) => {
  const array = [];
  const { data } = props;
  for(let i=0;i< data ; i++){
    array.push(1);
  }
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