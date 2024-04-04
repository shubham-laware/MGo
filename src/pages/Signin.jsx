import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Modal from "react-modal";
import Minitgo from "../components/images/minitgo.png";
import axios from "axios";
import { toast } from "react-toastify";

const modalStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 9999,
  },
  content: {
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    maxWidth: "500px",
    width: "100%",
    padding: "30px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.5)",
    borderRadius: "20px",
    boxSizing: "none",
    animation: "fade-in 0.5s",
  },
};

const closebtn = {
  border: "none",
  boxShadow: "0 0px 3px rgba(0, 0, 0, 0.5)",
  padding: "5px",
  borderRadius: "50px",
  color: "red",
  width: "35px",
};

const Login = ({ closeLoginModal }) => {
  // Shubham- Login functionality starts here

  const [rememberMe, setRememberMe] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [userid, setUserID] = useState("");
  const [password, setPassword] = useState("");

  const handleRememberMeChange = (event) => {
    setRememberMe(event.target.checked);
  };

  const handleForgotPassword = (event) => {
    event.preventDefault();
    setShowResetModal(true);
  };

  const handleResetEmailChange = (event) => {
    setResetEmail(event.target.value);
  };

  const handleResetPassword = (event) => {
    event.preventDefault();
    setShowResetModal(false);
  };

  const closeModal = () => {
    setShowResetModal(false);
    setResetEmail("");
  };

 

  function handleSubmit(e) {
    e.preventDefault();
    console.log(userid);
    console.log(password);
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phonePattern = /^[0-9]{7}$/;
    if (userid === "" || password === "") {
      // if (userid === "" ) {
      toast.error("All fields are required", {
        autoClose: 1000,
        hideProgressBar: true,
      });
      return;
    } else if (!emailPattern.test(userid) && !phonePattern.test(userid)) {
      toast.error("Please enter a valid email or phone number", {
        autoClose: 1000,
        hideProgressBar: true,
      });
      return;
    } else if (password.length < 8 || password.length > 12) {
      toast.error("Password must be between 8 and 12 characters long", {
        autoClose: 1000,
        hideProgressBar: true,
      });
      return;
    } else {
      console.log("USER ID:", userid);
      console.log("PASS:", password);

      const data = {
        email: userid,
        password: password,
      };
      axios
        .get("https://minitgo.com/api/fetch_login.php")
        .then((response) => {
          if (response.data && response.data.length > 0) {
            const allUsers = response.data;

            const foundUser = allUsers.find(
              (user) => user.email === data.email
            );

            if (foundUser) {
              // User with the provided email is found
              if (foundUser.password === data.password) {
                console.log("Login successful");
                closeLoginModal();
                toast.success("Login successfull", {
                  autoClose: 1000,
                  hideProgressBar: true,
                });


                const userData = {
                  fullName: foundUser.full_name,
                  phoneNumber: foundUser.phone_number,
                  email: foundUser.email,
                  address: foundUser.Address,
                  officeAddress: foundUser.office_address,
              };

                localStorage.setItem('user',JSON.stringify(userData));

                console.log('FOUNDUSER,',userData)

                setUserID("");
                setPassword("");
              } else {
                toast.error("Invalid Password", {
                  autoClose: 1000,
                  hideProgressBar: true,
                });
                console.log("Invalid password");
              }
            } else {
              toast.error('Invalid Email', {
                autoClose: 1000,
                hideProgressBar: true
            })
            }
          } else {
            toast.error('Server Error', {
              autoClose: 1000,
              hideProgressBar: true
          })
          }
        })
        .catch((error) => {
          console.error("Failed to fetch user information:", error);
        });
    }
  }

  // Shubham- Login Functionality ends here
  return (
    <>
      <br></br>

      <div className="col-md-12 ">
        <div className="card-b  px-4  py-5   m-0 ">
          <div className="text-center">
            <h4 style={{ fontWeight: "bold", fontSize: "30px" }}>Sign in</h4>
          </div>
          <div className="card-body  mt-4  ">
            <form>
              <div className="form-group mb-3">
                <label htmlFor="email" className="ps-1 mb-1">
                  Email or Phone
                </label>
                <input
                  type="email"
                  className="form-control rounded-5"
                  id="email"
                  onChange={(e) => setUserID(e.target.value)}
                  placeholder="Enter email or phone"
                />
              </div>
              <div className="form-group ">
                <label htmlFor="password" className="ps-1 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control rounded-5"
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                />
              </div>
              <div className="form-check c-box mb-2 mt-3 ">
                <input
                  type="checkbox"
                  className="form-check-input "
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={handleRememberMeChange}
                />
                <label className="form-check-label  " htmlFor="rememberMe">
                  Keep me logged in
                </label>
              </div>
              <div className=" d-flex justify-content-center">
                <button
                  type="submit"
                  className="btn btn-primary btn-l px-5 rounded-5"
                  onClick={handleSubmit}
                >
                  Login
                </button>
              </div>

              <div className="fs-6 d-flex justify-content-center">
                <a
                  href="#"
                  onClick={handleForgotPassword}
                  className="forgot-password-link"
                >
                  Forgot Password?
                </a>
                <a href="/register" className="forgot-password-link">
                  Create an Account!
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>

      <Modal
        isOpen={showResetModal}
        onRequestClose={closeModal}
        contentLabel="Reset Password"
        style={modalStyles}
      >
        <div className="modal-header ">
          <h5 className="modal-title">Reset Password</h5>
          <button
            type="button"
            style={closebtn}
            onClick={closeModal}
            aria-label="Close"
          >
            <span aria-hidden="true">X</span>
          </button>
        </div>
        <div className="modal-body">
          <form onSubmit={handleResetPassword}>
            <div className="form-group">
              <label htmlFor="resetEmail">Email address</label>
              <input
                type="email"
                className="form-control"
                id="resetEmail"
                placeholder="Enter email"
                value={resetEmail}
                onChange={handleResetEmailChange}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Send Confirmation Code
            </button>
          </form>
        </div>
      </Modal>

      <br></br>
      <br></br>
      <br></br>
    </>
  );
};

export default Login;
