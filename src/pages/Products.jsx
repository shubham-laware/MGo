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
  hideSnackbar, addItemToWishlist,hideSnackbarForWishlist, showSnackbarForWishlist
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
    console.log("index", index);

    // Wait for 1 second, then hide snackbar
    setTimeout(() => {
      dispatch(hideSnackbar());
    }, 1000);
  };

  const handleWishListToCart =(product,index)=>{
    console.log("wishlist call",product)
    dispatch(addItemToWishlist(product));
    dispatch(showSnackbarForWishlist({ message: 'Item added to wishlist!',index }));
    setTimeout(() => {
      dispatch(hideSnackbarForWishlist());
    }, 1000); // Hide after 3 seconds
  }




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

    if (selectedPrice !== "") {
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

      productsToFilter = combinedProducts;
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
        console.log("EMPTY SEARCH", productsToFilter);

        if (selectedPrice !== "") {
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

          productsToFilter = combinedProducts;
        }

        setFilteredProducts(productsToFilter);
      }
    } else {
      setFilteredProducts(productsToFilter);
    }

  }, [products, searchQuery, selectedPrice]);




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
                      <button className="btn btn-primary w-25 my-2" onClick={() => handleWishListToCart(product, index)}>❤</button>
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
