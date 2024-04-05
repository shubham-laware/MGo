import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";
import { BiMenuAltLeft } from "react-icons/bi";
// Import the CSS file for animations
import Dropdown from 'react-bootstrap/Dropdown';
import { FaStore } from "react-icons/fa6";
import { HiOutlineCurrencyRupee } from "react-icons/hi2";
import cartIcon from "../assets/cart-icon.svg";

export default function Catlog() {
  return (
    <div className="catlog fixed-top filter">


      <div className="catlog-names d-flex gap-4">


        <div className="nav-link cat-nav mb-2">
          <Dropdown>
            <Dropdown.Toggle variant="light mx-2" id="dropdown-basic" className=" rounded-pill set-range btn-primary">
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
        </div>
        <div className="nav-link cat-nav d-lg-none d-block text-center" style={{position:"relative"}}>
         
            <img
              src={cartIcon}
              alt="Cart"
              style={{height:"2rem",width:"2rem"}}
            />
            <h6 style={{position :"absolute",top:"0.5rem",left:"1.6rem"}}>
             8
            </h6>
          
        </div>

      </div>



    </div>
  );
}