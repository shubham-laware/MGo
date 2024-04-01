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
import { toast } from "react-toastify";
import { Col, Modal, Row } from "react-bootstrap";

import { IoHome } from "react-icons/io5";
import { FaCircleInfo, FaUserPlus, FaListCheck } from "react-icons/fa6";
import { FiLogIn } from "react-icons/fi";
import { MdContactSupport, MdHelp, MdOutlineUpdate } from "react-icons/md";
import { BsPersonCircle } from "react-icons/bs";
import { PiHandshakeBold } from "react-icons/pi";
import { ImUserPlus } from "react-icons/im";

import "./header.css";
import axios from "axios";

function Header() {
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [townDistrict, setTownDistrict] = useState("");
  const [state, setState] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [addresss, setAddresss] = useState("");
  const [password, setPassword] = useState("");

  const handleSnackbarClose = () => {
    setShowSnackbar(false);
  };

  const [showOTP, setShowOTP] = useState(false);
  const [timer, setTimer] = useState(30);
  const [sendOTPagain, setSendOTPagain] = useState(false);

  useEffect(() => {
    let intervalId;

    if (showOTP && sendOTPagain) {
      intervalId = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer === 1) {
            // Stop the timer and reset sendOTPagain after 30 seconds
            clearInterval(intervalId);
            setSendOTPagain(false);
            return 30; // Reset the timer back to 30
          }
          return prevTimer - 1;
        });
      }, 1000);
    }

    return () => {
      clearInterval(intervalId); // Clear the interval when the component unmounts
    };
  }, [showOTP, sendOTPagain]);

  function handleSendOTPAgain() {
    setSendOTPagain(true);
    toast.success("OTP sent successfully", {
      autoClose: 1000,
      hideProgressBar: true,
    });
  }

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

  function handleRegister() {
    const emailPattern = /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/;
    const phonePattern = /^[0-9]{10}$/;

    if (
      fullName === "" ||
      phoneNumber === "" ||
      email === "" ||
      addresss === "" ||
      password === ""
    ) {
      toast.error("All fields are required", {
        autoClose: 1000,
        hideProgressBar: true,
      });
      return;
    } else if (!phonePattern.test(phoneNumber)) {
      toast.error("Please enter a valid phone number", {
        autoClose: 1000,
        hideProgressBar: true,
      });
      return;
    } else if (!emailPattern.test(email)) {
      toast.error("Please enter a valid email", {
        autoClose: 1000,
        hideProgressBar: true,
      });
      return;
    } else if (password.length < 6 || password.length > 8) {
      toast.error("Password must be between 6 and 8 characters long", {
        autoClose: 1000,
        hideProgressBar: true,
      });
      return;
    } else {
      const data = {
        full_name: fullName,
        phone_number: phoneNumber,
        email: email,
        password: password,
        address: addresss,
      };

      axios
        .post(
          "https://minitgo.com/api/fetch_login.php",
          JSON.stringify(data),
          {}
        )
        .then((response) => {
          if (response.data && response.data.length > 0) {
            const user = response.data[0];
            console.log("Login successful. User:", user);
            if (user) {
              handleOTP();
            }
          } else {
            console.error("Login failed: No user data returned.");
          }
        })
        .catch((error) => {
          console.error("Login failed:", error);
        });
    }
  }

  function handleOTP() {
    setTimer(30);
    setShowOTP(true);
    setSendOTPagain(true);
    toast.success("OTP sent successfully", {
      autoClose: 1000,
      hideProgressBar: true,
    });
  }

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

      {"Modal needs to be outside to be loaded in the mobile version"}
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
            className="p-0  d-flex w-max  "
            style={{ minWidth: "22rem" }}
          >
            {showOTP ? (
              <div
                className="d-flex flex-column gap-2 pt-2 pb-3 ps-5    "
                style={{
                  width: "70vw",
                  backgroundColor: "#fff5f5",
                }}
              >
                <div
                  onClick={() => setShowOTP(false)}
                  className="fs-3 px-1"
                  style={{
                    cursor: "pointer",
                    position: "relative",
                    bottom: "0.5rem",
                    right: "2rem",
                  }}
                >
                  ←
                </div>
                <h2 className="text-start ">OTP Verification</h2>
                <p>OTP has sent to +{phoneNumber}</p>
                <ul
                  className="d-flex gap-2 justify-content-start ps-1"
                  style={{ listStyle: "none" }}
                >
                  <input
                    type="text"
                    className="p-1 rounded-pill border text-center"
                    style={{ width: "30px", outline: "none" }}
                    maxLength={1}
                    onKeyDown={(e) => {
                      if (
                        e.key === "Backspace" &&
                        e.target.previousElementSibling
                      ) {
                        if (e.target.value === "") {
                          e.target.previousElementSibling.focus();
                        }
                      } else if (
                        e.key.length === 1 &&
                        e.target.nextElementSibling
                      ) {
                        if (e.target.value !== "") {
                          e.target.nextElementSibling.focus();
                        }
                      }
                    }}
                  />

                  <input
                    type="text"
                    className="p-1 rounded-pill border text-center"
                    style={{ width: "30px", outline: "none" }}
                    maxLength={1}
                    onKeyDown={(e) => {
                      if (
                        e.key === "Backspace" &&
                        e.target.previousElementSibling
                      ) {
                        if (e.target.value === "") {
                          e.target.previousElementSibling.focus();
                        }
                      } else if (
                        e.key.length === 1 &&
                        e.target.nextElementSibling
                      ) {
                        if (e.target.value !== "") {
                          e.target.nextElementSibling.focus();
                        }
                      }
                    }}
                  />

                  <input
                    type="text"
                    className="p-1 rounded-pill border text-center"
                    style={{ width: "30px", outline: "none" }}
                    maxLength={1}
                    onKeyDown={(e) => {
                      if (
                        e.key === "Backspace" &&
                        e.target.previousElementSibling
                      ) {
                        if (e.target.value === "") {
                          e.target.previousElementSibling.focus();
                        }
                      } else if (
                        e.key.length === 1 &&
                        e.target.nextElementSibling
                      ) {
                        if (e.target.value !== "") {
                          e.target.nextElementSibling.focus();
                        }
                      }
                    }}
                  />

                  <input
                    type="text"
                    className="p-1 rounded-pill border text-center"
                    style={{ width: "30px", outline: "none" }}
                    maxLength={1}
                    onKeyDown={(e) => {
                      if (
                        e.key === "Backspace" &&
                        e.target.previousElementSibling
                      ) {
                        if (e.target.value === "") {
                          e.target.previousElementSibling.focus();
                        }
                      } else if (
                        e.key.length === 1 &&
                        e.target.nextElementSibling
                      ) {
                        if (e.target.value !== "") {
                          e.target.nextElementSibling.focus();
                        }
                      }
                    }}
                  />

                  <input
                    type="text"
                    className="p-1 rounded-pill border text-center"
                    style={{ width: "30px", outline: "none" }}
                    maxLength={1}
                    onKeyDown={(e) => {
                      if (
                        e.key === "Backspace" &&
                        e.target.previousElementSibling
                      ) {
                        if (e.target.value === "") {
                          e.target.previousElementSibling.focus();
                        }
                      } else if (
                        e.key.length === 1 &&
                        e.target.nextElementSibling
                      ) {
                        if (e.target.value !== "") {
                          e.target.nextElementSibling.focus();
                        }
                      }
                    }}
                  />

                  <input
                    type="text"
                    className="p-1 rounded-pill border text-center"
                    style={{ width: "30px", outline: "none" }}
                    maxLength={1}
                    onKeyDown={(e) => {
                      if (
                        e.key === "Backspace" &&
                        e.target.previousElementSibling
                      ) {
                        if (e.target.value === "") {
                          e.target.previousElementSibling.focus();
                        }
                      } else if (
                        e.key.length === 1 &&
                        e.target.nextElementSibling
                      ) {
                        if (e.target.value !== "") {
                          e.target.nextElementSibling.focus();
                        }
                      }
                    }}
                  />
                </ul>

                <div className="mt-3">
                  <div className=" w-75 text-center fs-3">00:{timer}</div>
                </div>

                <div className="mt-2  ">
                  <div
                    className=" w-75 text-center"
                    style={{ fontSize: "14px" }}
                  >
                    Didn't get it?
                  </div>
                </div>

                <div className="">
                  <div className=" w-75 text-center ">
                    <p
                      className="underline"
                      style={{
                        textDecoration: "underline",
                        cursor: "pointer",
                      }}
                      onClick={handleSendOTPAgain}
                    >
                      Send OTP (SMS)
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div
                style={{
                  width: "70vw",
                  backgroundColor: "#fff5f5",
                }}
                className="d-flex flex-column gap-2 px-4 pt-5 pb-3   "
              >
                <Form>
                  <Form.Control
                    type="text"
                    placeholder="Full Name"
                    className=" w-100 px-4 mb-3 my-5 rounded rounded-pill"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                  <Form.Control
                    type="text"
                    placeholder="+91"
                    className=" w-100 px-4 mb-3 rounded rounded-pill"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                  <Form.Control
                    type="text"
                    placeholder="Email"
                    className=" w-100 px-4 mb-4  rounded rounded-pill"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Form.Control
                    type="text"
                    placeholder="Address"
                    className=" w-100 px-4 mb-3 rounded rounded-pill"
                    value={addresss}
                    onChange={(e) => setAddresss(e.target.value)}
                  />
                  <Form.Control
                    type="text"
                    placeholder="Password"
                    className=" w-100 px-4 mb-3 rounded rounded-pill"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form>
                <Button variant="secondary" onClick={handleUseCurrentLocation}>
                  Use Current Location
                </Button>

                <Button
                  variant="success"
                  className="my-2"
                  onClick={handleRegister}
                >
                  Continue
                </Button>
                <p style={{ marginTop: "10px" }} className="text-center">
                  By continuing, you agree to our <br />
                  <a
                    target="_blank"
                    href="#"
                    className="text-danger fw-semibold"
                    style={{
                      textDecoration: "none",
                    }}
                  >
                    Terms of Service
                  </a>
                  . &{" "}
                  <a
                    target="_blank"
                    href="#"
                    className="text-danger fw-semibold"
                    style={{
                      textDecoration: "none",
                    }}
                  >
                    Privacy Policy
                  </a>
                </p>
              </div>
            )}
            <div
              style={{ backgroundColor: "#e3e3e3" }}
              className="d-flex flex-column justify-content-center align-items-center px-3"
            >
              <h1 className="fs-5 text-center mb-5">
                Our app will be launching soon.
              </h1>
              {/* <img
                            src="appstore.png"
                            alt="App Store"
                            className="my-0"
                          />
                          <img src="playstore.png" alt="Play Store" /> */}

              <a
                className="download-btn btn-google"
                href="#"
                style={{ width: "9.5rem" }}
                title="Google Play"
              >
                Google Play
              </a>
              <a
                className="download-btn btn-apple"
                href="#"
                style={{ width: "9.5rem" }}
                title="App Store"
              >
                App Store
              </a>
            </div>
          </Modal.Body>
        </Modal>
      )}

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

      {/* Offcanvas Sidebar */}

      {/* Mobile view starts here */}

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
          <div className="d-flex flex-column justify-content-center align-items-center border rounded  py-4 my-2">
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
                  onClick={() => setShowOffcanvas(false)}
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

                <span
                  className="border-bottom py-3 fw-semibold px-2"
                  style={{
                    textDecoration: "none",
                    color: "black",
                  }}
                  onClick={() => {
                    setShowOffcanvas(false);
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
                </span>
                {/* Shubham- Mobile Login Modal starts here */}

                <span
                  className="border-bottom py-3 fw-semibold px-2"
                  style={{
                    textDecoration: "none",
                    color: "black",
                  }}
                  onClick={() => {
                    setShowOffcanvas(false);
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
                </span>

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
                  to="/cart"
                  className="border-bottom py-3 fw-semibold px-2"
                  style={{
                    textDecoration: "none",
                    color: "black",
                  }}
                  onClick={() => setShowOffcanvas(false)}
                >
                  <FaCartShopping
                    className="me-3 "
                    style={{
                      width: "1.3rem",
                      height: "1.3rem",
                      color: "#E4AAAA",
                    }}
                  />
                  Cart
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
                  to="/profile"
                  className="border-bottom py-3 fw-semibold px-2"
                  style={{
                    textDecoration: "none",
                    color: "black",
                  }}
                  onClick={() => setShowOffcanvas(false)}
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
    </>
  );
}

export default Header;
