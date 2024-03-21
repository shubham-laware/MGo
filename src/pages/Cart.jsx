 
import {Link} from 'react-router-dom'; 
import { BsTrash3 } from 'react-icons/bs';
import { AiOutlineHeart } from 'react-icons/ai';

const Cart = () => {
  const products = [
    {
      id: 1,
      img: "http://localhost:5173/src/components/images/product.png",
      name: "Organic Shampoo",
      description:
        "Seller name",
      size: "Xl, Sm, M, L",
      price: "₹299",
    },
    {
      id: 2,
      img: "http://localhost:5173/src/components/images/product.png",
      name: "Luxury Handmade Soap",
      description:
        "Pamper your skin with our  ",
      size: "Xl, Sm, M, L",
      price: "$34.67",
    },
    {
      id: 2,
      img: "http://localhost:5173/src/components/images/product.png",
      name: "Luxury Handmade Soap",
      description:
        "Pamper your skin with our  ",
      size: "Xl, Sm, M, L",
      price: "$34.67",
    },
    {
      id: 3,
      img: "http://localhost:5173/src/components/images/product.png",
      name: "Anti-Aging Face Cream",
      description:
        "Pamper your skin with our ",
      size: "Xl, Sm, M, L",
      price: "$28.67",
    },
    {
      id: 4,
      img: "http://localhost:5173/src/components/images/product.png",
      name: "Exfoliating Body Scrub",
      description:
        "Pamper your skin with our ",
      size: "Xl, Sm, M, L",
      price: "$24.67",
    },
    {
      id: 5,
      img: "http://localhost:5173/src/components/images/product.png",
      name: "Hydrating Lip Balm",
      description:
        "Pamper your skin with our ",
      size: "Xl, Sm, M, L",
      price: "$21.27",
    },
    {
      id: 5,
      img: "http://localhost:5173/src/components/images/product.png",
      name: "Hydrating Lip Balm",
      description:
        "Pamper your skin with our ",
      size: "Xl, Sm, M, L",
      price: "$21.27",
    },
    {
      id: 5,
      img: "http://localhost:5173/src/components/images/product.png",
      name: "Hydrating Lip Balm",
      description:
        "Pamper your skin with our ",
      size: "Xl, Sm, M, L",
      price: "$21.27",
    },
  ];

    return (

      <>

 
<br></br>
<br></br>
<br></br>
<br></br>

<section className="h-100 gradient-custom">
      <div className="container py-5 h-100">
        <div className="row justify-content-center my-4">
          <div className="col-md-8">
            <div className="card mb-4">
              <div className="card-header py-3 rounded-pill">
                <h5 className="mb-0">Cart - 2 items</h5>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-3 col-md-12 mb-4 mb-lg-0">
                    <div className="bg-image rounded hover-zoom hover-overlay">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Vertical/12a.webp"
                        className="w-100"
                        alt="Product"
                      />
                      <a href="#!">
                        <div
                          className="mask"
                          style={{ backgroundColor: "rgba(251, 251, 251, 0.2)" }}
                        ></div>
                      </a>
                    </div>
                  </div>
                  <div className="col-lg-5 col-md-6 mb-4 mb-lg-0">
                    <p>
                      <strong>Blue denim shirt</strong>
                    </p>
                    <p>Color: blue</p>
                    <p>Size: M</p>
                    <br></br>
                    <button className='btn btn-danger mx-2'>
                    <BsTrash3/>
                    </button>
                    <button className='btn btn-secondary'
                    > <AiOutlineHeart/>
                    </button>
                  </div>
                  <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
                    <div className="d-flex mb-4" style={{ maxWidth: "300px" }}>
                      <button className="btn btn-primary px-3 me-2">
                        <i className="minus"> - </i>
                      </button>
                      <input
                        defaultValue={1}
                        min={0}
                        type="number"
                        className="form-control text-center"
                        placeholder="Quantity"
                      />
                      <button className="btn btn-primary px-3 ms-2">
                        <i className="plus"> + </i>
                      </button>
                    </div>
                    <p className="text-start text-md-center">
                      <strong>600 RS</strong>
                    </p>
                  </div>
                </div>
                <hr className="my-4" />
                <div className="row">
                  <div className="col-lg-3 col-md-12 mb-4 mb-lg-0">
                    <div className="bg-image rounded hover-zoom hover-overlay">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Vertical/13a.webp"
                        className="w-100"
                        alt="Product"
                      />
                      <a href="#!">
                        <div
                          className="mask"
                          style={{ backgroundColor: "rgba(251, 251, 251, 0.2)" }}
                        ></div>
                      </a>
                    </div>
                  </div>
                  <div className="col-lg-5 col-md-6 mb-4 mb-lg-0">
                    <p>
                      <strong>Red hoodie</strong>
                    </p>
                    <p>Color: red</p>
                    <p>Size: M</p>
                    <br></br>
                    <button className='btn btn-danger mx-2'>
                    <BsTrash3/>
                    </button>
                    <button className='btn btn-secondary'
                    > <AiOutlineHeart/>
                    </button>
                  </div>
                  <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
                    <div className="d-flex mb-4" style={{ maxWidth: "300px" }}>
                      <button className="btn btn-primary px-3 me-2">
                        <i className="minus"> - </i>
                      </button>
                      <input
                        defaultValue={1}
                        min={0}
                        type="number"
                        className="form-control text-center"
                        placeholder="Quantity"
                      />
                      <button className="btn btn-primary px-3 ms-2">
                        <i className="plus"> + </i>
                      </button>
                    </div>
                    <p className="text-start text-md-center">
                      <strong>600 RS</strong>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="card mb-4">
              <div className="card-body">
                <p>
                  <strong>Expected shipping delivery</strong>
                </p>
                <p className="mb-0">12.10.2020 - 14.10.2020</p>
              </div>
            </div>
            <div className="card mb-4 mb-lg-0">
              <div className="card-body">
                <p>
                  <strong>We accept</strong>
                </p>
                <img
                  className="me-2"
                  width="45px"
                  src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/visa.svg"
                  alt="Visa"
                />
                <img
                  className="me-2"
                  width="45px"
                  src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/amex.svg"
                  alt="American Express"
                />
                <img
                  className="me-2"
                  width="45px"
                  src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/mastercard.svg"
                  alt="Mastercard"
                />
                <img
                  className="me-2"
                  width="45px"
                  src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce/includes/gateways/paypal/assets/images/paypal.png"
                  alt="PayPal acceptance mark"
                />
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card mb-4">
              <div className="card-header rounded-pill">
                <h5 className="mb-0">Summary</h5>
              </div>
              <div className="card-body">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                    Products
                    <span>1,200 RS</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                    Shipping
                    <span>100 RS</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                    <div>
                      <strong>Total amount</strong>
                      <p className="mb-0">(including VAT)</p>
                    </div>
                    <span>
                      <strong>1,350 RS</strong>
                    </span>
                  </li>
                </ul>
                <Link to="/checkout"  className="btn btn-lg btn-block btn-primary">
                  Go to checkout
                </Link >
              </div>
            </div>
              {/* div for Recomended */}
              <div className='card'>
                <div className="card-header py-2 rounded-pill">
                  <h5 className="mb-0">Recommended Items</h5>
                </div>
                <div className="d-flex gap-3   overflow-x-auto my-3">
                  {products.map((prod,index) => (
                    <div key={index} className="d-flex  flex-column bg-light  shadow rounded px-4" style={{ height: '430px' }}  >
                      <img className="w-100 h-50 rounded" src={prod.img} alt={`Image ${prod.id}`} />
                      <div className="d-flex flex-column justify-content-between p-1">
                        <div className="d-flex flex-column">
                          <h1 className="fs-4">{prod.name}</h1>
                          <p className="text-muted">{prod.description}</p>
                          <p className="text-muted">{prod.size}</p>
                        </div>
                        <div className="d-flex justify-content-center align-items-center fs-4 my-1 pb-1">
                          <button className="btn  btn-dark w-100">❤</button>
                          <div className="d-flex ">
                            <button className="btn btn-dark w-100 mx-2 px-5">Buy</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}



                </div>
              </div>

          </div>
        </div>
      </div>
    </section>
     

      </>
    );

  }

export default Cart;