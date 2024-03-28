import React, { useState, useEffect } from "react";
import { FaLocationDot } from "react-icons/fa6";
import Filter from "../components/Filter";
import Ban from "../components/images/product.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import StarRatings from "../components/ProductInfo/StarRatings.jsx";
import { useContext } from "react";
import myContext from "../components/context/MyContext.js";
import { addToCart } from "../components/redux/Slices/CartSlice.js";
import { useDispatch } from "react-redux";

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
    setselectedPrice,
    searchQuery,
    setSearchQuery,
    cart,
    setCart,
    snackbarOpen,
    setSnackbarOpen,
    snackbarMessage,
    setSnackbarMessage,
  } = context;
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const suggestedData = queryParams.get("suggestion");
  const category = queryParams.get("category");

  const dispatch = useDispatch();
  const handleAddToCart = (product) => {
    console.log("handle cart call");
    console.log("handle cart call", product);
    dispatch(addToCart(product));
  };

  console.log("SELECTED CATEGORY", selectedCategory);
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

      productsToFilter=combinedProducts

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
        console.log("EMPTY SEARCH",productsToFilter)

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

        productsToFilter=combinedProducts

    }

        setFilteredProducts(productsToFilter);
      }
    } else {
      setFilteredProducts(productsToFilter);
    }

    setSnackbarOpen(Array(productsToFilter.length).fill(false));
  }, [products, searchQuery, selectedPrice]);

  //   useEffect(()=>{

  //     let productsToFilter = products;
  //     if(accessoriesCategory!==""){
  //     let accessoriesProducts = productsToFilter.filter(
  //       (product) =>
  //           product.category.toLowerCase().includes("footwear") ||
  //           product.product_name.toLowerCase().includes("sneakers") ||
  //           product.product_name.toLowerCase().includes("jacket") ||
  //           product.product_name.toLowerCase().includes("shoes")
  //   );

  //   // Apply additional filtering based on selected accessories category
  //   if (accessoriesCategory.toLowerCase() === "mens") {
  //       setSelectedCategory("")
  //       accessoriesProducts = accessoriesProducts.filter(
  //           (product) =>
  //               product.category.toLowerCase().startsWith("men") ||
  //               product.product_name.toLowerCase().startsWith("men")
  //       );
  //   } else if (accessoriesCategory.toLowerCase() === "womens") {
  //       setSelectedCategory("")
  //       accessoriesProducts = accessoriesProducts.filter(
  //           (product) =>
  //               product.category.toLowerCase().includes("women") ||
  //               product.product_name.toLowerCase().includes("women")
  //       );
  //   } else if (accessoriesCategory.toLowerCase() === "kids") {
  //       accessoriesProducts = accessoriesProducts.filter(
  //           (product) =>
  //               product.category.toLowerCase().includes("kids") ||
  //               product.product_name.toLowerCase().includes("kids")
  //       );
  //   }else{
  //     // accessoriesProducts=products;
  //     console.log("ACCESSORIES:",accessoriesProducts)
  //   }

  //   let filtered = [...accessoriesProducts]; // Copy the accessories products array

  //   if (selectedPrice !== "") {
  //     const [minPrice, maxPrice] = selectedPrice.split("-").map(Number);

  //     const withinRangeProducts = filtered.filter((product) => {
  //       const price = parseInt(product.product_price);
  //       return price >= minPrice && price <= maxPrice;
  //     });

  //     const aboveRangeProducts = filtered.filter((product) => {
  //       const price = parseInt(product.product_price);
  //       return price > maxPrice;
  //     });

  //     let combinedProducts = [...withinRangeProducts, ...aboveRangeProducts];

  //     combinedProducts.sort(
  //       (a, b) => parseFloat(a.product_price) - parseFloat(b.product_price)
  //     );

  //     console.log("COMBINED PRODUCTS:",combinedProducts)

  //     if (products.length === 0 && aboveRangeProducts.length > 0) {
  //       console.log("IF")
  //       productsToFilter = aboveRangeProducts;
  //       setRecommendedHeading(true);
  //     } else {
  //       console.log("ELSE")
  //       filtered = combinedProducts;
  //       console.log("FILTERED:",filtered)
  //       setRecommendedHeading(false);
  //     }
  //   }

  //   console.log("OUTER FILTERED:",filtered)
  //   productsToFilter=filtered
  // }
  // setFilteredProducts(productsToFilter);

  //   },[accessoriesCategory,selectedPrice])

  // useEffect(() => {
  //   // Apply category and search query filtering

  //   if (searchQuery === "" && (category === "" || category === null)) {
  //     const menRegex = /^(men|man|mens|men's)/;

  //     let productsToFilter = products;

  //     // Apply category filtering
  //     if (selectedCategory !== "") {
  //       setSearchQuery("");

  //       const lowerCaseSelectedCategory = selectedCategory.toLowerCase();

  //       const filteredByCategory = products.filter((product) => {
  //         const lowerCaseProductCategory = product.category.toLowerCase();
  //         return lowerCaseProductCategory === lowerCaseSelectedCategory;
  //       });

  //       if (filteredByCategory.length > 0) {
  //         productsToFilter = filteredByCategory;
  //       } else {
  //         // If no products found for the selected category, set filtered products to all products
  //         productsToFilter = products;
  //       }
  //     }

  //     // Apply price filtering
  //     if (selectedPrice !== "") {
  //       const [minPrice, maxPrice] = selectedPrice.split("-").map(Number);

  //       const withinRangeProducts = productsToFilter.filter((product) => {
  //         const price = parseInt(product.product_price);
  //         return price >= minPrice && price <= maxPrice;
  //       });

  //       const aboveRangeProducts = productsToFilter.filter((product) => {
  //         const price = parseInt(product.product_price);
  //         return price > maxPrice;
  //       });

  //       let combinedProducts = [...withinRangeProducts, ...aboveRangeProducts];

  //       combinedProducts.sort(
  //         (a, b) => parseFloat(a.product_price) - parseFloat(b.product_price)
  //       );

  //       // Set the filtered products to products within price range
  //       productsToFilter = combinedProducts;
  //     }

  //     // Update filtered products state
  //     setFilteredProducts(productsToFilter);

  //     // Update recommendedHeading state
  //     setRecommendedHeading(productsToFilter.length === 0);
  //   }
  // }, [products, selectedCategory, selectedPrice]);

  useEffect(() => {}, []);

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
                        {snackbarOpen[index] && (
                          <div
                            style={{ fontSize: "12px" }}
                            className="border text-center rounded w-75 mx-auto"
                          >
                            Added successfully &#x2713;
                          </div>
                        )}
                      </div>
                    </a>

                    <button
                      onClick={() => handleAddToCart(product, index)}
                      className="btn btn-primary ms-3 my-3 w-50"
                    >
                      Add to cart
                    </button>
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
