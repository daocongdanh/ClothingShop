const Button = (props) => {
  const { title, block } = props;
  return (
    <button
      className={`${block !== undefined ? 'block w-full' : 'inline-block'} my-[20px] px-[28px] py-[12px] text-[16px] font-[500] text-white rounded-[2px] tracking-widest bg-[#252a2b] transition-all duration-500 ease-in-out`}
      style={{
        backgroundImage: "linear-gradient(to right, #7e8080 50%, #252a2b 50%)",
        backgroundSize: "200% 100%",
        backgroundPosition: "right bottom",
      }}
      onMouseEnter={(e) => {
        e.target.style.backgroundPosition = "left bottom";
      }}
      onMouseLeave={(e) => {
        e.target.style.backgroundPosition = "right bottom";
      }}
    >
      {title}
    </button>
  )
}

export default Button;