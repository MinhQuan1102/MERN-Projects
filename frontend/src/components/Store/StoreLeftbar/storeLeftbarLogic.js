export const handleChooseOption = (option, setOption, history) => {
  switch (option) {
    case "All Orders":
      history.push("/store/order/all");
      setOption("All Orders");
      break;
    case "Canceled Orders":
      history.push("/store/order/all");
      setOption("Canceled Orders");
      break;
    case "All Products":
      history.push("/store/product/all");
      setOption("All Products");
      break;
    case "Add a Product":
      history.push("/store/product/new");
      setOption("Add a Product");
      break;
  }
};
