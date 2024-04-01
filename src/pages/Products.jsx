import React, { useState, useEffect } from "react";
import { FaLocationDot } from "react-icons/fa6";
import Filter from "../components/Filter";
import Ban from "../components/images/product.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import StarRatings from "../components/ProductInfo/StarRatings.jsx";
import { useContext } from "react";
import myContext from "../components/context/MyContext.js";
import {
  addToCart,
  showSnackbar,
  hideSnackbar,
  addItemToWishlist,
  hideSnackbarForWishlist,
  showSnackbarForWishlist,
} from "../components/redux/Slices/CartSlice.js";
import { useDispatch, useSelector } from "react-redux";

const HomeProducts = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categoryFiltered, setCategoryFiltered] = useState([]);

  const navigate = useNavigate();

  const [recommendedHeading, setRecommendedHeading] = useState(false);

  const context = useContext(myContext);
  const {
    selectedCategory,
    setSelectedCategory,
    accessoriesCategory,
    setAccessoriesCategory,
    products,
    selectedPrice,
    searchQuery,
    offer,
  } = context;
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const suggestedData = queryParams.get("suggestion");
  const category = queryParams.get("category");

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const handleAddToCart = (product, index) => {
    dispatch(addToCart(product));
    dispatch(showSnackbar({ message: "Product added successfully!", index }));

    // Wait for 1 second, then hide snackbar
    setTimeout(() => {
      dispatch(hideSnackbar());
    }, 1000);
  };

  // for wishlist button
  const [wishlistClicked, setWishlistClicked] = useState(
    Array(products.length).fill(false)
  );
  const handleWishListToCart = (product, index) => {
    const newWishlistClicked = [...wishlistClicked];
    newWishlistClicked[index] = !newWishlistClicked[index];
    setWishlistClicked(newWishlistClicked);

    dispatch(addItemToWishlist(product));
    dispatch(
      showSnackbarForWishlist({ message: "Item added to wishlist!", index })
    );
    setTimeout(() => {
      dispatch(hideSnackbarForWishlist());
    }, 1000); // Hide after 3 seconds
  };

  if (selectedCategory !== "") {
    const url = `/category?selectedCategory=${encodeURIComponent(
      selectedCategory
    )}`;
    navigate(url);
  }

  if (accessoriesCategory !== "") {
    const url = `/accessories?selectedCategory=${encodeURIComponent(
      accessoriesCategory
    )}`;
    navigate(url);
  }

  useEffect(() => {
    setAccessoriesCategory("");
    setSelectedCategory("");
    // Apply price filtering
    let productsToFilter = products;

    if (selectedPrice !== "" && selectedPrice !== "500 +") {
      console.log("SELCTED", selectedPrice);
      console.log("below 500");
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
          let minPrice=500
            console.log("ELSE MIN",minPrice)
            const price = parseInt(product.product_price);
            return price < minPrice;
        } else {
            return true; // Include all products if no price range is selected
        }
    });
    console.log("ELSE REMAINING PROD",remainingProducts)
    
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

      productsToFilter = filteredByOffer;
    }

    // Apply category and search query filtering
    const menRegex = /^(men|man|mens|men's)/;
    const lowerCaseSearchQuery = searchQuery.toLowerCase();

    if (menRegex.test(lowerCaseSearchQuery)) {
      const filtered = productsToFilter.filter(
        (product) =>
          product.category.toLowerCase().startsWith("men") ||
          product.product_name.toLowerCase().startsWith("men")
      );
      setFilteredProducts(filtered);
    } else if (lowerCaseSearchQuery.trim() !== "") {
      const filtered = productsToFilter.filter(
        (product) =>
          product.category.toLowerCase().includes(lowerCaseSearchQuery) ||
          product.product_tittle.toLowerCase().includes(lowerCaseSearchQuery) ||
          product.product_name.toLowerCase().includes(lowerCaseSearchQuery)
      );

      if (filtered.length > 0) {
        setFilteredProducts(filtered);
      } else {
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

          productsToFilter = [...combinedProducts, ...remainingProducts];
        }

        if (selectedPrice === "500 +") {
          const above500Products = productsToFilter.filter((product) => {
            const price = parseInt(product.product_price);
            return price >= 500;
          });

          above500Products.sort(
            (a, b) => parseFloat(b.product_price) - parseFloat(a.product_price)
          );

          const remainingProducts = productsToFilter.filter((product) => {
            if (selectedPrice !== "") {
              let minPrice=500
                console.log("ELSE MIN",minPrice)
                const price = parseInt(product.product_price);
                return price < minPrice;
            } else {
                return true; // Include all products if no price range is selected
            }
        });
        console.log("ELSE REMAINING PROD",remainingProducts)
        
        remainingProducts.sort(
            (a, b) => parseFloat(a.product_price) - parseFloat(b.product_price)
        );

          productsToFilter = [...above500Products,...rem];
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

          productsToFilter = filteredByOffer;
        }

        setFilteredProducts(productsToFilter);
      }
    } else {
      setFilteredProducts(productsToFilter);
    }
  }, [products, searchQuery, selectedPrice, offer]);

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
            <div className="d-flex flex-wrap px-5 px-sm-0">
              {filteredProducts?.map((product, index) => (
                <div
                  key={index}
                  className="col-6 col-sm-3 py-2 m-2"
                  style={{ width: "220px" }}
                >
                  <div className="product-card">
                    <a
                      href={`/${product.product_id}`}
                      target="_blank"
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
                    </a>

                    <div className="d-flex justify-content-center align-items-center ">
                      <button
                        className={`btn ${
                          wishlistClicked[index] ? "btn-success" : "btn-primary"
                        } w-25 my-2`}
                        onClick={() => handleWishListToCart(product, index)}
                      >
                        ❤
                      </button>
                      <button
                        onClick={() => handleAddToCart(product, index)}
                        className="btn btn-primary my-2 w-50 ms-2"
                      >
                        Add to cart
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

export default HomeProducts;
