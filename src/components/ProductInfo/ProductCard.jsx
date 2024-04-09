import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import StarRatings from "./StarRatings";
import myContext from "../context/MyContext";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/Slices/CartSlice";
import {
  showSnackbar,
  hideSnackbar,
  addItemToWishlist,
  hideSnackbarForWishlist,
  showSnackbarForWishlist,
} from "../redux/Slices/CartSlice";
import cartIcon from "../../assets/cart-icon.svg";

function ProductCard({ product, index }) {
  const context = useContext(myContext);

  const { products } = context;
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

  return (
    <div key={index} className="col-6 col-sm-3 py-2 w-100">
      <div className="product-card">
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
            <div
              className={`offer-tag bg-warning rounded-pill text-center p-1 text-light ${
                product.offers === "0" && "invisible"
              }`}
            >
              {product.offers}% Off
            </div>
          </div>

          <div className="product-content">
            {product.product_name.length > 15
              ? product.product_name.substring(0, 25) + "..."
              : product.product_name}
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
              Rating: <StarRatings rating={product.product_ratings} />
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
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
