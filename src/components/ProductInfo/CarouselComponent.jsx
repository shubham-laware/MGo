
import React from 'react';
import products from './data.js';


function CarouselComponent({productId}) {

    const id=productId

    const item= products.filter(product=>product.id===id)
    const product=item[0];
   const images=product.images

    return (
      <div id="carouselExampleIndicators" className="  carousel slide v" data-bs-ride="carousel">
        <div className="carousel-inner rounded">
          {images.map((img, index) => (
            <div key={index} className={` carousel-item${index === 0 ? ' active' : ''}`} >
              <img className="d-block w-100" src={img} alt={`Slide ${index}`} />
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
      </div>)
  }
  
  export default CarouselComponent;
  