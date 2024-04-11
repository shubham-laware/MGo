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
import { Link } from "react-router-dom"
import NavDropdown from "react-bootstrap/NavDropdown";
import { CiLocationArrow1 } from "react-icons/ci";
import { FaLocationCrosshairs } from "react-icons/fa6";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";



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

  const locationHy = useLocation();
  const showHyDropdown = () => {
    // Check if location pathname is not '/signin' or '/register'
    return (
      locationHy.pathname === "/"
    );
  };


  // State to manage the dropdown title
  const locationHY = (
    <>
      <CiLocationArrow1 /> Hyderabad
    </>
  );

  const [dropdownTitle, setDropdownTitle] = useState(locationHY);

  // Function to handle the dropdown item click
  const handleDropdownItemClick = (option) => {
    // Update the dropdown title based on the selected item
    setDropdownTitle(option);
  };

  return (
    <>
      <div className="catlog filter ">
        <div className="catlog-names mx-lg-2 info-div text-center mt-1 container-fluid mx-md-5 me-md-5 px-md-5 pe-md-5" >
          <div className="nav-link cat-nav d-none d-md-flex justify-content-evenly w-100 mt-1 mx-5 px-5 pe-5 me-5 new-catlog align-items-center">

            <Link style={{ textDecoration: "none", color: "black", fontSize: "13.5px" }}> <span className="mt-1 fw-semibold">Near you</span></Link>
            <Link
              to={{
                pathname: "/accessories",
                search: `?category=Accessories`,
              }}
              style={{ textDecoration: "none", color: "black", fontSize: "13.5px" }}
            >  <span className="mt-3 fw-semibold">Fashion</span></Link>
            <Link
              to={{
                pathname: "/mens-category",
                search: `?category=Men's Fashion`,
              }}
              style={{ textDecoration: "none", color: "black", fontSize: "13.5px" }}
            > <span className="mt-1 fw-semibold">Mens</span></Link>
            <Link
              to={{
                pathname: "/womens-category",
                search: `?category=Women's Fashion`,
              }}
              style={{ textDecoration: "none", color: "black", fontSize: "13.5px" }}
            ><span className="mt-1 fw-semibold">Women's</span></Link>
            <Link
              style={{ textDecoration: "none", color: "black", fontSize: "13.5px" }}
            ><span className="mt-1 fw-semibold">Kids</span></Link>
            <Link
              to={{
                pathname: "/accessories",
                search: `?category=Accessories`,
              }}
              style={{ textDecoration: "none", color: "black", fontSize: "13.5px" }}
            ><span className="mt-1 fw-semibold">Other</span></Link>
            <Link
              to={{
                pathname: "/accessories",
                search: `?category=Accessories`,
              }}
              style={{ textDecoration: "none", color: "black", fontSize: "13.5px" }}
            >
              <span className="mt-1 fw-semibold">Best deals</span></Link>
            <Link
              to={{
                pathname: "/accessories",
                search: `?category=Accessories`,
              }}
              style={{ textDecoration: "none", color: "black", fontSize: "14px" }}
            > <span className="mt-1 fw-semibold">Offers</span></Link>
            <span><img src="https://cdn.pixabay.com/photo/2016/11/21/16/55/high-heels-1846436_640.jpg" className="img-fluid me-5 pe-5 m-0 p-0" style={{ height: "3.3rem", width: "20rem" }} /></span>

          </div>

          {
            showHyDropdown() && (
              <div className="dropdown nav-link cat-nav d-md-none d-flex justify-content-between w-100 align-items-center mb-3 text-black">

                <div className="p-2">
                  <NavDropdown
                    title={dropdownTitle}
                    id="collasible-nav-dropdown"
                    style={{ border: "2.6px solid #d8dfab", borderRadius: "13px", fontSize: "15px",padding:"10px" }}
                    className="bg-light"
                  >
                    <NavDropdown.Item
                      onClick={() => handleDropdownItemClick("Hyderabad")}
                     
                    >
                      <FaLocationCrosshairs /> <span className="text-black">Hyderabad</span>
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item
                      onClick={() => handleDropdownItemClick("Mumbai")}
                    
                    >,
                      Mumbai
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      onClick={() => handleDropdownItemClick("Delhi")}
                     
                    >
                      Delhi
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      onClick={() => handleDropdownItemClick("Banglore")}
                      
                    >
                      Banglore
                    </NavDropdown.Item>
                  </NavDropdown>
                </div>

                <span><img src="https://cdn.pixabay.com/photo/2016/11/21/16/55/high-heels-1846436_640.jpg" className="m-0 p-0 homeCatlogImg" style={{ height: "4rem", width: "12rem" }} /></span>
              </div>
            )
          }


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
