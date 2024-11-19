const colorList = [
  { label: "Tím", code: "#eb11eb" },
  { label: "Vàng", code: "#ffff05" },
  { label: "Cam", code: "#f54105" },
  { label: "Hồng", code: "#f23895" },
  { label: "Đen", code: "#000000" },
  { label: "Xám", code: "#cccaca" },
  { label: "Trắng", code: "#fafafa" },
  { label: "Xanh dương", code: "#1757eb" },
  { label: "Xanh", code: "#099116" },
  { label: "Xanh lá", code: "#52ff52" },
  { label: "Nâu", code: "#8b572a" },
  { label: "Xanh mint", code: "#91cca5" },
  { label: "Đỏ", code: "#FF0000"}
];
export const getCodeColor = (color) => {
  const colorExists = colorList.filter(item => item.label === color);
  return colorExists[0].code;
}