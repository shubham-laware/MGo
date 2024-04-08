import React from 'react';
import image from "../assets/addImage1.png"
import { FaXTwitter, FaFacebook, FaSquareInstagram } from "react-icons/fa6";

const Advertisement = () => {
    return (
        <div className="container my-5 rounded-4" style={{ backgroundColor: "#e4d6d2" }}>
            <div className="row p-5">
                <div className="col-md-8 order-md-1">
                    <h2 className="fw-bold text-start">MINITGO</h2>
                    <p className="lead fw-normal">get delivery in minits</p>
                    <h2 className="mb-3 fw-bolder text-start lh-1" style={{ fontSize: "55px", letterSpacing: "2px" }}>Shop until you find the product you're looking for</h2>
                    <div className="mt-5">
                        <p className="mb-4 fs-5">Shopping sprees are now so much easier, with the best's top brands at your fingertips. Simply click and go to find near me the best finds in fashion, music, homeware, and more!</p>
                    </div>
                    <div className="col-md-2 d-flex justify-content-center align-items-center gap-2 mt-5 social-icons">
                        <a href="https://facebook.com" className="social-icon p-1" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", color: "#000" }}>
                            <FaFacebook style={{ height: "2rem", width: "2rem" }} />
                        </a>
                        <a href="https://instagram.com" className="social-icon p-1" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", color: "#000" }}>
                            <FaSquareInstagram style={{ height: "2rem", width: "2rem" }} />
                        </a>
                        <a href="https://twitter.com" className="social-icon p-1" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", color: "#000" }}>
                            <FaXTwitter style={{ height: "2rem", width: "2rem" }} />
                        </a>
                    </div>
                    <p className='fs-4 d-none d-md-block mt-3'>LAUNCHING SOON...</p>



                </div>



                <div className="col-md-4 order-md-1">

                    <div className="left-side-content d-none ">
                        <div className="d-flex gap-3 flex-wrap ">
                            <img src='/appstore.png' alt="App Image" className="app-image bg-light border-none" style={{ height: "4rem" }} />
                            <img src='/googlePlay.png' alt="App Image" className="app-image " style={{ height: "4rem" }} />
                        </div>
                    </div>

                    {/*Shafeeq updated this to display image under launching soon in mobile screen*/}
                    <div className="text-center">
                        <img src={image} id='adds-image' alt="App Image" className="app-image img-fluid mt-3 mt-md-0" style={{ width: "20rem", height: "35rem" }} />
                    </div>
                    <p className='fs-4 d-md-none d-block mt-5'>LAUNCHING SOON...</p> {/* Display only on mobile */}

                </div>

            </div>
            <div className="d-flex gap-1 flex-wrap   ">
                <img src='/appstore.png' alt="App Image" className="app-image bg-light border-none mb-5" style={{ height: "4rem" }} />
                <img src='/googlePlay.png' alt="App Image" className="app-image " style={{ height: "4rem" }} />
            </div>


        </div>






    )
}

export default Advertisement