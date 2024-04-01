// Import the css, for the scroll bar

import { useContext } from "react";
import myContext from "./context/MyContext";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, showSnackbar, hideSnackbar } from "./redux/Slices/CartSlice";

export default function Carousel() {
  const dispatch = useDispatch();
  const context = useContext(myContext)
  const { products, snackbarOpen } = context;

  const handleAddToCart = (product, index) => {
    dispatch(addToCart(product));
    dispatch(showSnackbar({ message: "Product added successfully!", index }));

    // Wait for 1 second, then hide snackbar
    setTimeout(() => {
      dispatch(hideSnackbar());
    }, 1000)
  };
  const cart = useSelector(state => state.cart);


  return (
    <div>
      <div className="container ">
        <div className="text-left">
          <h3 className=" ">Trending Section</h3>
          <span className=" text-muted p-2" style={{ fontSize: 13.5 }}>Nearst trending products</span>
          <div className="rounded-full"></div>
        </div>
        <div className="d-flex gap-3 overflow-x-auto my-3">
          {products.map((prod, index) => (
            <div key={index} className="prod px-4 shadow rounded bg-light ">
              <a
                href={`/${prod.product_id}`}
                target="_blank"
                style={{
                  textDecoration: "none",
                  color: "black",
                }}
              >

                <div key={index} className="d-flex flex-column "  >
                  <img className="w-100 rounded" src={prod.product_image1} alt={`Image ${prod.product_id}`} />
                  <div className="d-flex flex-column justify-content-between p-2">
                    <div className="d-flex flex-column">
                      <h1 className="fs-4">{prod.product_name}</h1>
                      <p className="text-muted">{prod.product_discription}</p>
                      <p className="text-muted">{prod.product_size}</p>
                    </div>
                    {cart.snackbar.open && cart.snackbar.index === index && (
                      <div
                        style={{ fontSize: "12px" }}
                        className="border text-center rounded w-75 mx-auto"
                      >
                        {cart.snackbar.message}
                      </div>
                    )}

                  </div>
                </div>
              </a>
              <div className="d-flex justify-content-center align-items-center fs-4 my-3">

                <button className="btn  btn-dark w-100 " style={{ whiteSpace: 'nowrap' }} onClick={() => handleAddToCart(prod, index)}> Add To Cart</button>
                <div className="d-flex ">
                  <button className="btn btn-dark w-100 mx-2 px-5 ">
                    <Link to="/checkout" style={{ textDecoration: 'none', color: 'white' }}> Buy</Link>
                  </button>
                </div>
              </div>
            </div>

          ))}
        </div>
      </div>
    </div>
  );
}
