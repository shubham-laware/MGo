import React, { useContext, useEffect, useState } from "react";
import cartIcon from "../../assets/cart.svg";
import StarRatings from "./StarRatings";
import paypalIcon from "../../assets/paypal.svg";
import mastercardIcon from "../../assets/mastercard.svg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import myContext from "../context/MyContext";

function RightSection({ productId }) {
  const id = productId;
  const navigate=useNavigate();

  const context=useContext(myContext);

  const {handleAddToCart}=context

  const [product, setProduct] = useState();


  useEffect(() => {
    axios
      .get("https://minitgo.com/api/fetch_products.php")
      .then((response) => {
        const fetchedProducts = response.data.data;
        const item = fetchedProducts.filter(
          (productItem) => productItem.product_id === id
        );
        const fProduct = item[0];
        if (fProduct) {
          setProduct(fProduct);
        }
      })
      .catch((error) => {
        setError(error);
      });
  }, []);


  const handleCheckout=()=>{
    navigate('/checkout')
  }
  return (
    <>
      {product && (
        <section className="w-100 md:w-50 px-md-4 ">
          <div className=" d-flex flex-column gap-2 ">
            <div className="d-flex flex-column gap-2 ">
              <div className="d-flex">
                <div className="bg-body-secondary  rounded p-2 d-flex align-items-center gap-2">
                  <span className="small">❤️ Wishlist</span>
                  <span className="small d-flex align-items-center">
                    <img
                      src={cartIcon}
                      alt="cartIcon"
                      className="w-100"
                      style={{ maxWidth: "24px" }}
                    />
                    Cart
                  </span>
                </div>
              </div>

              <h2 style={{ textAlign: "justify" }}>{product.product_name}</h2>

              <div className="d-flex  gap-4 align-items-center w-100 ">
                <div className="d-flex align-items-center  gap-2 ">
                  <StarRatings rating={product.product_ratings} />
                  <span className="small pt-1">{product.product_ratings}</span>
                </div>

                <span className="small pt-1">2347 Reviews</span>
                <span className="small pt-1">4873 sold</span>
              </div>
              <p className="fw-bold fs-3">
                <sup>&#x20B9;</sup> {product.product_price}
              </p>
            </div>

            <div className="border-top h-100 py-2 d-flex flex-column gap-4 ">
              <div className="d-flex flex-column gap-1 pt-2">
                <h2 className="fw-semibold fs-5 text-start">Select Size</h2>
                <div className="d-flex gap-4" style={{ fontSize: "12px" }}>
                  <span
                    className="border py-1 px-2 bg-body-secondary rounded "
                    style={{ width: "35px", textAlign: "center" }}
                    role="button"
                  >
                    M
                  </span>
                  <span
                    className="border  py-1 px-2 bg-body-secondary rounded "
                    style={{ width: "35px", textAlign: "center" }}
                    role="button"
                  >
                    S
                  </span>
                  <span
                    className="border py-1 px-2 bg-body-secondary  rounded "
                    style={{ width: "35px", textAlign: "center" }}
                    role="button"
                  >
                    L
                  </span>
                  <span
                    className="border  py-1 px-2 bg-body-secondary rounded "
                    style={{ width: "35px", textAlign: "center" }}
                    role="button"
                  >
                    XL
                  </span>
                  <span
                    className="border  py-1 px-2 bg-body-secondary  rounded "
                    style={{ width: "35px", textAlign: "center" }}
                    role="button"
                  >
                    2XL
                  </span>
                </div>
              </div>

              <div className="d-flex flex-column gap-1 ">
                <h2 className="fw-semibold fs-5 text-start">Select Color</h2>
                <div className="d-flex gap-4">
                  <div
                    className="border rounded px-1 py-1 d-flex "
                    role="button"
                  >
                    <span className="border  d-inline-block py-2 px-2 rounded bg-primary"></span>
                  </div>
                  <div
                    className="border rounded px-1 py-1 d-flex"
                    role="button"
                  >
                    <span className="border d-inline-block py-2 px-2 rounded bg-success"></span>
                  </div>
                  <div
                    className="border rounded px-1 py-1 d-flex "
                    role="button"
                  >
                    <span className="border  d-inline-block py-2 px-2 rounded bg-danger"></span>
                  </div>
                  <div
                    className="border rounded px-1 py-1 d-flex "
                    role="button"
                  >
                    <span className="border  d-inline-block py-2 px-2 rounded bg-dark"></span>
                  </div>
                </div>
              </div>
              <div className="d-flex flex-column gap-1">
                <div className="d-flex flex-column flex-md-row align-items-center  justify-content-between">
                  <h2 className="  fs-4 text-start ">Description</h2>

                  <div className="d-flex  w-75">
                    
                    <button
                    onClick={() => handleAddToCart(product)}
                    className="btn btn-primary ms-3 my-3 w-50"
                  >
                    Add to cart
                  </button>
                   
                  
                  <button
                    className="btn btn-primary ms-3 my-3 w-50"
                    onClick={handleCheckout}
                  >
                    Buy Now
                  </button>
                  </div>
                  
                </div>

                <p className=" fs-6" style={{ textAlign: "justify" }}>
                  {product.product_discription}
                </p>
              </div>

              <div className="d-flex flex-column gap-1 ">
                <h2 className="  fs-4 text-start">Product Details</h2>
                <ul className="list-unstyled d-flex flex-column gap-1 fs-6">
                  <li>
                    <span>→ </span>100% Cotton
                  </li>
                  <li>
                    <span>→ </span>32 Layer Print
                  </li>
                  <li>
                    <span>→ </span>Coloring Layer
                  </li>
                </ul>
              </div>

              <div className="d-flex flex-column gap-1 ">
                <h2 className=" fs-4 text-start">Shipping Information</h2>
                <ul
                  className=" list-unstyled d-flex flex-column  gap-1 "
                  style={{ fontSize: "16px" }}
                >
                  <li className="d-flex gap-4">
                    <span style={{ width: "80px" }}>Shipping: </span>
                    <span>Free Expeditions International</span>
                  </li>
                  <li className="d-flex gap-4">
                    <span style={{ width: "80px" }}>Estimated: </span>
                    <span>Estimated arrival on 17-20 March 2024</span>
                  </li>
                  <li className="d-flex gap-4">
                    <span style={{ width: "80px" }}>Delivery: </span>
                    <span>From Mumbai East</span>
                  </li>
                  <li className="d-flex gap-4">
                    <span style={{ width: "80px" }}>Payment: </span>
                    <div className="d-flex gap-2">
                      <img
                        src={paypalIcon}
                        alt="PayPal"
                        style={{ width: "20px" }}
                      />
                      <img
                        src={mastercardIcon}
                        alt="MasterCard"
                        style={{ width: "20px" }}
                      />
                    </div>
                  </li>
                </ul>
              </div>

              <div className="  h-100 d-flex flex-column">
                <div
                  className=" position-relative "
                  style={{ height: "158px" }}
                >
                  <textarea
                    className=" h-100 w-100 rounded-top p-2"
                    rows="5"
                    placeholder="Enter comments"
                    style={{ resize: "none", outline: "none" }}
                  ></textarea>
                </div>
                <button
                  className="py-1  bg-body-secondary  rounded-bottom w-100 "
                  style={{ border: "solid 1px", borderColor: "#a29898" }}
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default RightSection;
