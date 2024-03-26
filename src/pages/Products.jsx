import React, { useState, useEffect } from "react";
import { FaLocationDot } from "react-icons/fa6";
import Filter from "../components/Filter";
import Ban from "../components/images/product.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import StarRatings from "../components/ProductInfo/StarRatings.jsx";
import { useContext } from "react";
import myContext from "../components/context/MyContext.js";

const HomeProducts = () => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categoryFiltered, setCategoryFiltered] = useState([]);

  const [recommendedHeading, setRecommendedHeading] = useState(false);

  const context = useContext(myContext);
  const {
    selectedCategory,
    setSelectedCategory,
    products,
    selectedPrice,
    searchQuery,
    setSearchQuery,
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

  useEffect(() => {

    console.log("SELECTED CATEGORY",selectedCategory)
    // Apply price filtering
    let productsToFilter = products;




    if (selectedPrice !== "") {
      const [minPrice, maxPrice] = selectedPrice.split("-").map(Number);
  
      const withinRangeProducts = products.filter((product) => {
        const price = parseInt(product.product_price);
        return price >= minPrice && price <= maxPrice;
      });
  
      const aboveRangeProducts = products.filter((product) => {
        const price = parseInt(product.product_price);
        return price > maxPrice;
      });
  
      let combinedProducts = [...withinRangeProducts, ...aboveRangeProducts];
  
      combinedProducts.sort(
        (a, b) => parseFloat(a.product_price) - parseFloat(b.product_price)
      );
  
      if (products.length === 0 && aboveRangeProducts.length > 0) {
        productsToFilter = aboveRangeProducts;
        setRecommendedHeading(true);
      } else {
        productsToFilter = combinedProducts;
        setRecommendedHeading(false);
      }
    }
  

    // Apply category and search query filtering
    const menRegex = /^(men|man|mens|men's)/;
    
    if (selectedCategory !== "") {
      setSearchQuery("")
      
      const lowerCaseSelectedCategory = selectedCategory.toLowerCase();
      console.log("lowerCaseSelectedCategory",lowerCaseSelectedCategory)
      
      const filteredByCategory = products.filter((product) => {
        const lowerCaseProductCategory = product.category.toLowerCase();
       
        return lowerCaseProductCategory === lowerCaseSelectedCategory;
      });
      console.log('filteredByCategory',filteredByCategory)
    
      if (filteredByCategory.length > 0) {
        setFilteredProducts(filteredByCategory)
        productsToFilter = filteredByCategory;
        setRecommendedHeading(false); // If category filter applied, turn off recommended heading
      } else {
        setFilteredProducts(products)
        setRecommendedHeading(true); // If no products found for the selected category, turn on recommended heading
      }
    }


    if(selectedCategory ===""){
      if (category) {
        const lowerCategory = category.toLowerCase();
        const categoryWords = lowerCategory.split(" ");
        let foundMenProducts = false;
        for (const word of categoryWords) {
          if (menRegex.test(word)) {
            const filtered = productsToFilter.filter(
              (product) =>
                product.category.toLowerCase().startsWith("men") ||
                product.product_name.toLowerCase().startsWith("men")
            );
            setFilteredProducts(filtered);
            foundMenProducts = true;
            return; // Exit the loop once men's products are found
          }
        }
        if (!foundMenProducts) {
          const filtered = productsToFilter.filter(
            (product) =>
              product.category.toLowerCase().includes("women") ||
              product.product_name.toLowerCase().includes("women")
          );
          setFilteredProducts(filtered);
          console.log("WOMEN CATEGORIES:", filtered);
          return;
        }
      }
    
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
        
        if(filtered.length>0){
          setFilteredProducts(filtered)
        }else{
          setFilteredProducts(products)
        }
      } else {
        setFilteredProducts(products);
      }
    }

    setSnackbarOpen(Array(products.length).fill(false));
  }, [products, searchQuery, category, selectedPrice,selectedCategory]);
  


  
  //   useEffect(() => {

  //     setFilteredProducts(products)
  //     console.log('searchQuery',searchQuery)
  //     setSelectedCategory(searchQuery)

  //     if(searchQuery.toLowerCase().startsWith("men") || searchQuery.toLowerCase().startsWith("man")){
  //      const filtered = products.filter((product) =>
  //               product.category.toLowerCase().startsWith("men")
  //             );
  //         console.log("FILTERED: " ,filtered)
  //       setFilteredProducts(filtered)
  //     }else{
  //      const filtered = products.filter(
  //         (product) => product.category.toLowerCase() === searchQuery)
  //         console.log("ALL CATEGORY:",filtered)
  //       setFilteredProducts(filtered)
  //     }

  // if (category) {
  //   filtered = filtered.filter((product) => product.category === category);

  // }

  // else {
  //   console.log('SELECTED CATEGEORY:',selectedCategory)

  //     if (selectedCategory !== "") {

  //       const lowerCaseSelectedCategory = selectedCategory.toLowerCase();
  //       console.log("LOWER CASE:",lowerCaseSelectedCategory)
  //       if (
  //         lowerCaseSelectedCategory.startsWith("men") ||
  //         lowerCaseSelectedCategory.startsWith("mens") ||
  //         lowerCaseSelectedCategory.startsWith("men's") ||
  //         lowerCaseSelectedCategory === "men" ||
  //         lowerCaseSelectedCategory === "mens" ||
  //         lowerCaseSelectedCategory === "men's"
  //       ) {

  //       }
  //       else{
  //         setFilteredProducts([]);
  //         filtered = filtered.filter(
  //           (product) => product.category.toLowerCase() === lowerCaseSelectedCategory
  //         );
  //         setFilteredProducts(filtered)
  //         console.log("ALL CATEGORY:",filtered)
  //       }

  //     }

  //       if (selectedPrice !== "") {
  //         const [minPrice, maxPrice] = selectedPrice.split("-").map(Number);

  //         const withinRangeProducts = products.filter((product) => {
  //           const price = parseInt(product.product_price);
  //           return price >= minPrice && price <= maxPrice;
  //         });

  //         const aboveRangeProducts = products.filter((product) => {
  //           const price = parseInt(product.product_price);
  //           return price > maxPrice;
  //         });

  //         let combinedProducts = [...withinRangeProducts, ...aboveRangeProducts];

  //         combinedProducts.sort(
  //           (a, b) => parseFloat(a.product_price) - parseFloat(b.product_price)
  //         );

  //         if (products.length === 0 && aboveRangeProducts.length > 0) {
  //           setFilteredProducts(aboveRangeProducts);
  //           setRecommendedHeading(true);
  //         } else {
  //           setFilteredProducts(combinedProducts);
  //           setRecommendedHeading(false);
  //         }
  //       }

  //   setSnackbarOpen(Array(products.length).fill(false));
  // }, [category, products, searchQuery]);

  // const location = useLocation();

  // useEffect(() => {
  //   if (location.state !== "") {
  //     const receivedData = location.state && location.state.data;
  //     console.log("RECIEVED DATA:",receivedData)
  //     // if (receivedData !== null) {
  //     //   setFilteredProducts(receivedData);
  //     // }
  //   }
  // }, [location.state]);

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
                  ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeProducts;
