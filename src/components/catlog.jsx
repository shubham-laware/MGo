import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";
import { BiMenuAltLeft } from "react-icons/bi";
// Import the CSS file for animations
import Dropdown from 'react-bootstrap/Dropdown';
import { FaStore, FaCartShopping } from "react-icons/fa6";
import cartIcon from "../assets/cart-icon.svg";
import { selectTotalQuantity } from "../components/redux/Slices/CartSlice";
import { useSelector } from "react-redux";
import {Link} from 'react-router-dom'

export default function Catlog() {
  const totalQuantity = useSelector(selectTotalQuantity);
  return (
    <div className="catlog filter">


      <ul className="catlog-names me-lg-0 me-3 " style={{ position: "relative", right: "55px" ,top:"12px" }}>

        <li className="nav-link cat-nav">
          <Dropdown>
            <Dropdown.Toggle variant="light" id="dropdown-basic" className=" rounded-pill set-range" style={{position:"relative",bottom:"5px"}}>
              Range
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">Distance 8<sup>km</sup></Dropdown.Item>
              <Dropdown.Item href="#/action-2">Distance 12<sup>km</sup></Dropdown.Item>
              <Dropdown.Item href="#/action-3">Distance 20<sup>km</sup></Dropdown.Item>
              <Dropdown.Item href="#/action-3">Distance 25<sup>km</sup></Dropdown.Item>
              <Dropdown.Item href="#/action-3">More than 25<sup>km</sup></Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </li>

        <li className="nav-link cat-nav d-lg-none d-block " style={{ position: "relative" }}>
        <Link
                  to="/cart"
                  className="border-bottom py-3 fw-semibold px-2"
                  style={{
                    textDecoration: "none",
                    color: "black",
                  }}>
                     <img
            src={cartIcon}
            alt="Cart"
            className=" text-black"
            style={{ height: "35px", width: "30px" }}
          />
          <h6
            className=" w-100  position-absolute text-center "
            style={{ top: "5px",fontSize: "14px" }}
          >
            {totalQuantity}
          </h6>
                  </Link>
       
        </li>





      </ul>

    </div>
  );
}
