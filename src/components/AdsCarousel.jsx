import React, { useState } from 'react';

function AdsCarousel({ productImages }){
  const [currentSlide, setCurrentSlide] = useState(0);

  const goToPrevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? productImages.length - 1 : currentSlide - 1);
  };

  const goToNextSlide = () => {
    setCurrentSlide(currentSlide === productImages.length - 1 ? 0 : currentSlide + 1);
  };

  return (
    <div className="vertical carousel slide" data-bs-ride="carousel" style={{ height: '100%', overflow: 'hidden' }}>
      <div className="carousel-inner h-100" style={{ display: 'flex', flexDirection: 'column' }}>
        {productImages.map((image, index) => (
          <div key={index} className={`h-100 carousel-item ${index === currentSlide ? 'active' : ''}`} style={{ transform: 'rotate(90deg)' }}>
            <img className="d-block w-100 h-100" src={image} alt={`Slide ${index + 1}`} style={{ transform: 'rotate(-90deg)' }} />
          </div>
        ))}
      </div>
      <button className="carousel-control-prev" type="button" onClick={goToPrevSlide} style={{ bottom: 'auto', width: '30px', height: '10%',left:'40%' }}>
        <span className="carousel-control-prev-icon" aria-hidden="true" style={{ transform: 'rotate(90deg)' }}></span>
        <span className="sr-only">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" onClick={goToNextSlide} style={{ top: 'auto', bottom: '0', width: '30px', height: '10%',right:'40%',}}>
        <span className="carousel-control-next-icon" aria-hidden="true" style={{ transform: 'rotate(90deg)' }}></span>
        <span className="sr-only">Next</span>
      </button>
    </div>
  );
};

export default AdsCarousel;
