import React, { useContext,useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Add from "./images/shop.jpg";
import { BiInfoCircle } from "react-icons/bi";
import myContext from "./context/MyContext";
import ad from '../assets/adImage.png'
import ads1 from '../assets/ads1.png'


/* banner */
export default function Banner() {
  const context = useContext(myContext);
  const {  notSignin,setNotSignin  } = context;
  const [showAd, setShowAd] = useState(true);
  const [timer, setTimer] = useState(20);
  const [canClose, setCanClose] = useState(false);




  const navigate = useNavigate();

  function handleNavigateToProducts() {
    navigate("/products");
    // setSearchQuery("");
  }
  useEffect(() => {
    if (showAd && timer > 0) {
      const countdown = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000); // Update the timer every second

      // Clean up the interval when the component unmounts or when the ad is closed
      return () => clearInterval(countdown);
    } else {
      setCanClose(true); // Enable the close button when the timer completes
    }
  }, [showAd, timer]);

 
  function closeAd() {
    setShowAd(false);
  }


  return (
    <>
    
      <div className="container" style={{ marginTop: "15px" }}>

        <Row>
       
          <div className="custom-bg ">
            <Col className="left-box ">
              <br></br>
              <h1 className="typing-text">
                Get Delivery In{" "}
                <span className="" style={{ color: "#5F6D79" }}>
                  {" "}
                  <br></br>Minutes
                </span>{" "}
                <span className="cursor">&nbsp;</span>
              </h1>
              <br></br>
              <Button className="buynow" onClick={handleNavigateToProducts}>
                Buy now{" "}
              </Button>
              <Button className="find-btn" onClick={handleNavigateToProducts}>
                Find near me
              </Button>

              <p>
                {" "}
                <BiInfoCircle style={{ fontSize: "10pt" }} /> Get the products
                from nearest & trusted stores
              </p>
            </Col>
            <Col xs={6} sm={6} className="right-box">
              <img className="imgs " src={Add}  />
            </Col>
          </div>
        </Row>
      </div>
      <br></br>
      <div className="container-fluid">

      {notSignin && showAd && (
        <div className="row justify-content-center">
          <div className="col-md-10 position-relative" style={{ width: 'max-content' }}>
            <div style={{ position: 'relative' }}>
              <img
                src={ad}
                className="img-fluid mx-auto d-block"
                style={{ height: 'auto', maxWidth: '100%' }}
                alt="Advertisement"
              />

              <button
                type="button"
                className="btn-close position-absolute top-0 end-0 translate-middle"
                aria-label="Close"
                onClick={closeAd}
                disabled={!canClose} // Disable the button until the timer completes
                style={{  marginTop: '10px', marginLeft:'5' }}
              ></button>

              {/* Timer */}
              {timer > 0 && (
                <div
                  className="position-absolute bottom-0 end-0 translate-middle p-2"
                  style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    color: '#fff',
                    borderRadius: '4px',
                    fontSize: '14px',
                  }}
                >
                  {timer}
                </div>
              )}
            </div>
          </div>
        </div>
      )}





</div>


    </>
  );
}





