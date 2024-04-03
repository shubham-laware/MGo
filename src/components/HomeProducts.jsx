import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Button, Form, Card } from 'react-bootstrap';
import { BiInfoCircle } from "react-icons/bi";
import { FaStore } from "react-icons/fa6";
import { BiSolidCategory } from "react-icons/bi";
import { FaLocationDot } from "react-icons/fa6";
import $ from 'jquery'; // Import jQuery
import Ban from './images/product.png'
import myContext from './context/MyContext';
import { Link } from 'react-router-dom';
import StarRatings from './ProductInfo/StarRatings';
import { useDispatch, useSelector } from 'react-redux';
import { showSnackbar, hideSnackbar,addItemToWishlist,addToCart ,showSnackbarForWishlist, hideSnackbarForWishlist} from './redux/Slices/CartSlice';


const HomeProducts = () => {
  const dispatch = useDispatch();
  const [coordinates, setCoordinates] = useState('');
  const context = useContext(myContext);

  const { products } = context;
  const handleAddToCart = (product, index) => {
    dispatch(addToCart(product));
    dispatch(showSnackbar({ message: "Product added successfully!", index }));
    setTimeout(() => {
      dispatch(hideSnackbar());
    }, 1000)
  };
 
  // for wishlist button
  const [wishlistClicked, setWishlistClicked] = useState(Array(products.length).fill(false));
  const handleWishListToCart =(product,index)=>{
    const newWishlistClicked = [...wishlistClicked];
    newWishlistClicked[index] = !newWishlistClicked[index];
    setWishlistClicked(newWishlistClicked);
    
    dispatch(addItemToWishlist(product));
    dispatch(showSnackbarForWishlist({ message: 'Item added to wishlist!', index }));
    setTimeout(() => {
      dispatch(hideSnackbarForWishlist());
    }, 1000); // Hide after 3 seconds
  }

  const cart = useSelector(state => state.cart);
  

  useEffect(() => {
    handleUseCurrentLocation();
  }, []);

  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          // Google Maps URL
          const googleMapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;

          // Consoling the URL link
          console.log(googleMapsUrl);

          // Set coordinates state
          setCoordinates(googleMapsUrl);
        },
        (error) => {
          console.log('Geolocation error:', error);
        }
      );
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  };

  useEffect(() => {
    if (coordinates !== '') { // Check if coordinates are not empty
      const recordVisit = () => {
        var visits = {
          url: window.location.href,
          timestamp: new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }),
          userAgent: navigator.userAgent,
          location: coordinates
        };

        $.ajax({
          url: 'https://minitgo.com/api/live_traffic.php',
          type: 'post',
          data: visits,
          success: function (data, status) {
            console.log(visits);
          },
        });
      };

      recordVisit();
    }
  }, [coordinates]); // Run the effect whenever coordinates change
  return (
    <>


      <div className="container">
       
        <h3> <BiSolidCategory className='fs-2 p-1' />Top Category's</h3>
        <p className="px-2" style={{ fontSize: 13.5 }}>Explore our top category's</p>

        <div className="row">
          <div className="col-6 col-md-3">
            <div className="subs-cat  d-flex flex-column justify-content-center">
              <h4>Men's Fashion</h4>
              <Link to={{ pathname: '/mens-category', search: `?category=Men's Fashion` }}>
                <button className="btn btn-outline-light rounded-pill">Shop Now</button>
              </Link>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="subs-cat-2  d-flex flex-column justify-content-center">
              <h4>Women Fashion</h4>
              <Link to={{ pathname: '/womens-category', search: `?category=Women's Fashion` }}>
                <button className="btn btn-outline-light rounded-pill">Shop Now</button>
              </Link>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="subs-cat-3  d-flex flex-column justify-content-center">
              <h4>Fashion Accessories</h4>
              <Link to={{ pathname: '/accessories', search: `?category=Accessories` }}>
                <button className="btn btn-outline-light rounded-pill">Shop Now</button>
              </Link>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="subs-cat-4  d-flex flex-column justify-content-center">
              <h4>Kitchen</h4>
              <Link>
                <button className="btn btn-outline-light rounded-pill">Shop Now</button>
              </Link>
            </div>
          </div>
        </div>
        
     
      </div>
      <br></br>
      <div className="mx-0 mx-md-5 px-0 px-md-5">
        <h3><FaLocationDot className='fs-2 p-1' />Nearby</h3>
        <p className="px-2" style={{ fontSize: 13.5 }}>Increase distance for more products! </p>

        <div className="row">

          <div className="col-md-2 filter-s ">
            <div className='shadow filter-bg'>
              <form>
                <div className="form-group ">
                  <h6>Filter</h6>
                  <label htmlFor="priceFilter">Distance</label>

                  <select className="form-control rounded-pill" id="distanceFilter">
                    <option value="">All</option>
                    <option value="5 miles">5 Km</option>
                    <option value="10 miles">10 km</option>
                    <option value="10 miles">15 km</option>
                    <option value="10 miles">20+ km</option>
                    <option value="Null"> </option>

                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="priceFilter">Set Price</label>
                  <select className="form-control rounded-pill " id="priceFilter">
                    <option value="">All</option>
                    <option value="$10.99">Below: 500</option>
                    <option value="$19.99">500 - 1000</option>
                    <option value="$19.99" >5000 - 10000</option>
                    <option value="Null" > </option>

                  </select>
                </div>
              </form>
            </div>
          </div>

          <div className="col-md-10">
            <div className="row">
              {
                products?.map((product, index) => (
                  <div
                    key={index}
                    className="col-6 col-sm-3 py-2"
                  >
                    <div className="product-card">
                      <a
                        href={`/${product.product_id}`}
                        target="_blank"
                        style={{
                          textDecoration: "none",
                          color: "black",
                        }}
                      >
                        <div
                          className="product-image"
                          
                        >
                          <img
                            src={product.product_image1}
                            alt="Product 1"
                           
                          />
                          <div className="offer-tag bg-warning rounded-pill text-center p-1 text-light">
                          {product.offers}% Off
                        </div>
                        </div>
                        
                        <div className="product-content">
                          <h6>{product.product_name} </h6>
                          <h5>
                            Price: <sup>&#x20B9;</sup>
                            {product.product_price}
                            <span className="text-decoration-line-through text-muted fs-6 fw-light">
                              599
                            </span>
                            <span
                              className="text-muted"
                              style={{
                                fontSize: "13px",
                              }}
                            >
                              {" "}
                              {product.product_stock}
                            </span>
                          </h5>
                          <div className="product-rating text-warning">
                            Rating:{" "}
                            <StarRatings rating={product.product_ratings} />
                          </div>
                          <p className="product-distance text-secondary ">
                            Distance: {product.distance}km away.
                          </p>
                          {cart.snackbar.open && cart.snackbar.index === index && (
                            <div
                              style={{ fontSize: "12px" }}
                              className="border text-center rounded w-75 mx-auto"
                            >
                              {cart.snackbar.message}
                            </div>
                          )}
                        </div>
                      </a>
                      <div className="d-flex justify-content-center align-items-center ">
                      <button className={`btn ${wishlistClicked[index] ? "btn-success" : "btn-primary"} w-25 my-2`} onClick={() => handleWishListToCart(product, index)}>❤</button>
                      <button
                        onClick={() => handleAddToCart(product, index)}
                        className="btn btn-primary my-2  ms-2"
                      >
                        Add to cart
                      </button>
                      </div>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>


        </div>
      </div>

    </>
  );

}

export default HomeProducts;
