

import React, { useState ,useEffect} from 'react'; 
import axios from 'axios';
import { FaLocationDot } from "react-icons/fa6"; 
import Filter from '../components/Filter';
import { Link } from 'react-router-dom';
import StarRatings from '../components/ProductInfo/StarRatings.jsx';

const HomeProducts = () => {

    const [products, setProducts] = useState([]);
const [filteredProducts, setFilteredProducts] = useState([]);
const [error, setError] = useState(null);
const [selectedCategory, setSelectedCategory] = useState(''); 

 
    useEffect(() => {
        axios.get('https://minitgo.com/api/fetch_products.php')
            .then(response => {
                setProducts(response.data.data);
                setFilteredProducts(response.data.data); 
                setSelectedCategory(response.data.data.category)
                console.log(selectedCategory)
            })
            .catch(error => {
                setError(error);
            });
    }, []);
    
      const handleCategoryChange = (selectedCategory) => {
        if (selectedCategory === '') {
            setFilteredProducts(products); 
        } else {
            const filtered = products.filter(product => product.category === selectedCategory);
            setFilteredProducts(filtered); 
        }
    };
    
  console.log(filteredProducts)
  
  console.log( selectedCategory)
return(
    <>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br />
    <div className="container">
        <h6>|<FaLocationDot className='fs-3 p-1' />Find Near You </h6>
        <div className="row">
            <Filter brand='Test' onCategoryChange={handleCategoryChange} />
            <div className="col-md-10">
                <div className="d-flex gap-2 flex-wrap">
                    {filteredProducts.map((product, index) => (
                        <div key={index} className="col-6 col-sm-3 py-2" style={{ width: '220px' }}>
                            <div className="product-card">
                                <Link to={`/${product.product_id}`} style={{ textDecoration: 'none', color: 'black' }}>
                                    <div className="product-image" style={{ "height": "250px" }}>
                                        <img src={product.product_image1} alt="Product 1" className="h-100 img-fluid" />
                                    </div>
                                    <div className="offer-tag bg-warning rounded-pill text-center p-1 text-light">{product.offers}% Off</div>
                                    <div className='product-content'>
                                        <h6>{product.product_name}</h6>
                                        <h5>Price: <sup>&#x20B9;</sup>{product.product_price}<span className='text-decoration-line-through text-muted fs-6 fw-light'>599</span>
                                            <span className='text-muted' style={{ fontSize: '13px' }}> {product.product_stock}</span></h5>
                                        <div className="product-rating text-warning">
                                            Rating: <StarRatings rating={product.product_ratings} />
                                        </div>
                                        <p className="product-distance text-secondary">
                                            Distance: {product.distance}km away.
                                        </p>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
</>
);

}

export default HomeProducts;