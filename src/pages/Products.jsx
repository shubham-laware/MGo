import React, { useState } from 'react'; 
import { FaLocationDot } from "react-icons/fa6"; 
import Filter from '../components/Filter';
import Ban from '../components/images/product.png'
import { Link } from 'react-router-dom';
import { products } from '../components/ProductInfo/data.js';
import StarRatings from '../components/ProductInfo/StarRatings.jsx';

const HomeProducts = () => {
return(
<>
<br></br>
<br></br>
<br></br>
<br></br>
<br></br>
<br></br>
<br></br>
<div className="container">
        <h6>|<FaLocationDot className='fs-3 p-1'/>Find Near You </h6>
        <div className="row">
           
          <Filter brand="Test" />
             
            <div className="col-md-10">
                <div className="row ">

                    {products.map((product,index)=>
                         <div key={index} className="col-6 col-sm-3 py-2  ">
                         <div className="product-card  ">
                         <Link to={`/${product.id}`} style={{ textDecoration: 'none',color:'black' }}>
                             <div className="product-image">
                                 <img src={product.imageurl}   alt="Product 1"/>
                                
       
                              <div className="offer-tag bg-warning rounded-pill text-center p-1 text-light" >{product.percentOff} Off</div>
        
    
                             </div>
                             <div className='product-content'>
                             <h6>{product.productTitle} </h6>
                             <h5>Price: <sup>&#x20B9;</sup>{product.price}<span className='text-decoration-line-through text-muted fs-6 fw-light'>599</span>
                             <span className='text-muted' style={{fontSize:'13px'}}> {product.stock}</span></h5>
                             <p className="product-rating text-warning">
                                 Rating: <StarRatings rating={product.rating}/> 
                             </p>
                             <p className="product-distance text-secondary ">
                                Distance: {product.distance}km away.
                             </p>
                             
                             
                             </div>
 
                             </Link>
                         </div>
                     
                     </div>
                    )}
                     
                   
                   
                </div>
            </div>
        </div>
    </div>
     
</>
);

}

export default HomeProducts;
