import React from 'react';
import image from "../assets/addImage1.png"

const Advertisement = () => {
    return (
        <div className="container my-5" style={{ backgroundColor: "#e4d6d2" }} >
            <div className="row p-5 " >
                <div className="col-md-8 " >
                    <h2 className="fw-bold text-start">MINITGO</h2>
                    <p className="lead fw-normal">get delivery in minits</p>
                    <h2 className="mb-3 fw-bolder text-start lh-1" style={{ fontSize: "55px", letterSpacing: "2px" }}>Shop until you find the product you're looking for</h2>
                    <div className="mt-5" >
                        <p className="mb-4 fs-5" >Shopping sprees are now so much easier, with the best's top brands at your fingertips. Simply click and go to find near me the best finds in fashion, music, homeware, and more!</p>
                    </div>
                    <p className='fs-4'>LAUNCHING SOON...</p>
                    <div className="d-flex gap-3 flex-wrap">
                        <img src='/appstore.png' alt="App Image" className="app-image bg-light border-none" style={{ height: "4rem" }} />
                        <img src='/googlePlay.png' alt="App Image" className="app-image " style={{ height: "4rem" }} />

                    </div>
                    <div className="col-md-4 d-flex gap-2 mt-5 ">
                        <span className='border border-black rounded-circle px-4 py-3' ><i className="fa fa-facebook" aria-hidden="true" style={{ color: "#000" }}></i></span>
                        <span className='border border-black rounded-circle px-4 py-3'><i class="fa fa-instagram" aria-hidden="true" style={{ color: "#000" }}></i></span>
                        <span className='border border-black rounded-circle px-4 py-3'><i class="fa fa-twitter" aria-hidden="true" style={{ color: "#000" }}></i></span>

                    </div>

                </div>
                <div className="col-md-4" >
                    <div className="text-center">
                        <img src={image} alt="App Image" className="app-image" style={{ width: "20rem",height:"35rem" }} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Advertisement