import React, { useState, useEffect } from "react";
import { FaLocationDot } from "react-icons/fa6";
import Filter from "../components/Filter";
import Ban from "../components/images/product.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import StarRatings from "../components/ProductInfo/StarRatings.jsx";
import { useContext } from "react";
import myContext from "../components/context/MyContext.js";
import { addToCart } from "../components/redux/Slices/CartSlice.js";
import { useDispatch, useSelector } from "react-redux";
import cartIcon from "../assets/cart-icon.svg";

import {
  showSnackbar,
  hideSnackbar,
} from "../components/redux/Slices/CartSlice.js";

const Category = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();

  const [filteredProducts, setFilteredProducts] = useState([]);

  const [recommendedHeading, setRecommendedHeading] = useState(false);

  const context = useContext(myContext);
  const {
    selectedCategory,
    setSelectedCategory,
    accessoriesCategory,
    setAccessoriesCategory,
    products,
    selectedPrice,
    setSearchQuery,
    offer,
    isNewProduct
  } = context;

  const dispatch = useDispatch();
  const handleAddToCart = (product, index) => {
    dispatch(addToCart(product));
    dispatch(showSnackbar({ message: "Product added successfully!", index }));

    // Wait for 1 second, then hide snackbar
    setTimeout(() => {
      dispatch(hideSnackbar());
    }, 1000);
  };
  const cart = useSelector((state) => state.cart);

  if (accessoriesCategory !== "") {
    const url = `/accessories?selectedCategory=${encodeURIComponent(
      accessoriesCategory
    )}`;
    navigate(url);
  }

  useEffect(() => {
    if (selectedCategory !== "") {
      const url = `/category?selectedCategory=${encodeURIComponent(
        selectedCategory
      )}`;
      navigate(url);
    }
  }, [selectedCategory, navigate]);

  useEffect(() => {
    setSearchQuery("");
    setAccessoriesCategory("");
    let productsToFilter = products;
    if (selectedCategory !== "" && selectedCategory !== "AllCategory") {
      console.log("CATEGORY", selectedCategory);
      setSelectedCategory(selectedCategory);

      const lowerCaseSelectedCategory = selectedCategory.toLowerCase();

      const filteredByCategory = products.filter((product) => {
        const lowerCaseProductCategory = product.category.toLowerCase();
        return lowerCaseProductCategory === lowerCaseSelectedCategory;
      });

      if (filteredByCategory.length > 0) {
        productsToFilter = filteredByCategory;
        let filtered = [...productsToFilter]; // Copy the accessories products array

        if (selectedPrice !== "" && selectedPrice !== "500 +") {
          const [minPrice, maxPrice] = selectedPrice.split("-").map(Number);

          const withinRangeProducts = filtered.filter((product) => {
            const price = parseInt(product.product_price);
            return price >= minPrice && price <= maxPrice;
          });

          const aboveRangeProducts = filtered.filter((product) => {
            const price = parseInt(product.product_price);
            return price > maxPrice;
          });

          let combinedProducts = [
            ...withinRangeProducts,
            ...aboveRangeProducts,
          ];

          combinedProducts.sort(
            (a, b) => parseFloat(a.product_price) - parseFloat(b.product_price)
          );

          const remainingProducts = productsToFilter.filter((product) => {
            if (selectedPrice !== "") {
              const [minPrice] = selectedPrice.split("-").map(Number);
              const price = parseInt(product.product_price);
              return price < minPrice;
            } else {
              return true; // Include all products if no price range is selected
            }
          });

          remainingProducts.sort(
            (a, b) => parseFloat(a.product_price) - parseFloat(b.product_price)
          );

          filtered = [...combinedProducts, ...remainingProducts];
        }

        if (selectedPrice === "500 +") {
          console.log("Before", filtered);
          console.log("above 500");
          const above500Products = filtered.filter((product) => {
            const price = parseInt(product.product_price);
            return price >= 500;
          });

          above500Products.sort(
            (a, b) => parseFloat(b.product_price) - parseFloat(a.product_price)
          );

          const remainingProducts = productsToFilter.filter((product) => {
            if (selectedPrice !== "") {
              let minPrice = 500;
              const price = parseInt(product.product_price);
              return price < minPrice;
            } else {
              return true; // Include all products if no price range is selected
            }
          });

          remainingProducts.sort(
            (a, b) => parseFloat(a.product_price) - parseFloat(b.product_price)
          );

          filtered = [...above500Products, ...remainingProducts];
        }

        if (offer !== "") {
          const selectedOffer = parseInt(offer);

          const filteredByOffer = filtered.filter((product) => {
            // Assuming 'product_offer' is the property containing offer percentage
            const offerPercentage = parseInt(product.offers);
            return offerPercentage >= selectedOffer;
          });

          filteredByOffer.sort(
            (a, b) => parseFloat(a.offers) - parseFloat(b.offers)
          );

          filtered = filteredByOffer;
        }

        if (filtered.length === 0) {
          filtered = [...productsToFilter];
          filtered.sort(
            (a, b) => parseFloat(a.product_price) - parseFloat(b.product_price)
          );
        }

        setFilteredProducts(filtered);
      } else {
        productsToFilter = products;
        let filtered = [...productsToFilter];
        if (selectedPrice !== "" && selectedPrice !== "500 +") {
          const [minPrice, maxPrice] = selectedPrice.split("-").map(Number);

          const withinRangeProducts = filtered.filter((product) => {
            const price = parseInt(product.product_price);
            return price >= minPrice && price <= maxPrice;
          });

          const aboveRangeProducts = filtered.filter((product) => {
            const price = parseInt(product.product_price);
            return price > maxPrice;
          });

          let combinedProducts = [
            ...withinRangeProducts,
            ...aboveRangeProducts,
          ];

          combinedProducts.sort(
            (a, b) => parseFloat(a.product_price) - parseFloat(b.product_price)
          );

          const remainingProducts = productsToFilter.filter((product) => {
            if (selectedPrice !== "") {
              const [minPrice] = selectedPrice.split("-").map(Number);
              const price = parseInt(product.product_price);
              return price < minPrice;
            } else {
              return true; // Include all products if no price range is selected
            }
          });

          remainingProducts.sort(
            (a, b) => parseFloat(a.product_price) - parseFloat(b.product_price)
          );

          filtered = [...combinedProducts, ...remainingProducts];
        }

        if (selectedPrice === "500 +") {
          console.log("above 500");
          const above500Products = filtered.filter((product) => {
            const price = parseInt(product.product_price);
            return price >= 500;
          });

          above500Products.sort(
            (a, b) => parseFloat(b.product_price) - parseFloat(a.product_price)
          );

          const remainingProducts = productsToFilter.filter((product) => {
            if (selectedPrice !== "") {
              let minPrice = 500;
              const price = parseInt(product.product_price);
              return price < minPrice;
            } else {
              return true; // Include all products if no price range is selected
            }
          });

          remainingProducts.sort(
            (a, b) => parseFloat(a.product_price) - parseFloat(b.product_price)
          );
          filtered = [...above500Products, ...remainingProducts];
        }

        if (offer !== "") {
          const selectedOffer = parseInt(offer);

          const filteredByOffer = filtered.filter((product) => {
            // Assuming 'product_offer' is the property containing offer percentage
            const offerPercentage = parseInt(product.offers);
            return offerPercentage >= selectedOffer;
          });

          filteredByOffer.sort(
            (a, b) => parseFloat(a.offers) - parseFloat(b.offers)
          );

          filtered = filteredByOffer;
        }

        // If no products match the filters, set filtered products to all accessories of the selected category
        if (filtered.length === 0) {
          filtered = [...productsToFilter];
          console.log("length :", filtered);
          filtered.sort(
            (a, b) => parseFloat(a.product_price) - parseFloat(b.product_price)
          );
        }

        setFilteredProducts(filtered);
      }
    } else {
      console.log("ELSE CATEGORY:", selectedCategory);
      productsToFilter = products;

      if (selectedPrice !== "" && selectedPrice !== "500 +") {
        const [minPrice, maxPrice] = selectedPrice.split("-").map(Number);

        const withinRangeProducts = productsToFilter.filter((product) => {
          const price = parseInt(product.product_price);
          return price >= minPrice && price <= maxPrice;
        });

        const aboveRangeProducts = productsToFilter.filter((product) => {
          const price = parseInt(product.product_price);
          return price > maxPrice;
        });

        let combinedProducts = [...withinRangeProducts, ...aboveRangeProducts];

        combinedProducts.sort(
          (a, b) => parseFloat(a.product_price) - parseFloat(b.product_price)
        );

        const remainingProducts = productsToFilter.filter((product) => {
          if (selectedPrice !== "") {
            const [minPrice] = selectedPrice.split("-").map(Number);
            const price = parseInt(product.product_price);
            return price < minPrice;
          } else {
            return true; // Include all products if no price range is selected
          }
        });

        remainingProducts.sort(
          (a, b) => parseFloat(a.product_price) - parseFloat(b.product_price)
        );

        productsToFilter = [...combinedProducts, ...remainingProducts];
      }

      if (selectedPrice === "500 +") {
        console.log("above 500");
        const above500Products = productsToFilter.filter((product) => {
          const price = parseInt(product.product_price);
          return price >= 500;
        });

        above500Products.sort(
          (a, b) => parseFloat(b.product_price) - parseFloat(a.product_price)
        );

        const remainingProducts = productsToFilter.filter((product) => {
          if (selectedPrice !== "") {
            let minPrice = 500;
            console.log("ELSE MIN", minPrice);
            const price = parseInt(product.product_price);
            return price < minPrice;
          } else {
            return true; // Include all products if no price range is selected
          }
        });
        console.log("ELSE REMAINING PROD", remainingProducts);

        remainingProducts.sort(
          (a, b) => parseFloat(a.product_price) - parseFloat(b.product_price)
        );

        productsToFilter = [...above500Products, ...remainingProducts];
      }
      if (offer !== "") {
        const selectedOffer = parseInt(offer);

        const filteredByOffer = productsToFilter.filter((product) => {
          // Assuming 'product_offer' is the property containing offer percentage
          const offerPercentage = parseInt(product.offers);
          return offerPercentage >= selectedOffer;
        });

        filteredByOffer.sort(
          (a, b) => parseFloat(a.offers) - parseFloat(b.offers)
        );

        if (filteredByOffer.length === 0) {
          console.log("LENGTH 0", productsToFilter);
          productsToFilter = productsToFilter;
        } else {
          productsToFilter = filteredByOffer;
        }
      }
      setFilteredProducts(productsToFilter);
    }
  }, [selectedCategory, selectedPrice, products, offer]);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
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
            <div className="row">
              {filteredProducts?.map((product, index) => (
                <div key={index} className="col-6 col-sm-3 py-2">
                  <div className="product-card">
                    <div
                      className="product-image"
                      style={{ position: "relative" }}
                    >
                      <img
                        src={product.product_image1}
                        style={{ width: "100%" }}
                        alt="Product 1"
                      />
                      <span
                        style={{
                          position: "absolute",
                          top: "5px",
                          right: "5px",
                          background: "yellow",
                          padding: "5px",
                          fontSize: "10px",
                        }}
                      >
                        Real Image
                      </span>
                      <div
                        className={`offer-tag bg-warning rounded-pill text-center p-1 text-light ${
                          product.offers === "0" && "invisible"
                        }`}
                      >
                        {product.offers}% Off
                      </div>
                    </div>

                    <div className="product-content d-flex flex-column gap-1 pt-3  px-1">
                        <div style={{ fontSize: "14px" }}>
                          {product.category}
                          {isNewProduct(product.date) && <span className="ms-4" style={{color:'#ffc107'}}>New</span>}
                        </div>
                        <a
                          href={`/${product.product_id}`}
                          target="_blank"
                          style={{
                            textDecoration: "none",
                            color: "black",
                          }}
                        >
                          {windowWidth <= 1024
                            ? product.product_name.length > 15
                              ? product.product_name.substring(0, 15) + "..."
                              : product.product_name
                            : product.product_name.length > 20
                            ? product.product_name.substring(0, 25) + "..."
                            : product.product_name}

                           
                        </a>
                        <h5 className="mt-1">
                          <sup>&#x20B9;</sup>
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

                        <div className="d-flex justify-content-between ">
                          <h6>
                            Size: <span>{product.product_size}</span>
                          </h6>
                          <h6 className="">
                            Color: <span>{product.product_color1}</span>
                          </h6>
                        </div>
                      
                          <div className="" >
                            {product.product_discription.length > 40
                              ? product.product_discription.slice(0, 40) + "..."
                              : product.product_discription}
                          </div>
                        
                        <div className="product-rating text-warning d-flex ">
                          Rating:{" "}
                          <StarRatings rating={product.product_ratings} />
                        </div>
                        <div className="product-distance text-secondary ">
                          Distance: {product.distance}km away.
                        </div>
                        {cart.snackbar.open &&
                          cart.snackbar.index === index && (
                            <div
                              style={{ fontSize: "12px" }}
                              className="border text-center rounded w-75 mx-auto"
                            >
                              {cart.snackbar.message}
                            </div>
                          )}
                      </div>

                    {/* Buttons */}
                    <div className="d-flex justify-content-center align-items-center gap-2">
                      <button
                        className="btn btn-primary  ms-2"
                        onClick={() => handleAddToCart(product, index)}
                      >
                        <img
                          className="img-fluid"
                          src={cartIcon}
                          style={{ height: "20px" }}
                        />
                      </button>
                      <button className="btn btn-primary my-2  ms-2 px-2 py-1">
                        <Link
                          to="/checkout"
                          style={{ textDecoration: "none", color: "#000" }}
                        >
                          Buy Now
                        </Link>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Category;
