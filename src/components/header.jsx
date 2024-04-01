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
import Catlog from "./catlog.jsx";
import Offcanvas from "react-bootstrap/Offcanvas"; // Import Offcanvas
import { useContext } from "react";
import myContext from "../components/context/MyContext.js";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectTotalQuantity } from "../components/redux/Slices/CartSlice.js";
import Login from "../pages/Signin.jsx";
import { toast } from "react-toastify";
import { Col, Modal, Row } from "react-bootstrap";
import SignUp from '../pages/SignUp.jsx'

import "./header.css";
import axios from "axios";

function Header() {
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [townDistrict, setTownDistrict] = useState("");
  const [state, setState] = useState("");
 

  const handleSnackbarClose = () => {
    setShowSnackbar(false);
  };



 

 

  const navigate = useNavigate();
  const totalQuantity = useSelector(selectTotalQuantity);
  const [showModal, setShowModal] = useState(false);
  const [loginModal, setLoginModal] = useState(false);

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
  const {
    searchQuery,
    setSearchQuery,
    handleSearchInputChange,
    products,
    setSelectedCategory,
  } = context;
  // code for serach
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const focusSearchInput = () => {
    const searchInput = document.querySelector(".search-box");
    if (searchInput) {
      searchInput.focus();
    }
  };

  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("https://randomuser.me/api");
        const data = await response.json();
        const userData = data.results[0];

        const userName = ` ${userData.name.first} ${userData.name.last}`;
        const userImage = userData.picture.large;
        const userNumber = userData.cell;
        const userLocation = `${userData.location.country}, ${userData.location.state}`;

        setUser({
          name: userName,
          image: userImage,
          number: userNumber,
          location: userLocation,
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    if (searchQuery !== "") {
      setSelectedCategory("");

      const normalizedQuery = searchQuery
        .toLowerCase()
        .replace(/[^a-zA-Z0-9 ]/g, "");

      const suggestions = products.filter((product) => {
        product.product_name.toLowerCase().includes(searchQuery.toLowerCase());
        // Normalize the product name for comparison
        const normalizedProductName = product.product_name
          .toLowerCase()
          .replace(/[^a-zA-Z0-9 ]/g, "");
        return normalizedProductName.includes(normalizedQuery);
      });
      setSearchSuggestions(suggestions);
    } else {
      setSearchSuggestions([]);
    }
  }, [searchQuery, products]);

  const handleGoButton = () => {
    if (searchQuery !== "") {
      navigate("/products", { state: { data: searchSuggestions } });
    } else {
      navigate("/products");
    }
    setSearchSuggestions([]);
  };

  const handleSuggestionClick = (productName) => {
    setSearchQuery(productName);
  };

  const handleKeyPress = (event, productName) => {
    if (event.key === "Enter") {
      handleGoButton();
    }
  };

  const handleUseCurrentLocation = () => {
    // Use browser geolocation API to get the current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await fetch(
              `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=AIzaSyCMG4GzxbEmqfSZ-uaDOhF55sgxi9sumc4`
            ); // Replace 'YOUR_API_KEY' with your actual API key
            const data = await response.json();
            if (data.results.length > 0) {
              const { components } = data.results[0];
              setAddress(components.road || "");
              setCity(
                components.city || components.town || components.village || ""
              );
              setPincode(components.postcode || "");
              setTownDistrict(components.town || components.district || "");
              setState(components.state || "");
            }
          } catch (error) {}
        },
        (error) => {
          return;
        }
      );
    } else {
    }
  };

 

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

            <Button
              className=" search-btn"
              variant="outline-success"
              onClick={handleGoButton}
            >
              Go
            </Button>
            <div
              className="suggestion position-absolute"
              style={{ width: "760px" }}
            >
              <div
                className="container position-absolute"
                style={{
                  marginLeft: "165px",
                  marginTop: "20px",
                  background: "rgb(217, 223, 175",
                }}
              >
                {searchSuggestions.map((suggestion) => (
                  <div
                    key={suggestion.product_id}
                    onKeyDown={(event) =>
                      handleKeyPress(event, suggestion.product_name)
                    }
                    tabIndex={0}
                  >
                    <span
                      style={{ cursor: "Pointer" }}
                      onClick={() =>
                        handleSuggestionClick(suggestion.product_name)
                      }
                    >
                      <span className="py-2 px-2 m-1 fs-6">
                        {suggestion.product_name}
                      </span>
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <Nav>
              <NavDropdown
                title={login}
                id="collasible-nav-dropdown"
                className="Dropdown"
              >
                <NavDropdown.Item>
                  <div
                    onClick={() => setShowModal(true)}
                    style={{ color: "blue" }}
                  >
                    SignUp
                  </div>
                  {showModal && (
                    <Modal
                      show={showModal}
                      onHide={() => {
                        setShowModal(false);
                        setShowOTP(false);
                      }}
                      // dialogClassName="modal-90w"
                      aria-labelledby="example-custom-modal-styling-title"
                    >
                      <Modal.Body
                        className="p-0  d-flex w-max flex-lg-row flex-column "
                        style={{ minWidth: "22rem" }}
                      >

                        <SignUp />
                        
                        
                      </Modal.Body>
                    </Modal>
                  )}
                </NavDropdown.Item>

                {/* Shubham-  Desktop Login Modal starts here */}

                <NavDropdown.Item>
                  <div
                    onClick={() => setLoginModal(true)}
                    style={{ color: "blue" }}
                  >
                    Login
                  </div>

                  {/* Login Modal */}
                  <Modal
                    show={loginModal}
                    onHide={() => setLoginModal(false)}
                    aria-labelledby="example-custom-modal-styling-title"
                  >
                    <Modal.Body
                      className="p-0 rounded-4 d-flex w-max "
                      style={{ minWidth: "22rem" }}
                    >
                      <Login closeLoginModal={() => setLoginModal(false)} />
                    </Modal.Body>
                  </Modal>
                </NavDropdown.Item>

                {/* Shubham- Desktop Login modal ends here */}

                <NavDropdown.Divider />

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
              <Link
                to="/orders"
                className="nav-link text-decoration-none text-dark"
              >
                Orders
              </Link>

              {/* <Link to="/cart" className='text-secondary' style={{ fontSize: '33px', margin: '-5.8% 0 0 0' }}><BiCartAlt /></Link> */}
              <Link
                to="/cart"
                className="text-secondary position-relative   "
                style={{
                  textDecoration: "none",
                  width: "50px",
                }}
              >
                <div className=" w-100 h-100 position-relative d-flex flex-column justify-content-end align-items-center">
                  <img
                    src={cartIcon}
                    alt="Cart"
                    className="w-100 "
                    style={{ height: "35px" }}
                  />
                  <h6
                    className=" w-100  position-absolute text-center "
                    style={{ top: "3px", left: "3px", fontSize: "14px" }}
                  >
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

            <Button
              className=" search-btn"
              variant="outline-success"
              onClick={handleGoButton}
            >
              Go
            </Button>
            <div
              className="suggestion position-absolute"
              style={{ width: "350px" }}
            >
              <div
                className="container position-absolute"
                style={{ marginTop: "50px", background: "rgb(217, 223, 175" }}
              >
                {searchSuggestions.map((suggestion) => (
                  <div
                    key={suggestion.product_id}
                    onKeyDown={(event) =>
                      handleKeyPress(event, suggestion.product_name)
                    }
                    tabIndex={0}
                  >
                    <span
                      style={{ cursor: "Pointer" }}
                      onClick={() =>
                        handleSuggestionClick(suggestion.product_name)
                      }
                    >
                      <span className=" px-2 m-1 fs-6">
                        {suggestion.product_name}
                      </span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Navbar>

      <Catlog />

      {/* Offcanvas Sidebar */}

      {/* Mobile view starts here */}

      <Offcanvas
        show={showOffcanvas}
        onHide={() => setShowOffcanvas(false)}
        placement="end"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Minitgo</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="d-flex flex-column justify-content-center align-items-center border-bottom py-4">
            <img
              src={user?.image}
              className="rounded rounded-circle border border-2 border-primary shadow shadow-2"
              width={60}
              height={60}
            />
            <h2>{user?.name}</h2>
            <h5>{user?.number}</h5>
            <p>
              <span className="fw-bold">Location:</span> {user?.location}
            </p>
          </div>
          {/* Sidebar content goes here */}
          <Row className="py-1">
            <Col className="col-6">
              <Nav className="flex-column w-100">
                <Link
                  to="/"
                  className="nav-link border-bottom"
                  onClick={() => setShowOffcanvas(false)}
                >
                  Home
                </Link>

                <Link
                  to="/about"
                  className="nav-link border-bottom"
                  onClick={() => setShowOffcanvas(false)}
                >
                  About
                </Link>

                <span
                    onClick={() => setShowModal(true)}
                    className="nav-link border-bottom"
                  >
                    SignUp
                  </span>

                {showModal && (
                    <Modal
                      show={showModal}
                      onHide={() => {
                        setShowModal(false);
                        setShowOTP(false);
                      }}
                      // dialogClassName="modal-90w"
                      aria-labelledby="example-custom-modal-styling-title"
                      
                    >
                     
                      <Modal.Body
                        className="p-0 d-flex w-max flex-lg-row flex-column  "
                        style={{ minWidth: "10rem", backgroundColor: "#fff5f5", }}
                      >
                          <Modal.Header closeButton/>

                        <SignUp />
                        
                        
                      </Modal.Body>
                    </Modal>
                  )}


                  
                {/* Shubham- Mobile Login Modal starts here */}

                <span
                  className="nav-link border-bottom"
                  onClick={() => setLoginModal(true)}
                >
                  Login
                </span>

                {/* Login Modal */}
                <Modal show={loginModal} onHide={() => setLoginModal(false)}>
                  <Modal
                    show={loginModal}
                    onHide={() => setLoginModal(false)}
                    aria-labelledby="example-custom-modal-styling-title"
                  >
                    <Modal.Body
                      className="p-0 rounded-4 d-flex w-max "
                      style={{ minWidth: "22rem" }}
                    >
                      <Login closeLoginModal={() => setLoginModal(false)} />
                    </Modal.Body>
                  </Modal>
                </Modal>
                {/* 
            Shubham- Mobible Login Modal ends here */}

                <Link
                  to="/"
                  className="nav-link border-bottom"
                  onClick={() => setShowOffcanvas(false)}
                >
                  Address change
                </Link>
              </Nav>
            </Col>
            <Col className="col-6">
              <Nav className="flex-column w-100">
                <Link
                  to="/orders"
                  className="nav-link border-bottom"
                  onClick={() => setShowOffcanvas(false)}
                >
                  Orders
                </Link>

                <Link
                  to="/cart"
                  className="nav-link border-bottom"
                  onClick={() => setShowOffcanvas(false)}
                >
                  Cart
                </Link>

                <Link
                  to="/feedback"
                  className="nav-link border-bottom"
                  onClick={() => setShowOffcanvas(false)}
                >
                  Feedback
                </Link>

                <Link
                  to="/checkout"
                  className="nav-link border-bottom"
                  onClick={() => setShowOffcanvas(false)}
                >
                  Checkout
                </Link>

                <Link
                  to="/products"
                  className="nav-link border-bottom"
                  onClick={() => setShowOffcanvas(false)}
                >
                  Products
                </Link>

                <Link
                  to="/category"
                  className="nav-link border-bottom"
                  onClick={() => setShowOffcanvas(false)}
                >
                  Category
                </Link>

                <Link
                  to="/accessories"
                  className="nav-link border-bottom"
                  onClick={() => setShowOffcanvas(false)}
                >
                  Accessories
                </Link>

                <Link
                  to="/connect"
                  className="nav-link border-bottom"
                  onClick={() => setShowOffcanvas(false)}
                >
                  Connect
                </Link>

                <Link
                  to="/contact"
                  className="nav-link border-bottom"
                  onClick={() => setShowOffcanvas(false)}
                >
                  Contact Us
                </Link>

                <Link
                  to="/blog"
                  className="nav-link border-bottom"
                  onClick={() => setShowOffcanvas(false)}
                >
                  Blog
                </Link>

                <Link
                  to="/updates"
                  className="nav-link border-bottom"
                  onClick={() => setShowOffcanvas(false)}
                >
                  Updates
                </Link>

                <Link
                  to="/add-blog"
                  className="nav-link border-bottom"
                  onClick={() => setShowOffcanvas(false)}
                >
                  Add Blog
                </Link>

                <Link
                  to="/partner"
                  className="nav-link border-bottom"
                  onClick={() => setShowOffcanvas(false)}
                >
                  Become a Partner
                </Link>

                <Link
                  to="returns"
                  className="nav-link border-bottom"
                  onClick={() => setShowOffcanvas(false)}
                >
                  Return Policy
                </Link>

                <Link
                  to="/help"
                  className="nav-link border-bottom"
                  onClick={() => setShowOffcanvas(false)}
                >
                  Help
                </Link>

                <Link
                  to="/near-me"
                  className="nav-link border-bottom"
                  onClick={() => setShowOffcanvas(false)}
                >
                  Find Near Me
                </Link>

                <Link
                  to="/profile"
                  className="nav-link border-bottom"
                  onClick={() => setShowOffcanvas(false)}
                >
                  Profile
                </Link>

                <Link
                  to="/clientregister"
                  className="nav-link border-bottom"
                  onClick={() => setShowOffcanvas(false)}
                >
                  Client Register
                </Link>

                <Link
                  to="/cdashboard"
                  className="nav-link border-bottom"
                  onClick={() => setShowOffcanvas(false)}
                >
                  Client Dashboard
                </Link>

                <Link
                  to="/increase"
                  className="nav-link border-bottom"
                  onClick={() => setShowOffcanvas(false)}
                >
                  Increase
                </Link>
              </Nav>
            </Col>
          </Row>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Header;
