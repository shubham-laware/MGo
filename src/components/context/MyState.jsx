import React, { useState, useEffect } from 'react'
import myContext from './MyContext'
import axios from 'axios';
 
const Mystate = (props) => {
 
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedPrice, setselectedPrice] = useState('');
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
 
    useEffect(() => {
        axios.get('https://minitgo.com/api/fetch_products.php')
            .then(response => {
                setProducts(response.data.data);
            })
            .catch(error => {
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
 
   
  console.log("searchQuery",searchQuery)
    return (
        <div>
 
            <myContext.Provider value={{ selectedCategory, setSelectedCategory, handleCategoryChange, products, handlePriceChange, setselectedPrice, selectedPrice, searchQuery, setSearchQuery, handleSearchInputChange ,
            }}>
                {props.children}
            </myContext.Provider>
 
        </div>
    )
}
 
export default Mystate