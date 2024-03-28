import React, { useEffect } from 'react';
import LeftSection from '../components/ProductInfo/LeftSection';
import RightSection from '../components/ProductInfo/RightSection';
import { useParams } from 'react-router-dom';
import BestSeller from '../components/ProductInfo/BestSeller';
import Recommendations from '../components/ProductInfo/Recommendations';

function ProductInfo() {
    const { id } = useParams();

    const scrollToReviews = () => {
        const reviewsSection = document.getElementById("reviews-section");
        if (reviewsSection) {
            reviewsSection.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
        }
    };

    return (
        <main className="min-vh-100 py-4  px-md-5 " style={{ marginTop: '125px' }}>
            <div className="container-fluid  px-md-5  d-flex flex-column gap-4">
                <div className="row  gap-2 px-md-5 ">
                    <div className="col ">
                        <LeftSection productId={id} scrollToReviews={scrollToReviews} />
                    </div>
                    <div className="col my-2 my-md-0">
                        <RightSection productId={id} />
                    </div>
                </div>

                <div className='container w-100 px-md-4'>
                    <div className="row py-2 px-md-4">
                        <div className="py-4 d-flex flex-column gap-2 ">
                            <h2 className=" fs-5 text-center text-md-start">Best Sellers</h2>
                            <BestSeller />
                        </div>
                        <div className="py-4 d-flex flex-column gap-2 ">
                            <h2 className=" fs-5 text-center text-md-start " >Recommendations</h2>
                            <Recommendations />

                        </div>

                    </div>

             
                    <div id="reviews-section">
                 
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                          
                          <div className="h-120px w-100 d-flex flex-column gap-1 pt-2 ">
                            <h3 className='m-2'>Reviews</h3>
                          <div style={{}}>
                          
                            <ul
                              className="border  rounded p-2 h-100 "
                              style={{ scrollbarWidth: "thin", fontSize: "16px", listStyle: 'none' }}
                            >
                              <li className="py-3">
                                <span className="fw-semibold">Rajesh: </span>Products are really
                                good
                              </li>
                              <li className="border-top py-3">
                                <span className="fw-semibold">Rohit:</span> Good
                              </li>
                              <li className="border-top py-3">
                                <span className="fw-semibold">User381:</span> Quality awesome
                                with affordable price.
                              </li>
                              <li className="border-top py-3">
                                <span className="fw-semibold">Ajay:</span> Sustainable
                              </li>

                            </ul>
                          </div>
                        </div>


                    </div>
                    
                </div>

            </div>
        </main>
    )
}

export default ProductInfo;
