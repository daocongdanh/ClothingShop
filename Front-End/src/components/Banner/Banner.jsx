const Banner = (props) => {
  const { image } = props;
  return (
    <>
      <div className="my-[20px]">
        <img 
          src={image} 
          alt="image1" 
          className="w-full h-[260px] object-cover" />
      </div>
    </>
  )
}

export default Banner;