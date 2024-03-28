import React, { useContext } from "react";
import { Link } from "react-router-dom";
import StarRatings from "./StarRatings";
import myContext from "../context/MyContext";
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from "../redux/Slices/CartSlice";
import { showSnackbar, hideSnackbar ,addItemToWishlist,hideSnackbarForWishlist, showSnackbarForWishlist} from "../redux/Slices/CartSlice";


function ProductCard({ product, index }) {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);
 
  const handleAddToCart = (product, index) => {
    dispatch(addToCart(product));
    dispatch(showSnackbar({ message: "Product added successfully!", index }));
    console.log("index", index)

    // Wait for 1 second, then hide snackbar
    setTimeout(() => {
      dispatch(hideSnackbar());
    }, 1000)
  };

  const handleWishListToCart =(product,index)=>{
    console.log("wishlist call",product)
    dispatch(addItemToWishlist(product));
    dispatch(showSnackbarForWishlist({ message: 'Item added to wishlist!',index }));
    setTimeout(() => {
      dispatch(hideSnackbarForWishlist());
    }, 1000); // Hide after 3 seconds
  }

 

  return (
    <div className="col-6 col-sm-3 py-2 w-100 ">
      <div className="product-card  ">
        <a
          href={`/${product.product_id}`}
          target="_blank"
          style={{
            textDecoration: "none",
            color: "black",
          }}
        >
          <div className="product-image">
            <img src={product.product_image1} alt="Product 1" />

            <div className="offer-tag bg-warning rounded-pill text-center p-1 text-light">
              {product.percentOff} Off
            </div>
          </div>
          <div className="product-content">
            <h6>{product.product_name} </h6>
            <h5>
              Price: <sup>&#x20B9;</sup>
              {product.product_price}
              <span className="text-decoration-line-through text-muted fs-6 fw-light">
                599
              </span>
              <span className="text-muted" style={{ fontSize: "13px" }}>
                {" "}
                {product.product_stock}
              </span>
            </h5>
            <div className="product-rating text-warning">
              Rating: <StarRatings rating={product.product_ratings} />
            </div>
            <p className="product-distance text-secondary  pt-2">
              Distance: {product.distance}km away.
            </p>
          </div>
          {cart.snackbar.open && cart.snackbar.index === index && (
            <div
              style={{ fontSize: "12px" }}
              className="border text-center rounded w-75 mx-auto"
            >
              {cart.snackbar.message}
            </div>
          )}
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
  );
}

export default ProductCard;
