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
  const [mobileView, setMobileView] = useState(false)
  const totalQuantity = useSelector(selectTotalQuantity);
  const context = useContext(myContext);
  const { products } = context;
  console.log("catlog page", products)

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
           <div className="catlog filter">
               <div
        className="catlog-names mx-lg-2 d-flex gap-1 info-div text-center mt-1"
      // style={{ marginLeft: "2.7rem" }}
      >
        <div className="nav-link cat-nav mb-2">
          <Dropdown>
            <Dropdown.Toggle
              variant="light"
              id="dropdown-basic"
              className=" rounded-pill set-range btn-primary"
            >
              Range
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">
                Distance 8<sup>km</sup>
              </Dropdown.Item>
              <Dropdown.Item href="#/action-2">
                Distance 12<sup>km</sup>
              </Dropdown.Item>
              <Dropdown.Item href="#/action-3">
                Distance 20<sup>km</sup>
              </Dropdown.Item>
              <Dropdown.Item href="#/action-3">
                Distance 25<sup>km</sup>
              </Dropdown.Item>
              <Dropdown.Item href="#/action-3">
                More than 25<sup>km</sup>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        {/* <div
          className="nav-link cat-nav d-lg-none d-block text-center"
          style={{ position: "relative" }}
        >
          <img
            src={cartIcon}
            alt="Cart"
            style={{ height: "2rem", width: "2rem" }}
          />
          <h6 style={{ position: "absolute", top: "0.5rem", left: "1.6rem" }}>
            {totalQuantity}
          </h6>
        </div> */}


        {
          showFilter() && (
            <div className="nav-link cat-nav d-lg-none d-block " style={{marginLeft:"12rem"}}>
              <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#filterModal" onClick={() => setMobileView(true)}> Filter</button>
            </div>
          )
        }


      </div>
              </div>
      {/* <div className="catlog filter w-100">
     

      </div> */}

      {/* filter modal */}
      
      <div className="modal fade bottom" id="filterModal" tabindex="-1" aria-labelledby="filterModal" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="filterModal">Filter</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
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
