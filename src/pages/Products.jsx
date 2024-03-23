import React, { useState, useEffect } from "react";
import { FaLocationDot } from "react-icons/fa6";
import Filter from "../components/Filter";
import Ban from "../components/images/product.png";
import { Link, useNavigate } from "react-router-dom";
import StarRatings from "../components/ProductInfo/StarRatings.jsx";
import { useLocation } from "react-router-dom";

import { useContext } from "react";
import myContext from "../components/context/MyContext.js";

const HomeProducts = () => {
  const [filteredProducts, setFilteredProducts] = useState([]);

  const context = useContext(myContext);
  const {
    selectedCategory,
    products,
    selectedPrice,
    searchQuery,
    cart,
    setCart,
  } = context;
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const suggestedData = queryParams.get("suggestion");

  //   const navigate = useNavigate();

  useEffect(() => {
    let filtered = products;

    // Apply category filter
    if (selectedCategory !== "") {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    // Apply price range filter
    if (selectedPrice !== "") {
      const [minPrice, maxPrice] = selectedPrice.split("-").map(Number);
      filtered = filtered.filter((product) => {
        const price = parseInt(product.product_price);
        return price >= minPrice && price <= maxPrice;
      });
    }

    // Update filtered products
    setFilteredProducts(filtered);
    console.log("----filtered", filtered);
  }, [selectedCategory, selectedPrice, products, searchQuery]);

  // Access location object using useLocation
  const location = useLocation();

  useEffect(() => {
    if (location.state !== "") {
      const receivedData = location.state && location.state.data;
      if (receivedData !== null) {
        setFilteredProducts(receivedData);
      }
    }
  }, [location.state]);

  function handleAddToCart(prod) {
    setCart((cart_items) => [...cart_items, prod]);

    console.log(cart);

    // navigate("/cart");
  }

  function handdleRemoveFromCart(itemId) {
    setCart((currentCart) => currentCart.filter((item) => item.id !== itemId));
  }

  return (
    <>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      {/* we are coming soon */}
      <div className="container">
        <h6>
          |<FaLocationDot className="fs-3 p-1" />
          Find Near You{" "}
        </h6>
        <div className="row">
          <Filter brand="Test" />

          <div className="col-md-10 ">
            <div className="d-flex gap-2 flex-wrap ">
              {filteredProducts?.length === 0 ? (
                <div className="col-md-12 text-center fw-bold">
                  <p className="fs-1">We are coming soon.</p>
                </div>
              ) : (
                filteredProducts?.map((product, index) => (
                  <div
                    key={index}
                    className="col-6 col-sm-3 py-2"
                    style={{ width: "220px" }}
                  >
                    <div className="product-card">
                      <Link
                        to={`/${product.product_id}`}
                        style={{
                          textDecoration: "none",
                          color: "black",
                        }}
                      >
                        <div
                          className="product-image"
                          style={{ height: "250px" }}
                        >
                          <img
                            src={product.product_image1}
                            alt="Product 1"
                            className="h-100 img-fluid"
                          />
                        </div>
                        <div className="offer-tag bg-warning rounded-pill text-center p-1 text-light">
                          {product.offers}% Off
                        </div>
                        <div className="product-content">
                          <h6>{product.product_name} </h6>
                          <h5>
                            Price: <sup>&#x20B9;</sup>
                            {product.product_price}
                            <span className="text-decoration-line-through text-muted fs-6 fw-light">
                              599
                            </span>
                            <span
                              className="text-muted"
                              style={{
                                fontSize: "13px",
                              }}
                            >
                              {" "}
                              {product.product_stock}
                            </span>
                          </h5>
                          <div className="product-rating text-warning">
                            Rating:{" "}
                            <StarRatings rating={product.product_ratings} />
                          </div>
                          <p className="product-distance text-secondary ">
                            Distance: {product.distance}km away.
                          </p>
                        </div>
                      </Link>
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="btn btn-primary ms-3 my-3 w-50"
                      >
                        Add to cart
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeProducts;
