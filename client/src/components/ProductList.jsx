import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import GuestBook from "./GuestBook";
import "./ProductList.css"

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const response = await axios.get("http://localhost:5000/products");
    setProducts(response.data);
  };

  return (
<div className="Content">
  <div className="Breadcrumb"></div>
  <h1 className="Title">Twoje produkty</h1>
  <div className="calosc">
    <div className="input-container">
        <img src="/assets/icons/light-search.svg" alt="Icon 1" className="icon-search" />
        <input type="text" placeholder="Wyszukaj produkt..." className="search-input" />
    </div>

      <Link to={'/products/add'} className="button1" >
        <img src="/assets/icons/white-plus-circle.svg" alt="Icon 1" />
        <div className="login-with-email" >Zamów nowy produkt </div>
      </Link>
      <div className="button1" >
        <img src="/assets/icons/white-plus-circle.svg" alt="Icon 1" />
        <div className="login-with-email" >Inna funkcja? </div>
      </div>
  </div>
  <div className="ProductList-container">
      {products.map((product, index) => (
        <GuestBook
          key={index}
          data={product}
          productId={product.uuid} // Przekazanie product.uuid do GuestBook
          className="GuestBook"
        />
      ))}
  </div>
</div>
  );
};

export default ProductList;
