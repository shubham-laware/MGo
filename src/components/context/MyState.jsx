import React, { useState, useEffect } from "react";
import myContext from "./MyContext.js";
import axios from "axios";

const Mystate = (props) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPrice, setselectedPrice] = useState("");
  const [accessoriesCategory,setAccessoriesCategory]=useState("")
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [offer,setOffers] = useState("")
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
 // for hide modal
 const [showfilterModal, setShowFilterModal] = useState(false);



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

  const handleAccessoriesCategoryChange=(event)=>{
    setAccessoriesCategory(event.target.value)
  }

  const handlePriceChange = (event) => {
    setselectedPrice(event.target.value);
    setShowFilterModal(false)
  };

  // Handle search input change
  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleOfferChange = (event)=>{
    setOffers(event.target.value)
  }

  const handleImageClick = (index) => {
    console.log('imageclicked')
    setSelectedImageIndex(index); // Update the selected image index
};


  return (
    <div>
      <myContext.Provider
        value={{
          selectedCategory,
          setSelectedCategory,
          handleCategoryChange,
          accessoriesCategory,
          setAccessoriesCategory,
          handleAccessoriesCategoryChange,
          products,
          handlePriceChange,
          setselectedPrice,
          selectedPrice,
          searchQuery,
          setSearchQuery,
          handleSearchInputChange,
          offer,
          setOffers,
          handleOfferChange,
          selectedImageIndex,
          setSelectedImageIndex,
          handleImageClick,
          showModal,
          setShowModal,
          showfilterModal
        }}
      >
        {props.children}
      </myContext.Provider>
    </div>
  );
};

export default Mystate;
