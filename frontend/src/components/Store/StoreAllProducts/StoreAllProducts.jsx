import React, { useContext, useEffect, useState } from "react";
import "./storeAllProducts.css";
import DeadOfWinter from "../../../images/dowln.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faPen,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { useHistory, useLocation } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import axios from "axios";
import { formatNumber } from "../../longFunctions";
import { useToast } from "@chakra-ui/react";

const Storepage = () => {
  const history = useHistory();
  const location = useLocation();
  const { BACKEND_URL, config } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [stockType, setStockType] = useState(
    useHistory().location.pathname.split("/")[3]
  );

  const pageIndex = Math.floor(useHistory().location.search.split("=")[1]);
  const [currentPage, setCurrentPage] = useState(pageIndex);
  const [productPerPage, setProductPerPage] = useState(3);
  const numOfPages = Math.ceil(products.length / productPerPage);
  const productIndexStart = (currentPage - 1) * productPerPage;
  const productIndexEnd = productIndexStart + productPerPage - 1;
  const handleChangeProductPerPage = (e) => {
    setProductPerPage(Math.floor(e.target.value));
  };

  const toast = useToast();

  const handleChangeStockType = (e) => {
    setStockType(e.currentTarget.id);
    history.push(`/store/product/${e.currentTarget.id}?pages=${currentPage}`);
  };
  const handleClickNext = () => {
    setCurrentPage((prev) => (prev === numOfPages ? prev : prev + 1));
  };

  const handleClickPrev = () => {
    setCurrentPage((prev) => (prev === 1 ? prev : prev - 1));
  };
  useEffect(() => {
    history.push(`/store/product/${stockType}?pages=${currentPage}`);
  }, [currentPage]);

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(
        `${BACKEND_URL}/api/store/products`,
        config
      );
      setProducts(data.data);
    } catch (error) {
      toast({
        title: "An error occurred fetching products",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="storeAllProducts">
      <div className="storeAllProductsContainer">
        <div className="storeProductsFilter">
          <ul>
            <li
              className={stockType === "all" ? "all active" : "all"}
              id="all"
              onClick={handleChangeStockType}
            >
              All
            </li>
            <li
              className={stockType === "active" ? "inStock active" : "inStock"}
              id="active"
              onClick={handleChangeStockType}
            >
              In stock
            </li>
            <li
              className={
                stockType === "soldout" ? "outOfStock active" : "outOfStock"
              }
              id="soldout"
              onClick={handleChangeStockType}
            >
              Out of stock
            </li>
          </ul>
        </div>
        <div className="storeProducts">
          <table>
            <thead>
              <tr>
                <th style={{ flex: "2" }}>Product name</th>
                <th>Product category</th>
                <th>Product price</th>
                <th>In stock</th>
                <th>Sales</th>
                <th>Operation</th>
              </tr>
            </thead>
            <tbody>
              {products
                .slice(productIndexStart, productIndexEnd + 1)
                .map((product, i) => (
                  <tr key={i}>
                    <th
                      style={{
                        display: "flex",
                        flex: "2",
                        gap: "15px",
                        alignItems: "flex-start",
                      }}
                    >
                      <img
                        src={product.images[0]}
                        alt=""
                        className="productImage"
                      />
                      <span
                        className="productName"
                        onClick={() =>
                          history.push(`/store/product/${product.id}`)
                        }
                      >
                        {product.name}
                      </span>
                    </th>
                    <th>{product.category}</th>
                    <th>
                      <span className="price-symbol">₫</span>
                      {formatNumber(product.price)}
                    </th>
                    <th>{product.quantity}</th>
                    <th>2</th>
                    <th className="productButtons">
                      <FontAwesomeIcon
                        icon={faPen}
                        onClick={() =>
                          history.push(`/store/product/update/${product.id}`)
                        }
                      />
                      <FontAwesomeIcon icon={faTrash} />
                    </th>
                  </tr>
                ))}

              <tr>
                <td className="productNav">
                  <div className="productNavBtn">
                    <div className="prevBtn" onClick={handleClickPrev}>
                      <FontAwesomeIcon icon={faChevronLeft} />
                    </div>
                    <span>{`${currentPage}/${numOfPages}`}</span>
                    <div className="nextBtn" onClick={handleClickNext}>
                      <FontAwesomeIcon icon={faChevronRight} />
                    </div>
                  </div>
                  <div className="productPerPage">
                    <div className="productPerPageContainer">
                      <input
                        type="number"
                        value={productPerPage}
                        onChange={handleChangeProductPerPage}
                      />
                      <span>{`/page`}</span>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Storepage;
