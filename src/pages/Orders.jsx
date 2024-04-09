import Header from "../components/header";
import { Link } from "react-router-dom";
import Imgs from "../components/images/men.jpg";
import Footer from "../components/Footer";
import AdsCarousel from "../components/AdsCarousel";
import { productImages } from "../components/ProductInfo/data";
import { useContext } from "react";
import myContext from "../components/context/MyContext";

const OrdersPage = () => {

  const context=useContext(myContext);

  const {products}=context;
  

  
  return (
    <div className="border ">
      {/* <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br> */}

      

      <div className=" mt-1  ">
      <div className=" d-flex  flex-wrap justify-content-center  ">
        <div className="  col-12 col-md-8">
          <section className="">
            <div className=" py-3   ">
              <div className="mx-2  mx-md-5 ">
                <div className=" col-lg-8 col-xl-8 w-100  ">
                  <div className=" border bg-body-tertiary  " style={{ borderRadius: "10px" }}>
                    <div className="card-header px-4 py-4 col d-flex flex-column gap-2  ">
                      <div className=" d-flex ">
                        <h5 className="text-muted mb-0  ">
                          Thanks for your Order,{" "}
                          <span style={{ color: "black" }}>
                            Hemang Krishna Chaitanya
                          </span>
                          !
                        </h5>
                      </div>
                    </div>
                  </div>

                  <div
                    className="mt-4 pb-4  "
                    style={{ borderBottom: "1px solid  #c4c4c4" }}
                  >
                    <div className=" ">
                      <div className=" " style={{ padding: 0 }}>
                        <form className="input-group d-flex  gap-2">
                          <input
                            type="search"
                            className="form-control search-box-m rounded "
                            style={{
                              border: "2px solid #d4e26b",
                              marginLeft: 0,
                            }}
                            placeholder="Ex: T-Shirt near me"
                            aria-label="Search"
                          />
                          <button
                            type="submit"
                            className="btn btn-outline-success rounded "
                          >
                            Go
                          </button>
                        </form>
                      </div>
                    </div>

                    <div className="mt-3">
                      <div className="d-flex gap-3  ">
                        <button className="btn btn-primary ">Orders</button>
                        <button className="btn btn-primary">Buy Again</button>
                        <button className="btn btn-primary">
                          Cancelled Orders
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className=" gradient-custom mb-5" style={{ backgroundColor: "" }}>
            <div className=" ">
              <div className="d-flex  gap-5  justify-content-start  flex-wrap mx-2  mx-md-5">
                <div className="col-lg-8 col-xl-8  w-100">
                  <div className="card  " style={{ borderRadius: "10px" }}>
                    <div className="card-body  ">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <p
                          className="lead fw-normal mb-0"
                          style={{ color: "#d8dfab" }}
                        >
                          Receipt
                        </p>
                        <p className="small text-muted mb-0">
                          Receipt Voucher : 1KAU9-84UIL
                        </p>
                      </div>

                      <div className=" card shadow-0 border ">
                        <div className="card-body">
                          <div className=" row">
                            <div className="col-md-2">
                              <img
                                src={Imgs}
                                className="img-fluid"
                                alt="Phone"
                                
                              />
                            </div>
                            <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                              <p className="text-muted mb-0">Item Name</p>
                            </div>
                            <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                              <p className="text-muted mb-0 small">Item clor</p>
                            </div>
                            <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                              <p className="text-muted mb-0 small">
                                Item fabric
                              </p>
                            </div>
                            <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                              <p className="text-muted mb-0 small">Qty: 1</p>
                            </div>
                            <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                              <p className="text-muted mb-0 small">599 RS</p>
                            </div>
                          </div>
                          <hr
                            className="mb-4"
                            style={{ backgroundColor: "#e0e0e0", opacity: 1 }}
                          />

                          <div className="row">
                            <div className="col-md-2">
                              <p className="text-muted small">Track Order</p>
                            </div>
                            <div className="col-md-10">
                              <div
                                className="progress"
                                style={{ height: "6px", borderRadius: "16px" }}
                              >
                                <div
                                  className="progress-bar"
                                  role="progressbar"
                                  style={{
                                    width: "65%",
                                    borderRadius: "16px",
                                    backgroundColor: "#E4D6D2",
                                  }}
                                ></div>
                              </div>
                              <div className="d-flex justify-content-between mb-1">
                                <p className="">Out for delivery</p>
                                <p className="">Delivered</p>
                              </div>

                              <div className="d-flex justify-content-between pt-2">
                                <p className="fw-bold mb-0">Order Details</p>
                                <p className="text-muted mb-0">
                                  <span className="fw-bold me-4">Total</span>{" "}
                                  1,198.00
                                </p>
                              </div>

                              <div className="d-flex justify-content-between pt-2">
                                <p className="text-muted mb-0">
                                  Invoice Number : 788152
                                </p>
                                <p className="text-muted mb-0">
                                  <span className="fw-bold me-4">Discount</span>{" "}
                                  300.00
                                </p>
                              </div>

                              <div className="d-flex justify-content-between">
                                <p className="text-muted mb-0">
                                  Invoice Date : 22 Dec, 2019
                                </p>
                                <p className="text-muted mb-0">
                                  <span className="fw-bold me-4">GST 18%</span>{" "}
                                  150 RS
                                </p>
                              </div>

                              <div className="d-flex justify-content-between mb-5">
                                <p className="text-muted mb-0">
                                  Receipt Voucher : 18KU-62IIK
                                </p>
                                <p className="text-muted mb-0">
                                  <span className="fw-bold me-4">
                                    Delivery Charges
                                  </span>{" "}
                                  Free
                                </p>
                              </div>
                            </div>

                            <div className="d-flex flex-wrap align-items-center py-3">
                              <Link
                                to="/"
                                className="btn btn-primary mx-1"
                                role="button"
                                aria-disabled=""
                              >
                                Track
                              </Link>

                              <Link
                                to="/"
                                className="btn btn-light border rounded-pill mx-1"
                                role="button"
                                aria-disabled=""
                              >
                                Feedback
                              </Link>

                              <Link
                                to="/"
                                className="btn btn-light border rounded-pill mx-1"
                                role="button"
                                aria-disabled=""
                              >
                                Return
                              </Link>

                              <Link
                                to="/"
                                className="btn btn-light border rounded-pill mx-1"
                                role="button"
                                aria-disabled=""
                              >
                                Review
                              </Link>
                            </div>

                            <div
                              className="card-footer border-0 px-4 py-2"
                              style={{
                                backgroundColor: "#E4D6D2",
                                borderRadius: "50px",
                              }}
                            >
                              <h5 className="d-flex align-items-center justify-content-end text-dark text-uppercase mb-0">
                                Total paid:{" "}
                                <span className="h2 mb-0 ms-2">1,048 RS</span>
                              </h5>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className=" gradient-custom mb-5" style={{ backgroundColor: "" }}>
            <div className=" ">
              <div className="d-flex  gap-5  justify-content-start  flex-wrap mx-2  mx-md-5">
                <div className="col-lg-8 col-xl-8  w-100">
                  <div className="card  " style={{ borderRadius: "10px" }}>
                    <div className="card-body  ">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <p
                          className="lead fw-normal mb-0"
                          style={{ color: "#d8dfab" }}
                        >
                          Receipt
                        </p>
                        <p className="small text-muted mb-0">
                          Receipt Voucher : 1KAU9-84UIL
                        </p>
                      </div>

                      <div className=" card shadow-0 border ">
                        <div className="card-body">
                          <div className=" row">
                            <div className="col-md-2">
                              <img
                                src={Imgs}
                                className="img-fluid"
                                alt="Phone"
                                
                              />
                            </div>
                            <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                              <p className="text-muted mb-0">Item Name</p>
                            </div>
                            <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                              <p className="text-muted mb-0 small">Item clor</p>
                            </div>
                            <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                              <p className="text-muted mb-0 small">
                                Item fabric
                              </p>
                            </div>
                            <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                              <p className="text-muted mb-0 small">Qty: 1</p>
                            </div>
                            <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                              <p className="text-muted mb-0 small">599 RS</p>
                            </div>
                          </div>
                          <hr
                            className="mb-4"
                            style={{ backgroundColor: "#e0e0e0", opacity: 1 }}
                          />

                          <div className="row">
                            <div className="col-md-2">
                              <p className="text-muted small">Track Order</p>
                            </div>
                            <div className="col-md-10">
                              <div
                                className="progress"
                                style={{ height: "6px", borderRadius: "16px" }}
                              >
                                <div
                                  className="progress-bar"
                                  role="progressbar"
                                  style={{
                                    width: "65%",
                                    borderRadius: "16px",
                                    backgroundColor: "#E4D6D2",
                                  }}
                                ></div>
                              </div>
                              <div className="d-flex justify-content-between mb-1">
                                <p className="">Out for delivery</p>
                                <p className="">Delivered</p>
                              </div>

                              <div className="d-flex justify-content-between pt-2">
                                <p className="fw-bold mb-0">Order Details</p>
                                <p className="text-muted mb-0">
                                  <span className="fw-bold me-4">Total</span>{" "}
                                  1,198.00
                                </p>
                              </div>

                              <div className="d-flex justify-content-between pt-2">
                                <p className="text-muted mb-0">
                                  Invoice Number : 788152
                                </p>
                                <p className="text-muted mb-0">
                                  <span className="fw-bold me-4">Discount</span>{" "}
                                  300.00
                                </p>
                              </div>

                              <div className="d-flex justify-content-between">
                                <p className="text-muted mb-0">
                                  Invoice Date : 22 Dec, 2019
                                </p>
                                <p className="text-muted mb-0">
                                  <span className="fw-bold me-4">GST 18%</span>{" "}
                                  150 RS
                                </p>
                              </div>

                              <div className="d-flex justify-content-between mb-5">
                                <p className="text-muted mb-0">
                                  Receipt Voucher : 18KU-62IIK
                                </p>
                                <p className="text-muted mb-0">
                                  <span className="fw-bold me-4">
                                    Delivery Charges
                                  </span>{" "}
                                  Free
                                </p>
                              </div>
                            </div>

                            <div className="d-flex flex-wrap align-items-center py-3">
                              <Link
                                to="/"
                                className="btn btn-primary mx-1"
                                role="button"
                                aria-disabled=""
                              >
                                Track
                              </Link>

                              <Link
                                to="/"
                                className="btn btn-light border rounded-pill mx-1"
                                role="button"
                                aria-disabled=""
                              >
                                Feedback
                              </Link>

                              <Link
                                to="/"
                                className="btn btn-light border rounded-pill mx-1"
                                role="button"
                                aria-disabled=""
                              >
                                Return
                              </Link>

                              <Link
                                to="/"
                                className="btn btn-light border rounded-pill mx-1"
                                role="button"
                                aria-disabled=""
                              >
                                Review
                              </Link>
                            </div>

                            <div
                              className="card-footer border-0 px-4 py-2"
                              style={{
                                backgroundColor: "#E4D6D2",
                                borderRadius: "50px",
                              }}
                            >
                              <h5 className="d-flex align-items-center justify-content-end text-dark text-uppercase mb-0">
                                Total paid:{" "}
                                <span className="h2 mb-0 ms-2">1,048 RS</span>
                              </h5>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>


        <div className="  col-10 col-sm-5 col-md-3  px-2 px-lg-5 " style={{marginBottom:'3.5%'}}  >
        <div className="sticky-top" style={{ top: '90px',}}>
          <div
            className=" border rounded mt-md-5  "
            style={{ border: "1px solid"  ,position:'relative',  }}
          >

            <AdsCarousel products={products}/>
          </div>
        </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
