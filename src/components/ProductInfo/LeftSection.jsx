import React, { useContext, useEffect, useState } from "react";
import CarouselComponent from "./CarouselComponent";
import StarRatings from "./StarRatings";
import storeIcon from "../../assets/store.svg";
import products from "./data.js";
import axios from "axios";
import myContext from "../context/MyContext.js";

function LeftSection({ productId }) {
  // console.log(productId)
  const id = productId;
  const context=useContext(myContext);

  const{products}=context;

  const [product, setProduct] = useState();

  useEffect(() => {
        const item = products.filter(productItem => productItem.product_id === id);
        const fProduct = item[0];
        if (fProduct) {
          setProduct(fProduct);
        }
  }, [id]);

  return (
    <>
    {
      product &&
      <section className="w-100 md:w-50 d-flex flex-column gap-4  position-relative px-md-4">
      <div className="w-100  rounded-lg position-relative" >
        <CarouselComponent productId={id} />
      </div>
      <div className=" d-flex ">
        <div className="border rounded d-flex flex-column  w-100 px-md-4 gap-2 px-1">
          <div
            className="d-flex  flex-row justify-content-between align-items-center pt-2  "
            style={{ height: "40px" }}
          >
            <div
              className=" d-flex align-items-center justify-content-start"
              style={{ width: "120px" }}
            >
              <img src={storeIcon} alt="logo" style={{ width: "35px" }} />
              <div className="fs-6  " style={{ fontWeight: "bold" }}>
                E-Rigo
              </div>
            </div>

            <div className="d-flex  gap-1 gap-md-4 ">
              <div
                className="bg-body-secondary  d-flex align-items-center justify-content-center rounded py-1"
                style={{ width: "60px", fontSize: "12px" }}
              >
                Shirts
              </div>
              <div
                className="bg-body-secondary  d-flex align-items-center justify-content-center rounded py-1"
                style={{ width: "60px", fontSize: "12px" }}
              >
                Jackets
              </div>
              <div
                className="bg-body-secondary  d-flex align-items-center justify-content-center rounded py-1"
                style={{ width: "60px", fontSize: "12px" }}
              >
                Hoodies
              </div>
            </div>
          </div>

          <div
            className="d-flex justify-content-between align-items-center border-top pt-2"
            style={{ fontSize: "12px" }}
          >
            <p>100+ Positive Feedback</p>
            <p>Missing Information</p>
          </div>
        </div>
      </div>

      <div className="  d-flex flex-column  py-2 rounded gap-4">
        <div className="d-flex flex-column gap-1 border rounded px-4 pt-3">
          <h2 className=" fs-4 text-start">Ratings & Reviews</h2>
          <div className="d-flex fl ">
            <div className="w-50 d-flex flex-column  gap-2 ">
              <span className="fs-1">{product.product_ratings}</span>
              <StarRatings rating={product.product_ratings} />

              <span style={{ fontSize: "14px" }}>40 Ratings</span>
            </div>

            <div className="w-50  py-2">
              <ul className="list-unstyled   h-100">
                <li className="d-flex gap-1">
                  <span>5</span>
                  <div className=" w-100 d-flex justify-content-center align-items-center pl-1">
                    <div className=" w-100 bg-body-secondary">
                      <div
                        className="border bg-black w-75"
                        style={{ padding: "1px" }}
                      ></div>
                    </div>
                  </div>
                </li>

                <li className="d-flex gap-1">
                  <span>4</span>
                  <div className=" w-100 d-flex justify-content-center align-items-center pl-1">
                    <div className=" w-100 bg-body-secondary">
                      <div
                        className="border bg-black w-50"
                        style={{ padding: "1px" }}
                      ></div>
                    </div>
                  </div>
                </li>
                <li className="d-flex gap-1">
                  <span>3</span>
                  <div className=" w-100 d-flex justify-content-center align-items-center pl-1">
                    <div className=" w-100 bg-body-secondary">
                      <div
                        className="border bg-black w-50"
                        style={{ padding: "1px" }}
                      ></div>
                    </div>
                  </div>
                </li>
                <li className="d-flex gap-1">
                  <span>2</span>
                  <div className=" w-100 d-flex justify-content-center align-items-center pl-1">
                    <div className=" w-100 bg-body-secondary">
                      <div
                        className="border bg-black w-75"
                        style={{ padding: "1px" }}
                      ></div>
                    </div>
                  </div>
                </li>
                <li className="d-flex gap-1">
                  <span>1</span>
                  <div className=" w-100 d-flex justify-content-center align-items-center pl-1">
                    <div className=" w-100 bg-body-secondary">
                      <div
                        className="border bg-black w-25"
                        style={{ padding: "1px" }}
                      ></div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="h-120px w-100 d-flex flex-column gap-1 pt-2">
          <div style={{  }}>
            <ul
              className="border  rounded p-2 h-100"
              style={{ scrollbarWidth: "thin", fontSize: "16px",listStyle:'none' }}
            >
              <li className="py-2">
                <span className="fw-semibold">Rajesh: </span>Products are really
                good
              </li>
              <li className="border-top py-2">
                <span className="fw-semibold">Rohit:</span> Good
              </li>
              <li className="border-top py-2">
                <span className="fw-semibold">User381:</span> Quality awesome
                with affordable price.
              </li>
              <li className="border-top py-2">
                <span className="fw-semibold">Ajay:</span> Sustainable
              </li>
              
            </ul>
          </div>
        </div>
      </div>
    </section>
    }
    </>
  
    
  );
}

export default LeftSection;
