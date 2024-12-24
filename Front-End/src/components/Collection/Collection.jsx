const Collection = () => {
  return (
    <>
      <div className="py-[50px]">
        <div className="flex items-center justify-between">
          <div>
            <img 
              src="collection1.png" 
              alt="Hình Ảnh" 
              className="w-[90%] h-full object-cover"/>
            <h3 className="font-[500] mt-[15px]">Graffiti Basic</h3>
          </div>
          <div>
            <img 
              src="collection2.png" 
              alt="Hình Ảnh" 
              className="w-[90%] h-full object-cover"/>
            <h3 className="font-[500] mt-[15px]">Graffiti Hard</h3>
          </div>
          <div>
            <img 
              src="collection3.png" 
              alt="Hình Ảnh" 
              className="w-[90%] h-full object-cover"/>
            <h3 className="font-[500] mt-[15px]">Graffiti Basic</h3>
          </div>
        </div>
      </div>
    </>
  )
}

export default Collection;