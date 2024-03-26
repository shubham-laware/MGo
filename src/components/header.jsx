import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import NavDropdown from "react-bootstrap/NavDropdown";
import "bootstrap/dist/css/bootstrap.css";
import Logo from "../components/images/minitgo.png";
import { FaLocationCrosshairs } from "react-icons/fa6";
import { CiLocationArrow1 } from "react-icons/ci";
// import { BiCartAlt } from "react-icons/bi";
import cartIcon from "../assets/cart-icon.svg";
import { BiLogIn } from "react-icons/bi";
import { BiMenuAltRight } from "react-icons/bi";
import Catlog from './catlog.jsx';
import Offcanvas from 'react-bootstrap/Offcanvas'; // Import Offcanvas
import { useContext } from 'react';
import myContext from '../components/context/MyContext.js';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Header() {
  const navigate = useNavigate();

  // State to manage the dropdown title
  const location = (
    <>
      <CiLocationArrow1 /> Hyderabad
    </>
  );
  const [dropdownTitle, setDropdownTitle] = useState(location);

  // Function to handle the dropdown item click
  const handleDropdownItemClick = (option) => {
    // Update the dropdown title based on the selected item
    setDropdownTitle(option);
  };
  // State to manage Offcanvas visibility
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  // context code add
  const context = useContext(myContext);
  const { searchQuery, setSearchQuery, handleSearchInputChange, products,setSelectedCategory} = context;
  // code for serach
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const focusSearchInput = () => {
    const searchInput = document.querySelector(".search-box");
    if (searchInput) {
      searchInput.focus();
    }
  };
  useEffect(() => {
    if (searchQuery !== '') {
      setSelectedCategory("")
      

      const normalizedQuery = searchQuery.toLowerCase().replace(/[^a-zA-Z0-9 ]/g, '');

      const suggestions = products.filter(product => {
        product.product_name.toLowerCase().includes(searchQuery.toLowerCase())
        // Normalize the product name for comparison
        const normalizedProductName = product.product_name.toLowerCase().replace(/[^a-zA-Z0-9 ]/g, '');
        return normalizedProductName.includes(normalizedQuery);
      });
      setSearchSuggestions(suggestions);


      // //new
      // const normalizedQuery = searchQuery.toLowerCase().replace(/[^a-zA-Z0-9 ]/g, "");
      // const regex = new RegExp("^" + searchQuery, "i");
      // const suggestions = products.filter((product) => {
      //   product.product_name.toLowerCase().includes(searchQuery.toLowerCase());
      //   const normalizedProductName = product.product_name
      //     .toLowerCase()
      //     .replace(/[^a-zA-Z0-9 ]/g, "").split(" ");
      //   return normalizedProductName.some((word) => regex.test(word));
      // });
      // setSearchSuggestions(suggestions);
    } else {
      setSearchSuggestions([]);
    }
  }, [searchQuery, products]);



  //for enter button
  // const handleKeyPress = (e) => {
  //   if (e.key === 'Enter') {
  //     handleGoButton();
  //   }
  // };

  // handle go button
  const handleGoButton = () => {
    if (searchQuery !== '') {
      navigate('/products', { state: { data: searchSuggestions } });
    } else {
      navigate('/products');
    }
    setSearchSuggestions([]);
  }

  const handleSuggestionClick = (productName) => {
    setSearchQuery(productName);

  };

  const handleKeyPress = (event, productName) => {
    console.log("Enter key press", productName)
    if (event.key === 'Enter') {
      handleGoButton();
    }
  };

  const cart = useSelector(state => state.cart);
 const totalQuantity = cart?.reduce((total, cartItem) => total + cartItem.quantity, 0);

  const login = (
    <span>
      <BiLogIn /> Signin
    </span>
  );
  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        className=" bg-light fixed-top shadow  "
      >
        <Container>
          <Navbar.Brand>
            <Link to="/">
              <img src={Logo} style={{ width: "115px" }} />
            </Link>
          </Navbar.Brand>
          <div className="mobile-menu-logo d-lg-none">
            <Catlog />
          </div>

          <BiMenuAltRight
            className="mobile-menu-logo d-lg-none"
            onClick={() => setShowOffcanvas(true)}
          />

          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <NavDropdown
                title={dropdownTitle}
                id="collasible-nav-dropdown"
                style={{ border: "2.6px solid #d8dfab", borderRadius: "13px" }}
              >
                <NavDropdown.Item
                  onClick={() => handleDropdownItemClick("Hyderabad")}
                >
                  <FaLocationCrosshairs /> Hyderabad
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item
                  onClick={() => handleDropdownItemClick("Mumbai")}
                >
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
            </Nav>
            <Form.Control
              style={{ margin: "0 0px 0 32px" }}
              type="search"
              placeholder=" Ex: T-Shirt near me"
              className=" search-box"
              aria-label="Search"
              value={searchQuery}
              onChange={handleSearchInputChange}
              onKeyPress={handleKeyPress}
            />


            <Form />

            <Button className=" search-btn" variant="outline-success" onClick={handleGoButton}>Go</Button>
            <div className="suggestion position-absolute" style={{ width: "760px" }}>
              <div className="container position-absolute" style={{ marginLeft: "165px", marginTop: "20px", background: "rgb(217, 223, 175" }}>
                {searchSuggestions.map(suggestion => (
                  <div key={suggestion.product_id} onKeyDown={(event) => handleKeyPress(event, suggestion.product_name)} tabIndex={0}>
                    <span style={{ cursor: "Pointer" }} onClick={() => handleSuggestionClick(suggestion.product_name)} >
                      <span className='py-2 px-2 m-1 fs-6'>{suggestion.product_name}</span>
                    </span>

                  </div>
                ))}
              </div>
            </div>

            <Nav >

              <NavDropdown title={login} id="collasible-nav-dropdown" className='Dropdown'>

                <NavDropdown.Item>
                  <Link to="/register" className='text-decoration-none '>Create an account</Link>

                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Link to="/signin" className="text-decoration-none">
                    Login
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Divider />
                {/* <NavDropdown.Item>
                  <Link to="/register" className="text-decoration-none ">
                    Minit-Pay{" "}
                  </Link>
                </NavDropdown.Item> */}
                <NavDropdown.Item>
                  <Link to="/register" className="text-decoration-none ">
                    {" "}
                    Address change{" "}
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Link to="/profile" className="text-decoration-none ">
                    {" "}
                    Profile{" "}
                  </Link>
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link eventKey={2}>
                <Link to="/orders" className="text-decoration-none text-dark">
                  Orders
                </Link>
              </Nav.Link>

              {/* <Link to="/cart" className='text-secondary' style={{ fontSize: '33px', margin: '-5.8% 0 0 0' }}><BiCartAlt /></Link> */}
              <Link
                to="/cart"
                className="text-secondary position-relative   "
                style={{
                  textDecoration: "none",
                  width:'50px', 
                  
                }}
              >
                 <div className=" w-100 h-100 position-relative d-flex flex-column justify-content-end align-items-center" >

                <img
                  src={cartIcon}
                  alt="Cart"
                  className="w-100 " 
                  style={{height:'35px'}}
                  
                  
                  
                />
                <h6 className=" w-100  position-absolute text-center " style={{top:'3px',left:'3px',fontSize:'14px'}}>
                {totalQuantity}
                
                </h6>
              </div>
               
              </Link>

             
            </Nav>
          </Navbar.Collapse>
        </Container>
        <div className="mobile-menu-logo d-lg-none">
          <div className="mobile-search">
            <Form.Control
              type="search"
              placeholder=" Ex: T-Shirt near me"
              className="search-box-m"
              aria-label="Search"
            /><Form />
            <Button className=" search-btn" variant="outline-success">Go</Button>

          </div>
        </div>
      </Navbar>



      <Catlog />


      {/* Offcanvas Sidebar */}


      <Offcanvas show={showOffcanvas} onHide={() => setShowOffcanvas(false)} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Minitgo</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {/* Sidebar content goes here */}
          <Nav className="flex-column">
            <Link to="/about" className="nav-link">
              About
            </Link>
            <Link to="/" className="nav-link">
              Create an account
            </Link>
            <Link to="/" className="nav-link">
              Login
            </Link>
            {/* <Link to="/" className="nav-link">
              Minit-Pay
            </Link> */}
            <Link to="/" className="nav-link">
              Address change
            </Link>
            <Link to="/" className="nav-link">
              Home
            </Link>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>



    </>
  );
}

export default Header;


