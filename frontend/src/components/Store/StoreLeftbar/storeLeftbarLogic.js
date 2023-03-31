export const handleChooseOption = (option, setOption, history) => {
  switch (option) {
    case "All Orders":
      history.push("/store/order/all");
      setOption("All Orders");
      break;
    case "Canceled Orders":
      history.push("/store/order/canceled");
      setOption("Canceled Orders");
      break;
    case "All Products":
      history.push("/store/product/all?pages=1");
      setOption("All Products");
      break;
    case "Add a Product":
      history.push("/store/product/new");
      setOption("Add a Product");
      break;
  }
};

export const handleNavigateOption = (location) => {
  if (location.startsWith("/store/order/all")) {
    return "All Orders";
  } else if (location.startsWith("/store/order/canceled")) {
    return "Canceled Orders";
  } else if (
    location.startsWith("/store/product/all") ||
    location.startsWith("/store/product/active") ||
    location.startsWith("/store/product/soldout")
  ) {
    return "All Products";
  } else if (location.startsWith("/store/product/new")) {
    return "Add a Product";
  } else {
    return "";
  }
};
