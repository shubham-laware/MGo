import React, { useState, useEffect } from "react";
import myContext from "./MyContext.js";
import axios from "axios";

const Mystate = (props) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPrice, setselectedPrice] = useState("");
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState([]);
  const totalQuantity = cart.reduce((total, cartItem) => total + cartItem.quantity, 0);
  const [snackbarOpen, setSnackbarOpen] = useState([]);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    axios
      .get("https://minitgo.com/api/fetch_products.php")
      .then((response) => {
        setProducts(response.data.data);
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handlePriceChange = (event) => {
    setselectedPrice(event.target.value);
  };

  // Handle search input change
  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };


  // function handleAddToCart(prod, index) {
  //   // Check if the product already exists in the cart
  //   const existingIndex = cart.findIndex(
  //     (item) => item.product_id === prod.product_id
  //   );

  //   if (existingIndex !== -1) {
  //     // If the product already exists, update its quantity
  //     const updatedCart = [...cart];
  //     updatedCart[existingIndex] = {
  //       ...updatedCart[existingIndex],
  //       quantity: updatedCart[existingIndex].quantity + 1,
  //     };
  //     setCart(updatedCart);
  //   } else {
  //     // If the product doesn't exist, add it to the cart with quantity 1
  //     setCart([...cart, { ...prod, quantity: 1 }]);
  //   }

  //   // Set snackbar message for the clicked product
  //   setSnackbarMessage("Product added successfully!");

  //   // Open the snackbar for the clicked product
  //   const updatedSnackbarOpen = [...snackbarOpen];
  //   updatedSnackbarOpen[index] = true;
  //   setSnackbarOpen(updatedSnackbarOpen);

  //   // Close the snackbar after 1 second
  //   setTimeout(() => {
  //     const updatedSnackbarOpen = [...snackbarOpen];
  //     updatedSnackbarOpen[index] = false;
  //     setSnackbarOpen(updatedSnackbarOpen);
  //   }, 1000);
  // }

  return (
    <div>
      <myContext.Provider
        value={{
          selectedCategory,
          setSelectedCategory,
          handleCategoryChange,
          products,
          handlePriceChange,
          setselectedPrice,
          selectedPrice,
          searchQuery,
          setSearchQuery,
          handleSearchInputChange,
          cart,
          setCart,
          totalQuantity,

          snackbarOpen,
          setSnackbarOpen,
          snackbarMessage,
          setSnackbarMessage
        }}
      >
        {props.children}
      </myContext.Provider>
    </div>
  );
};

export default Mystate;
