// Import the CSS file for animations
import Dropdown from "react-bootstrap/Dropdown";
import cartIcon from "../assets/cart-icon.svg";
import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectTotalQuantity } from "../components/redux/Slices/CartSlice.js";
import { FiFilter } from "react-icons/fi";
import Filter from "./Filter.jsx";
import myContext from "./context/MyContext";

export default function Catlog() {
  const [mobileView, setMobileView] = useState(false);
  const totalQuantity = useSelector(selectTotalQuantity);
  const context = useContext(myContext);
  const { products } = context;

  const location = useLocation();
  const showFilter = () => {
    // Check if location pathname is not '/signin' or '/register'
    return (
      location.pathname === "/products" ||
      location.pathname === "/mens-category" ||
      location.pathname === "/womens-category" ||
      location.pathname === "/accessories" ||
      location.pathname === "/category"
    );
  };

  const { showfilterModal } = context;

  return (
    <>
      <div className="catlog filter ">
        <div className="catlog-names mx-lg-2 info-div text-center mt-1 container-fluid" >
          <div className="nav-link cat-nav mb-2 d-none d-md-flex justify-content-between w-100 mt-1 mx-5 px-5 pe-5 me-5 new-catlog">

            <span className="mt-1 fw-semibold">Near you</span>
            <span className="mt-1 fw-semibold">Fashion</span>
            <span className="mt-1 fw-semibold">Mens</span>
            <span className="mt-1 fw-semibold">Women's</span>
            <span className="mt-1 fw-semibold">Kids</span>
            <span className="mt-1 fw-semibold">Other</span>
            <span className="mt-1 fw-semibold">Best deals</span>
            <span className="mt-1 fw-semibold">Offers</span>
            <span><img src="https://cdn.pixabay.com/photo/2016/11/21/16/55/high-heels-1846436_640.jpg" className="img-fluid me-5 pe-5"  style={{height:"2.5rem",width:"20rem"}}/></span>



          </div>

          {showFilter() && (
            <div className="nav-link cat-nav d-md-none d-block">
              <button className="btn btn-primary rounded-pill" data-bs-toggle="modal" data-bs-target="#filterModal" onClick={() => setMobileView(true)}> Filter</button>
            </div>
          )}
        </div>
      </div>











      {/* filter modal */}
      <div
        className="modal fade bottom"
        id="filterModal"
        tabindex="-1"
        aria-labelledby="filterModal"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable filter-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="filterModal">
                Filter
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <Filter mobileView={mobileView} />
            </div>
          </div>
        </div>
      </div>
      {/* modal end */}
    </>
  );
}
