import { Link } from "react-router-dom";

import { useEffect, useState } from "react";

import { useSelector } from "react-redux";

import { IoMdCash } from "react-icons/io";
import { FaGooglePay } from "react-icons/fa";
import { SiPaytm } from "react-icons/si";
import { IoHome } from "react-icons/io5";
import { HiBuildingOffice } from "react-icons/hi2";

export const Checkout = () => {
  const cart = useSelector((state) => state.cart.items);
  const [paymentMethod, setPaymentMethod] = useState("Cash On Delivery");
  const [userCoordinates,setUserCoordinates]=useState('')
  const [selectedAddress, setSelectedAddress] = useState({
    type: "Home Address",
    location: "1234 Random St, City, Country",
  });

  function calculateTotalPrice() {
    let totalPrice = 0;
    cart?.forEach((cartItem) => {
      totalPrice += parseInt(cartItem.product_price);
    });

    return totalPrice;
  }



  // console.log('CART:',cart)



  const handleUseCurrentLocation = () => {
    // Use browser geolocation API to get the current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          // console.log("LAT:",latitude)
          // console.log("LONG",longitude)
          const coordinates = `${latitude},${longitude}`;
          setUserCoordinates(coordinates)
          setSelectedAddress({
            type:'Current Address',
            location:coordinates
          })
          // try {
          //   const response = await fetch(
          //     `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=AIzaSyCMG4GzxbEmqfSZ-uaDOhF55sgxi9sumc4`
          //   ); // Replace 'YOUR_API_KEY' with your actual API key
          //   const data = await response.json();
          //   if (data.results.length > 0) {
          //     const { components } = data.results[0];
          //     setAddress(components.road || "");
          //     setCity(
          //       components.city || components.town || components.village || ""
          //     );
          //     setPincode(components.postcode || "");
          //     setTownDistrict(components.town || components.district || "");
          //     setState(components.state || "");
          //   }
          // } catch (error) {}
        },
        (error) => {
          return;
        }
      );
    } else {
    }
  };

  useEffect(() => {
    handleUseCurrentLocation();
  }, []);

  useEffect(() => {
    handleConfirmOrder();
  }, [userCoordinates]);



 function handleConfirmOrder (){
  handleUseCurrentLocation();

  const userDetails=JSON.parse(localStorage.getItem("user"))
  // console.log("DET",userDetails)

  const productDetails = cart.map(item => ({
    product_id: item.product_id,
    product_name: item.product_name,
    product_color1: item.product_color1,
    product_title: item.product_title,
    client_name: item.client_name,
    client_id: item.client_id,
    coordinates: item.coordinates,
    quantity: item.quantity
  }));

  const orderDetails={
    user_id:userDetails.userId,
    user_coordinates:userCoordinates,
    user_address:userDetails.address,
    user_name:userDetails.fullName,
    product_details:productDetails
  }

  console.log("ORDER DETAILS",orderDetails)
 }

  return (
    <>
      <br></br>
      <br></br>
      <br></br>
      <br></br>

      <div className="container mt-5 border border-1 p-0" style={{ backgroundColor: "#eee" }}>
        <div className="card">
          <div className="card-body">
            <div className="row justify-content-center pb-5">
              <div className="col-md-7 col-xl-5 mb-4 mb-md-0">
                <div className="py-4 d-flex flex-row">
                  <h5>
                    <span className="check-square"></span>
                    <b>ELIGIBLE</b> |
                  </h5>
                  <span className="ps-2">Pay</span>
                </div>

                <div className="pt-2">
                  <div className="d-flex pb-2">
                    <div>
                      <p>
                        <b>
                          Patient Balance{" "}
                          <span className="text-success">1,350 RS</span>
                        </b>
                      </p>
                    </div>
                    <div className="ms-auto">
                      <p className="text-primary">
                        <Link
                          to="/"
                          className="btn mx-1"
                          role="button"
                          border
                          border-dark
                        >
                          Add payment card
                        </Link>
                      </p>
                    </div>
                  </div>
                  <p>
                    This is an estimate for the portion of your order due today.
                    review, refunds and/or balances will reconcile
                    automatically.
                  </p>
                  <div className="d-flex flex-row pb-3">
                    <div className="d-flex align-items-center pe-2">
                      <input
                        type="radio"
                        name="paymentMethod"
                        id="cashOnDelivery"
                        checked={paymentMethod === "Cash On Delivery"}
                        onChange={() => setPaymentMethod("Cash On Delivery")}
                      />
                    </div>
                    <div className="rounded border d-flex w-100 p-3 align-items-center">
                      <p className="mb-0 fw-semibold">
                        <IoMdCash
                          className="me-2"
                          style={{ width: "1.8rem", height: "1.8rem" }}
                        />
                        Cash On Delivery
                      </p>
                      {/* <div className="ms-auto">************3456</div> */}
                    </div>
                  </div>
                  <div className="d-flex flex-row pb-3">
                    <div className="d-flex align-items-center pe-2">
                      <input
                        type="radio"
                        name="paymentMethod"
                        id="onlinePayment"
                        checked={paymentMethod === "Paytm / GPay"}
                        onChange={() => setPaymentMethod("Paytm / GPay")}
                      />
                    </div>
                    <div className="rounded border d-flex w-100 p-3 align-items-center">
                      <p className="mb-0 fw-semibold">
                        <SiPaytm
                          className="me-2"
                          style={{ height: "3rem", width: "3rem" }}
                        />
                        {"/"}
                        <FaGooglePay
                          className="mx-2"
                          style={{ height: "3rem", width: "3rem" }}
                        />
                      </p>
                      {/* <div className="ms-auto">************1038</div>ss */}
                    </div>
                  </div>
                  <hr />
                  <div className="d-flex flex-column pb-3">
                    <h2 className="fw-semibold mt-1 mb-3">Select Address</h2>
                    <div className="d-flex flex-row pb-3">
                      <div className="d-flex align-items-center pe-2">
                        <input
                          type="radio"
                          name="address"
                          id="homeAddress"
                          checked={selectedAddress.type === "Home Address"}
                          onChange={() =>
                            setSelectedAddress({
                              type: "Home Address",
                              location: "1234 Random St, City, Country",
                            })
                          }
                        />
                      </div>
                      <div className="rounded border d-flex w-100 p-3 align-items-center">
                        <p className="mb-0 fw-semibold">
                          <IoHome
                            className="me-2"
                            style={{ width: "1.5rem", height: "1.5rem" }}
                          />
                          Home Address
                        </p>
                        <span className="ms-auto fs-6">
                          {"1234 Random St, City, Country"}
                        </span>
                      </div>
                    </div>
                    <div className="d-flex flex-row pb-3">
                      <div className="d-flex align-items-center pe-2">
                        <input
                          type="radio"
                          name="address"
                          id="officeAddress"
                          checked={selectedAddress.type === "Office Address"}
                          onChange={() =>
                            setSelectedAddress({
                              type: "Office Address",
                              location: "5678 Business Ave, Town, Country",
                            })
                          }
                        />
                      </div>
                      <div className="rounded border d-flex w-100 p-3 align-items-center">
                        <p className="mb-0 fw-semibold">
                          {" "}
                          <HiBuildingOffice
                            className="me-2"
                            style={{ width: "1.5rem", height: "1.5rem" }}
                          />
                          Office Address
                        </p>
                        <span className="ms-auto fs-6">
                          {"5678 Business Ave, Town, Country"}
                        </span>
                      </div>
                    </div>
                    <div className="d-flex flex-row pb-3">
                      <div className="d-flex align-items-center pe-2">
                        <input
                          type="radio"
                          name="address"
                          id="currentAddress"
                          checked={selectedAddress.type === "Current Address"}
                          onChange={handleUseCurrentLocation}
                        />
                      </div>
                      <div className="rounded border d-flex w-100 p-3 align-items-center">
                        
                          Use Current Address
                      
                        {/* <span className="ms-auto fs-6">
                          {"Street #4, City 59 , India"}
                        </span> */}
                      </div>
                    </div>
                  </div>
                  <div className="place-button mx-4">
                  <button
                    type="button"
                    className="btn btn-primary btn-lg"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                  >
                    Place Order
                  </button>
                  </div>

                  <div
                    className="modal fade"
                    id="exampleModal"
                    tabIndex="-1"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="exampleModalLabel">
                            Order Confirmation
                          </h5>
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <div className="modal-body bg-light">
                          <h3 className="mb-0 mx-3 text-start">Items:</h3>
                          <hr />
                          <div className="product-section my-2">
                            {cart?.map((item, index) => {
                              return (
                                <div
                                  key={index}
                                  className="col-12 mx-md-auto px-3 my-2 product-item d-flex justify-content-start gap-4"
                                >
                                  <img
                                    src={item.product_image1}
                                    alt="Product"
                                    width={70}
                                    height={70}
                                    className="border rounded p-1"
                                  />
                                  <div className="d-flex flex-column ">
                                    {" "}
                                    <h5>{item.client_name}</h5>
                                    <p className="fs-5">
                                      {item.product_price}₹
                                    </p>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                          <hr />
                          <div className="px-3 payment-info">
                            <h4>Payment Information</h4>
                            <div className="mt-3 d-flex justify-content-between">
                              <h5>Method:</h5> <h6>{paymentMethod}</h6>
                            </div>
                          </div>
                          <hr />

                          <div className="px-3 address-info">
                            <h4>Shipping Information</h4>
                            <div className="mt-3 d-flex justify-content-between">
                              <h5>Location: </h5>
                              <h6>{selectedAddress.location}</h6>
                            </div>
                          </div>
                          <hr />

                          <div className="px-3 total-amount d-flex justify-content-between align-items-center">
                            <h3>Total Amount:</h3>
                            <h5 className="text-success">
                              {calculateTotalPrice() + 350} RS
                            </h5>
                          </div>
                          <hr />
                        </div>
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-primary mx-auto"
                            onClick={handleConfirmOrder}
                          >
                            Confirm Order
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-5 col-xl-4 offset-xl-1">
                <div className="py-4 d-flex justify-content-end">
                  <h6>
                    <Link to="/cart">Cancel and return to website</Link>
                  </h6>
                </div>
                <div
                  className="rounded d-flex flex-column p-2"
                  style={{ backgroundColor: "#f8f9fa" }}
                >
                  <div className="p-2 me-3">
                    <h4>Order Recap</h4>
                  </div>
                  <div className="p-2 d-flex">
                    <div className="col-8">Contracted Price</div>
                    <div className="ms-auto">{calculateTotalPrice()} RS</div>
                  </div>
                  <div className="p-2 d-flex">
                    <div className="col-8">TAX Amount</div>
                    <div className="ms-auto">0.00</div>
                  </div>
                  <div className="p-2 d-flex">
                    <div className="col-8">TAX Amount</div>
                    <div className="ms-auto">0.00</div>
                  </div>
                  <div className="p-2 d-flex">
                    <div className="col-8">TAX Amount</div>
                    <div className="ms-auto">0.00</div>
                  </div>
                  <div className="border-top px-2 mx-2"></div>
                  <div className="p-2 d-flex pt-3">
                    <div className="col-8">Total TAX Amount</div>
                    <div className="ms-auto">50 RS</div>
                  </div>
                  <div className="p-2 d-flex">
                    <div className="col-8">Discount</div>
                    <div className="ms-auto">0.00</div>
                  </div>
                  <div className="border-top px-2 mx-2"></div>
                  <div className="p-2 d-flex pt-3">
                    <div className="col-8">shipping</div>
                    <div className="ms-auto">
                      <b>100 RS</b>
                    </div>
                  </div>
                  <div className="p-2 d-flex">
                    <div className="col-8">Wallet Balance</div>
                    <div className="ms-auto">
                      <b>200 RS</b>
                    </div>
                  </div>
                  <div className="border-top px-2 mx-2"></div>
                  <div className="p-2 d-flex pt-3">
                    <div className="col-8">
                      <b>Total</b>
                    </div>
                    <div className="ms-auto">
                      <b className="text-success">
                        {calculateTotalPrice() + 350} RS
                      </b>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br></br>
    </>
  );
};

export default Checkout;
