import React, { useState, useEffect } from "react";
import { FaLocationDot } from "react-icons/fa6";
import Filter from "../components/Filter";
import Ban from "../components/images/product.png";
import { Link, useLocation,useNavigate } from "react-router-dom";
import StarRatings from "../components/ProductInfo/StarRatings.jsx";
import { useContext } from "react";
import myContext from "../components/context/MyContext.js";

const HomeProducts = () => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categoryFiltered,setCategoryFiltered] = useState([])

  const [recommendedHeading, setRecommendedHeading] = useState(false);

  const context = useContext(myContext);
  const {
    selectedCategory,
    products,
    selectedPrice,
    searchQuery,
    cart,
    setCart,
    handleAddToCart,
    snackbarOpen,
    setSnackbarOpen,
    snackbarMessage,
    setSnackbarMessage,
  } = context;
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const suggestedData = queryParams.get("suggestion");
  const category = queryParams.get("category");
  

  console.log('category',category)
    



  useEffect(() => {
    let filtered = products;

    const filteredProducts = products.filter((product) => product.category === category);
    setCategoryFiltered(filteredProducts);
    console.log('filtered',filteredProducts)

    if (category) {
      filtered = filtered.filter((product) => product.category === category);
    } else {
      if (selectedCategory !== "") {
        filtered = filtered.filter(
          (product) => product.category === selectedCategory
        );
      }

      if (selectedPrice !== "") {
        const [minPrice, maxPrice] = selectedPrice.split("-").map(Number);

        const withinRangeProducts = filtered.filter((product) => {
          const price = parseInt(product.product_price);
          return price >= minPrice && price <= maxPrice;
        });

        const aboveRangeProducts = filtered.filter((product) => {
          const price = parseInt(product.product_price);
          return price > maxPrice;
        });

        let combinedProducts = [...withinRangeProducts, ...aboveRangeProducts];

        combinedProducts.sort(
          (a, b) => parseFloat(a.product_price) - parseFloat(b.product_price)
        );

        if (filtered.length === 0 && aboveRangeProducts.length > 0) {
          setFilteredProducts(aboveRangeProducts);
          setRecommendedHeading(true);
        } else {
          setFilteredProducts(combinedProducts);
          setRecommendedHeading(false);
        }
      } else {
        setFilteredProducts(filtered);
        setRecommendedHeading(false);
      }
    }

    setSnackbarOpen(Array(filtered.length).fill(false));
  }, [category, selectedCategory, selectedPrice, products, searchQuery]);

 


  const location = useLocation();

  useEffect(() => {
    if (location.state !== "") {
      const receivedData = location.state && location.state.data;
      if (receivedData !== null) {
        setFilteredProducts(receivedData);
      }
    }
  }, [location.state]);

 

  function handdleRemoveFromCart(itemId) {
    setCart((currentCart) => currentCart.filter((item) => item.id !== itemId));
  }

useEffect(()=>{
console.log("searchQuery",searchQuery)
},[searchQuery])

  
  return (
    <>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      {/* we are coming soon */}
      <div className="container">
        <h6>
          |<FaLocationDot className="fs-3 p-1" />
          Find Near You{" "}
        </h6>
        <div className="row">
          <Filter brand="Test" />

          <div className="col-md-10">
            <div className="d-flex flex-wrap">
              {filteredProducts?.length === 0 ? (
                 categoryFiltered?.map((product, index) => (
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
                          {snackbarOpen[index] && (
                            <div
                              style={{ fontSize: "12px" }}
                              className="border text-center rounded w-75 mx-auto"
                            >
                              Added successfully &#x2713;
                            </div>
                          )}
                        </div>
                      </Link>

                      <button
                        onClick={() => handleAddToCart(product, index)}
                        className="btn btn-primary ms-3 my-3 w-50"
                      >
                        Add to cart
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                filteredProducts?.map((product, index) => (
                  <div
                    key={index}
                    className="col-6 col-sm-3 py-2 m-2"
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
                          {snackbarOpen[index] && (
                            <div
                              style={{ fontSize: "12px" }}
                              className="border text-center rounded w-75 mx-auto"
                            >
                              Added successfully &#x2713;
                            </div>
                          )}
                        </div>
                      </Link>

                      <button
                        onClick={() => handleAddToCart(product, index)}
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
