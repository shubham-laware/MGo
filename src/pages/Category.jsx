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
import { showSnackbar,hideSnackbar } from "../components/redux/Slices/CartSlice.js";

const Category = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate=useNavigate();

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
  } = context;

  const dispatch = useDispatch();
  const handleAddToCart = (product, index) => {
    dispatch(addToCart(product));
    dispatch(showSnackbar({ message: "Product added successfully!", index }));
    console.log("index", index)
 
    // Wait for 1 second, then hide snackbar
    setTimeout(() => {
      dispatch(hideSnackbar());
    }, 1000)
  };
  const cart = useSelector(state => state.cart);
  console.log("carousel compo", cart.snackbar.open)


  if(accessoriesCategory !==""){
    const url = `/accessories?selectedCategory=${encodeURIComponent(
      accessoriesCategory
    )}`;
    navigate(url);
  }

  useEffect(() => {
    if (selectedCategory !== "") {
      const url = `/category?selectedCategory=${encodeURIComponent(selectedCategory)}`;
      navigate(url);
    }
  }, [selectedCategory, navigate]);

  console.log("SELECTED CATEGORY",selectedCategory)



  useEffect(()=>{
    setSearchQuery("");
    setAccessoriesCategory("")
    let productsToFilter = products;
    if (selectedCategory !== "") {
        setSelectedCategory(selectedCategory)

        const lowerCaseSelectedCategory = selectedCategory.toLowerCase();

        const filteredByCategory = products.filter((product) => {
          const lowerCaseProductCategory = product.category.toLowerCase();
          return lowerCaseProductCategory === lowerCaseSelectedCategory;
        });

        if (filteredByCategory.length > 0) {
          productsToFilter = filteredByCategory;
          let filtered = [...productsToFilter]; // Copy the accessories products array

        if (selectedPrice !== "") {
            const [minPrice, maxPrice] = selectedPrice.split("-").map(Number);

            filtered = filtered.filter((product) => {
                const price = parseInt(product.product_price);
                return price >= minPrice && price <= maxPrice;
            });

            filtered.sort((a, b) => parseFloat(a.product_price) - parseFloat(b.product_price));
        }

        if (filtered.length === 0) {
            filtered = [...productsToFilter];
            filtered.sort((a, b) => parseFloat(a.product_price) - parseFloat(b.product_price));
        }

        setFilteredProducts(filtered);
        } else {
          productsToFilter = products;
          let filtered = [...productsToFilter];
          if (selectedPrice !== "") {
            const [minPrice, maxPrice] = selectedPrice.split("-").map(Number);

            filtered = filtered.filter((product) => {
                const price = parseInt(product.product_price);
                return price >= minPrice && price <= maxPrice;
            });

            filtered.sort((a, b) => parseFloat(a.product_price) - parseFloat(b.product_price));
        }

        // If no products match the filters, set filtered products to all accessories of the selected category
        if (filtered.length === 0) {
            filtered = [...productsToFilter];
            filtered.sort((a, b) => parseFloat(a.product_price) - parseFloat(b.product_price));
        }

          setFilteredProducts(filtered)
        }

      }else{
        productsToFilter=products
        console.log("PRODUCTS",productsToFilter)
        if (selectedPrice !== "") {
            const [minPrice, maxPrice] = selectedPrice.split("-").map(Number);

            productsToFilter = productsToFilter.filter((product) => {
                const price = parseInt(product.product_price);
                return price >= minPrice && price <= maxPrice;
            });

            productsToFilter.sort((a, b) => parseFloat(a.product_price) - parseFloat(b.product_price));
        }
        setFilteredProducts(productsToFilter)
      }

},[selectedCategory,selectedPrice,products])





    

 
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
                        {cart.snackbar.open && cart.snackbar.index === index && (
                            <div
                              style={{ fontSize: "12px" }}
                              className="border text-center rounded w-75 mx-auto"
                            >
                              {cart.snackbar.message}
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

export default Category;
