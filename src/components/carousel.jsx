// Import the css, for the scroll bar

import { useContext } from "react";
import myContext from "./context/MyContext";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "./redux/Slices/CartSlice";

export default function Carousel() {
  const dispatch = useDispatch();
  const context = useContext(myContext)
  const { products,snackbarOpen } = context;

  const handleAddToCart = (product, index) => {
    console.log("handle cart call")
    console.log("handle cart call", product)
    dispatch(addToCart(product));
  };



  // const products = [
  //   {
  //     id: 1,
  //     img: "http://localhost:5173/src/components/images/product.png",
  //     name: "Organic Shampoo",
  //     description:
  //       "Seller name",
  //     size: "Xl, Sm, M, L",
  //     price: "₹299",
  //   },
  //   {
  //     id: 2,
  //     img: "http://localhost:5173/src/components/images/product.png",
  //     name: "Luxury Handmade Soap",
  //     description:
  //       "Pamper your skin with our  ",
  //     size: "Xl, Sm, M, L",
  //     price: "$34.67",
  //   },
  //   {
  //     id: 2,
  //     img: "http://localhost:5173/src/components/images/product.png",
  //     name: "Luxury Handmade Soap",
  //     description:
  //       "Pamper your skin with our  ",
  //     size: "Xl, Sm, M, L",
  //     price: "$34.67",
  //   },
  //   {
  //     id: 3,
  //     img: "http://localhost:5173/src/components/images/product.png",
  //     name: "Anti-Aging Face Cream",
  //     description:
  //       "Pamper your skin with our ",
  //     size: "Xl, Sm, M, L",
  //     price: "$28.67",
  //   },
  //   {
  //     id: 4,
  //     img: "http://localhost:5173/src/components/images/product.png",
  //     name: "Exfoliating Body Scrub",
  //     description:
  //       "Pamper your skin with our ",
  //     size: "Xl, Sm, M, L",
  //     price: "$24.67",
  //   },
  //   {
  //     id: 5,
  //     img: "http://localhost:5173/src/components/images/product.png",
  //     name: "Hydrating Lip Balm",
  //     description:
  //       "Pamper your skin with our ",
  //     size: "Xl, Sm, M, L",
  //     price: "$21.27",
  //   },
  //   {
  //     id: 5,
  //     img: "http://localhost:5173/src/components/images/product.png",
  //     name: "Hydrating Lip Balm",
  //     description:
  //       "Pamper your skin with our ",
  //     size: "Xl, Sm, M, L",
  //     price: "$21.27",
  //   },
  //   {
  //     id: 5,
  //     img: "http://localhost:5173/src/components/images/product.png",
  //     name: "Hydrating Lip Balm",
  //     description:
  //       "Pamper your skin with our ",
  //     size: "Xl, Sm, M, L",
  //     price: "$21.27",
  //   },
  // ];

  return (
    <div>
      <div className="container ">
        <div className="text-left">
          <h3 className=" ">Trending Section</h3>
          <span className=" text-muted p-2" style={{ fontSize: 13.5 }}>Nearst trending products</span>
          <div className="rounded-full"></div>
        </div>
        <div className="d-flex gap-3 overflow-x-auto my-3">
          {/* {products.map((prod,index) => (
      <div key={index} className="d-flex my-3 flex-column bg-light px-4 shadow rounded"  >
        <img className="w-100 rounded" src={prod.img} alt={`Image ${prod.id}`} />
        <div className="d-flex flex-column justify-content-between p-2">
          <div className="d-flex flex-column">
            <h1 className="fs-4">{prod.name}</h1>
            <p className="text-muted">{prod.description}</p>
            <p className="text-muted">{prod.size}</p>
          </div>
          <div className="d-flex justify-content-center align-items-center fs-4 my-3">
            <button className="btn  btn-dark w-100">❤</button>
            <div className="d-flex ">
              <button className="btn btn-dark w-100 mx-2 px-5">Buy</button>
            </div>
          </div>
        </div>
      </div>
    ))} */}



          {products.map((prod, index) => (
            <div key={index} className="d-flex my-3 flex-column bg-light px-4 shadow rounded "  >
              <img className="w-100 rounded" src={prod.product_image1} alt={`Image ${prod.product_id}`} />
              <div className="d-flex flex-column justify-content-between p-2">
                <div className="d-flex flex-column">
                  <h1 className="fs-4">{prod.product_name}</h1>
                  <p className="text-muted">{prod.product_discription}</p>
                  <p className="text-muted">{prod.product_size}</p>
                </div>
                {snackbarOpen[index] && (
                  <div
                    style={{ fontSize: "12px" }}
                    className="border text-center rounded w-75 mx-auto"
                  >
                    Added successfully &#x2713;
                  </div>
                )}
                <div className="d-flex justify-content-center align-items-center fs-4 my-3">
                  <button className="btn  btn-dark w-100 " style={{ whiteSpace: 'nowrap' }} onClick={() => handleAddToCart(prod, index)}> Add To Cart</button>
                  <div className="d-flex ">
                    <button className="btn btn-dark w-100 mx-2 px-5 ">
                      <Link to={'/checkout'} style={{ textDecoration: 'none', color: 'white' }}> Buy</Link>

                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
