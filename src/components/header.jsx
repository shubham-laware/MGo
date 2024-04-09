import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import { FaLocationDot } from "react-icons/fa6";

import Form from "react-bootstrap/Form";
import Navbar from "react-bootstrap/Navbar";
import { Link, useLocation } from "react-router-dom";
import NavDropdown from "react-bootstrap/NavDropdown";
import "bootstrap/dist/css/bootstrap.css";
import Logo from "../components/images/minitgo.png";
import {
  FaBox,
  FaCartShopping,
  FaCommentDots,
  FaLink,
  FaLocationCrosshairs,
  FaRegNewspaper,
} from "react-icons/fa6";
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
import { Col, Modal, Row } from "react-bootstrap";
import SignUp from "../pages/SignUp.jsx";

import { IoHome } from "react-icons/io5";
import { FaCircleInfo, FaUserPlus, FaListCheck } from "react-icons/fa6";
import { FiLogIn } from "react-icons/fi";
import { MdContactSupport, MdHelp, MdOutlineUpdate } from "react-icons/md";
import { BsPersonCircle } from "react-icons/bs";
import { PiHandshakeBold } from "react-icons/pi";

import "./header.css";
import ResetPassword from "./ResetPassword.jsx";

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
  const [showLeftSideOffcanvas, setShowLeftSideOffcanvas] = useState(false);

  // context code add
  const context = useContext(myContext);
  const {
    searchQuery,
    setSearchQuery,
    handleSearchInputChange,
    products,
    setSelectedCategory,
    showModal,
    setShowModal,
    forgetPasswordModal
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
        const userNumber = userData.cell;
        const userLocation = `${userData.location.country}, ${userData.location.state}`;

        const responseAvatar = await fetch(
          `https://ui-avatars.com/api/?name=${userName}&background=FFCCBC`
        );
        const dataAvatar = await responseAvatar.blob();
        const userImage = URL.createObjectURL(dataAvatar);

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

  const locationState = useLocation();
  const openLoginModal = locationState?.state?.openLoginModal;

  useEffect(() => {
    if (openLoginModal) {
      setLoginModal(true);
    }
  }, [openLoginModal]);

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
          } catch (error) { }
        },
        (error) => {
          return;
        }
      );
    } else {
    }
  };

  const userData = JSON.parse(localStorage.getItem("user"));

  const fullName = userData ? userData.fullName : null;
  const userLocation = userData ? userData.address : null;
  const phoneNumber = userData ? userData.phoneNumber : null;

  function getInitials(fullName) {
    return fullName
      .split(" ")
      .map((name) => name.charAt(0))
      .join("");
  }
  const login = fullName ? (
    fullName
  ) : (
    <span>
      <BiLogIn /> Signin
    </span>
  );

  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        className="fixed-top bg-light shadow"
      >
        <Container className="justify-content-between">
          <Navbar.Brand className="d-flex gap-2">
            <Link to="/">
              <img src={Logo} style={{ width: "90px" }} />
            </Link>
            <div className="mobile-menu-logo d-lg-none d-flex profile-data">
              <span
                className="profile d-flex align-items-center "
                onClick={() => setShowLeftSideOffcanvas(true)}
              >
                <img
                  src="https://cdn.pixabay.com/photo/2017/06/13/12/53/profile-2398782_640.png"
                  style={{ height: "20px", width: "20px" }}
                />
              </span>
              {fullName && (
                <div className="userData mx-2  d-flex flex-column">
                  <span style={{ fontSize: "10px" }}>{fullName}</span>
                  <span style={{ fontSize: "10px" }}>
                    {/* Delivered to-only13char */}
                    {/* Delivered to- {userLocation?.length > 20 ? userLocation?.substring(0, 13) + '...' : userLocation} */}
                    <div className="d-flex">
                      {userLocation && userLocation.length > 0 && ( 
                        <>
                          <FaLocationDot className="fs-5 p-1" />
                          <span style={{ fontSize: '12px' }}>
                            {userLocation.length > 20 ? userLocation.substring(0, 13) + '...' : userLocation}
                          </span>
                        </>
                      )}
                    </div>

                  </span>
                </div>
              )}

            </div>
          </Navbar.Brand>

          {/* for mobile vieww */}
          <div className="mobile-menu-logo d-lg-none d-flex gap-2 align-items-center">
            <Link
              to="/cart" style={{ color: "#000" }}>
              <div
                className="nav-link cat-nav d-lg-none d-block text-center "
                style={{ position: "relative" }}
              >
                <img
                  src={cartIcon}
                  alt="Cart"
                  style={{ height: "2rem", width: "2rem" }}
                />
                <h6
                  style={{ position: "absolute", top: "0.5rem", left: "1.6rem" }}
                >
                  {totalQuantity}
                </h6>
              </div>
            </Link>

            <BiMenuAltRight
              className="mobile-menu-logo d-lg-none"
              onClick={() => setShowOffcanvas(true)}
              style={{ fontSize: "33px" }}
            />
          </div>

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
                {fullName && (
                  <>
                    <NavDropdown.Item>
                      <Link to="/profile" className="text-decoration-none ">
                        {" "}
                        Profile{" "}
                      </Link>
                    </NavDropdown.Item>
                    <NavDropdown.Item>
                      <Link to="/profile" className="text-decoration-none ">
                        {" "}
                        Address change{" "}
                      </Link>
                    </NavDropdown.Item>
                  </>
                )}
                {fullName ? (
                  <NavDropdown.Item>
                    <div
                      onClick={() => {
                        localStorage.removeItem("user");
                        window.location.reload();
                      }}
                      style={{ color: "red" }}
                    >
                      <BiLogIn className="me-2" />
                      Logout
                    </div>
                  </NavDropdown.Item>
                ) : (
                  <>
                    <NavDropdown.Item>
                      <div
                        onClick={() => setShowModal(true)}
                        style={{ color: "blue" }}
                      >
                        SignUp
                      </div>
                    </NavDropdown.Item>

                    <NavDropdown.Item>
                      <div
                        onClick={() => setLoginModal(true)}
                        style={{ color: "blue" }}
                      >
                        Login
                      </div>
                    </NavDropdown.Item>
                  </>
                )}

                {/* Shubham- Desktop Login modal ends here */}

                <NavDropdown.Divider />
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
                <div className=" w-100 h-100 position-relative d-flex flex-column justify-content-center align-items-center">
                  <img
                    src={cartIcon}
                    alt="Cart"
                    className="w-100 mx-auto "

                    style={{ height: "35px" }}
                  />
                  <h6
                    className=" w-100  position-absolute text-center "
                    id="cartNo"
                    style={{ top: "3px", left: "1px", fontSize: "14px" }}
                  >
                    {totalQuantity}
                  </h6>
                </div>
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
        <div className="mobile-menu-logo d-lg-none">
          <div className="mobile-search mt-2">
            <Form.Control
              type="search"
              placeholder="Ex: T-Shirt near me"
              className="col-12 search-box"
              aria-label="Search"
              value={searchQuery}
              onChange={handleSearchInputChange}
              onKeyPress={handleKeyPress}
              style={{ width: "123%" }}
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

      {showModal && (
        <Modal
          show={showModal}
          onHide={() => {
            setShowModal(false);
          }}
          // dialogClassName="modal-90w"
          aria-labelledby="example-custom-modal-styling-title"
          className="p-0"
        >
          <Modal.Body
            className="p-0 d-flex w-max flex-lg-row flex-column  "
            style={{ minWidth: "10rem", backgroundColor: "#fff5f5" }}
          >
            <Modal.Header closeButton className="d-block d-lg-none" />

            <SignUp />
          </Modal.Body>
        </Modal>
      )}

      {/* Login Modal */}

      <Modal
        show={loginModal}
        onHide={() => setLoginModal(false)}
        aria-labelledby="example-custom-modal-styling-title"
        className=" bg-opacity"
      >
        <Modal.Body
          className="p-0 rounded-4 d-flex w-max "
          style={{ minWidth: "22rem" }}
        >

          <Login closeLoginModal={() => setLoginModal(false)}  />
        </Modal.Body>
      </Modal>

      {
        forgetPasswordModal && (
          <ResetPassword  setLoginModal={()=>setLoginModal(true)}/>
        )
      }
     

      {/* Offcanvas Sidebar */}

      {/* Mobile view starts here */}

      {/* this is right side */}
      <Offcanvas
        show={showOffcanvas}
        onHide={() => setShowOffcanvas(false)}
        placement="end"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <img
              src="/src/components/images/minitgo.png"
              width={100}
              height={20}
            />
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="d-flex flex-column justify-content-center align-items-center border rounded   my-2 " style={{ height: '150px' }}>
            <img src="man-working.jpg" alt="IMG" className="w-100 h-100" />
          </div>
          {/* Sidebar content goes here */}

          <Row className="py-1">
            <Col className="col-6">
              <Nav className="flex-column w-100">
                <Link
                  to="/"
                  className="border-bottom py-3 fw-semibold px-2"
                  style={{
                    textDecoration: "none",
                    color: "black",
                  }}
                  onClick={() => setShowOffcanvas(false)}
                >
                  <IoHome
                    className="me-3 "
                    style={{
                      width: "1.3rem",
                      height: "1.3rem",
                      color: "#E4AAAA",
                    }}
                  />
                  Home
                </Link>

                <Link
                  to="/about"
                  className="border-bottom py-3 fw-semibold px-2"
                  style={{
                    textDecoration: "none",
                    color: "black",
                  }}
                  onClick={() => setShowOffcanvas(true)}
                >
                  <FaCircleInfo
                    className="me-3 "
                    style={{
                      width: "1.3rem",
                      height: "1.3rem",
                      color: "#E4AAAA",
                    }}
                  />
                  About
                </Link>

                <Link
                  to="/orders"
                  className="border-bottom py-3 fw-semibold px-2"
                  style={{
                    textDecoration: "none",
                    color: "black",
                  }}
                  onClick={() => setShowOffcanvas(false)}
                >
                  <FaListCheck
                    className="me-3 "
                    style={{
                      width: "1.3rem",
                      height: "1.3rem",
                      color: "#E4AAAA",
                    }}
                  />
                  Orders
                </Link>

                <Link
                  to="/products"
                  className="border-bottom py-3 fw-semibold px-2"
                  style={{
                    textDecoration: "none",
                    color: "black",
                  }}
                  onClick={() => setShowOffcanvas(false)}
                >
                  <FaBox
                    className="me-3 "
                    style={{
                      width: "1.3rem",
                      height: "1.3rem",
                      color: "#E4AAAA",
                    }}
                  />
                  Products
                </Link>

                <Link
                  to="/contact"
                  className="border-bottom py-3 fw-semibold px-2"
                  style={{
                    textDecoration: "none",
                    color: "black",
                  }}
                  onClick={() => setShowOffcanvas(false)}
                >
                  <MdContactSupport
                    className="me-3 "
                    style={{
                      width: "1.3rem",
                      height: "1.3rem",
                      color: "#E4AAAA",
                    }}
                  />
                  Contact Us
                </Link>
              </Nav>
            </Col>
            <Col className="col-6">
              <Nav className="flex-column w-100">
                <Link
                  to="/connect"
                  className="border-bottom py-3 fw-semibold px-2"
                  style={{
                    textDecoration: "none",
                    color: "black",
                  }}
                  onClick={() => setShowOffcanvas(false)}
                >
                  <FaLink
                    className="me-3 "
                    style={{
                      width: "1.3rem",
                      height: "1.3rem",
                      color: "#E4AAAA",
                    }}
                  />
                  Connect
                </Link>

                <Link
                  to="/feedback"
                  className="border-bottom py-3 fw-semibold px-2"
                  style={{
                    textDecoration: "none",
                    color: "black",
                  }}
                  onClick={() => setShowOffcanvas(false)}
                >
                  <FaCommentDots
                    className="me-3 "
                    style={{
                      width: "1.3rem",
                      height: "1.3rem",
                      color: "#E4AAAA",
                    }}
                  />
                  Feedback
                </Link>
                <Link
                  to="/blog"
                  className="border-bottom py-3 fw-semibold px-2"
                  style={{
                    textDecoration: "none",
                    color: "black",
                  }}
                  onClick={() => setShowOffcanvas(false)}
                >
                  <FaRegNewspaper
                    className="me-3 "
                    style={{
                      width: "1.3rem",
                      height: "1.3rem",
                      color: "#E4AAAA",
                    }}
                  />
                  Blog
                </Link>

                <Link
                  to="/updates"
                  className="border-bottom py-3 fw-semibold px-2"
                  style={{
                    textDecoration: "none",
                    color: "black",
                  }}
                  onClick={() => setShowOffcanvas(false)}
                >
                  <MdOutlineUpdate
                    className="me-3 "
                    style={{
                      width: "1.3rem",
                      height: "1.3rem",
                      color: "#E4AAAA",
                    }}
                  />
                  Updates
                </Link>

                <Link
                  to="/partner"
                  className="border-bottom py-3 fw-semibold px-2"
                  style={{
                    textDecoration: "none",
                    color: "black",
                  }}
                  onClick={() => setShowOffcanvas(false)}
                >
                  <PiHandshakeBold
                    className="me-3 "
                    style={{
                      width: "1.3rem",
                      height: "1.3rem",
                      color: "#E4AAAA",
                    }}
                  />
                  Become a Partner
                </Link>

                <Link
                  to="/help"
                  className="border-bottom py-3 fw-semibold px-2"
                  style={{
                    textDecoration: "none",
                    color: "black",
                  }}
                  onClick={() => setShowOffcanvas(false)}
                >
                  <MdHelp
                    className="me-3 "
                    style={{
                      width: "1.3rem",
                      height: "1.3rem",
                      color: "#E4AAAA",
                    }}
                  />
                  Help
                </Link>
              </Nav>
            </Col>
          </Row>
        </Offcanvas.Body>
      </Offcanvas>

      {/* this is left side */}
      <Offcanvas
        show={showLeftSideOffcanvas}
        onHide={() => setShowLeftSideOffcanvas(false)}
        placement="start"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <img
              src="/src/components/images/minitgo.png"
              width={100}
              height={20}
            />
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {fullName && (
            <div className="d-flex flex-column justify-content-center align-items-center border rounded  py-4 my-2">

              <div
                className="rounded rounded-circle border border-2 border-primary "
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "1.5rem",
                  height: '60px',
                  width: '60px'
                }}>
                {getInitials(fullName)}
              </div>

              <h2 className="mt-2">{fullName}</h2>
              <h5>{phoneNumber}</h5>
              <p>
                <span className="fw-bold">Location:</span> {userLocation}
              </p>
            </div>
          )}

          {/* Sidebar content goes here */}
          <div className="btn-block">
            {fullName && <></>}

            {fullName ? (
              <div >
                <div className=" py-3 px-2 w-100 ">
                  <Link
                    to="/profile"
                    className="border-bottom py-3 fw-semibold  d-block w-100 "
                    style={{
                      textDecoration: "none",
                      color: "black",
                    }}
                    onClick={() => setShowLeftSideOffcanvas(false)}
                  >
                    <BsPersonCircle
                      className="me-3 "
                      style={{
                        width: "1.3rem",
                        height: "1.3rem",
                        color: "#E4AAAA",
                      }}
                    />
                    Profile
                  </Link>
                </div>

                <div
                  onClick={() => {
                    localStorage.removeItem("user");
                    window.location.reload();
                  }}
                  style={{ color: "red" }}
                  className=" py-3 px-2"
                >
                  <BiLogIn className="me-3" />
                  Logout
                </div>
              </div>
            ) : (
              <>
                <div
                  className="border-bottom py-3 fw-semibold px-2 "
                  style={{
                    textDecoration: "none",
                    color: "black",
                  }}
                  onClick={() => {
                    setShowLeftSideOffcanvas(false);
                    setShowModal(true);
                    console.log(true, showModal);
                  }}
                >
                  <FaUserPlus
                    className="me-3 "
                    style={{
                      width: "1.3rem",
                      height: "1.3rem",
                      color: "#E4AAAA",
                    }}
                  />
                  SignUp
                </div>

                <div
                  className="border-bottom py-3 fw-semibold px-2  "
                  style={{
                    textDecoration: "none",
                    color: "black",
                  }}
                  onClick={() => {
                    setShowLeftSideOffcanvas(false);
                    setLoginModal(true);
                  }}
                >
                  <FiLogIn
                    className="me-3 "
                    style={{
                      width: "1.3rem",
                      height: "1.3rem",
                      color: "#E4AAAA",
                    }}
                  />
                  Login
                </div>
              </>
            )}
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Header;
