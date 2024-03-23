
import React, { useEffect, useState } from 'react';
import products from './data.js';
import axios from 'axios';



function CarouselComponent({productId}) {

  const [product, setProduct] = useState({});
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('https://minitgo.com/api/fetch_products.php')
      .then(response => {
        const products = response.data.data;
        const selectedProduct = products.find(p => p.product_id === productId);
        if (selectedProduct) {
          setProduct(selectedProduct);
          const productImages = [];
          // Assuming product_image1 and product_image2 are properties of the product object
          if (selectedProduct.product_image1) {
            productImages.push(selectedProduct.product_image1);
          }
          if (selectedProduct.product_image2) {
            productImages.push(selectedProduct.product_image2);
          }
          setImages(productImages);
        } else {
          setError("Product not found");
        }
      })
      .catch(error => {
        setError(error);
      });
  }, [productId]);



    return (
      
      <div id="carouselExampleIndicators" className=" carousel slide v " data-bs-ride="carousel" style={{height:'520px'}}>
        <div className="carousel-inner rounded h-100">
          {images.map((img, index) => (
            <div key={index} className={` h-100 carousel-item${index === 0 ? ' active' : ''}`}  >
              <img className="d-block w-100 h-100" src={img} alt={`Slide ${index}`} />
            </div>
          ))}
        </div>
        <button className="carousel-control-prev  bg-secondary " type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev" style={{height:"30px", top:"50%",width:"40px"}}>
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next bg-secondary " type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next" style={{height:"30px", top:"50%",width:"40px"}}>
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      )
  }
  
  export default CarouselComponent;
  