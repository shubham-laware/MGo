import React from 'react'
import { Link } from 'react-router-dom'
import StarRatings from './StarRatings'

function ProductCard({product}) {
  return (
    <div className="col-6 col-sm-3 py-2 w-100 ">
    <div className="product-card  ">
        {/* <Link to={`/${product.id}`}> */}
        <div className="product-image">
            <img src={product.imageurl}   alt="Product 1"/>
           

         <div className="offer-tag bg-warning rounded-pill text-center p-1 text-light" >{product.percentOff} Off</div>


        </div>
        <div className='product-content'>
        <h6>{product.productTitle} </h6>
        <h5>Price: <sup>&#x20B9;</sup>{product.price}<span className='text-decoration-line-through text-muted fs-6 fw-light'>599</span>
        <span className='text-muted' style={{fontSize:'13px'}}> {product.stock}</span></h5>
        <div className="product-rating text-warning">
            Rating: <StarRatings rating={product.rating}/> 
        </div>
        <p className="product-distance text-secondary  pt-2">
           Distance: {product.distance}km away.
        </p>
        
        
        </div>

        {/* </Link> */}
    </div>

</div>
  )
}

export default ProductCard
