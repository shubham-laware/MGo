import React, { useEffect, useState } from "react";
import img1 from '../../assets/blogPage/lightBlueGirl.jpg'
import img2 from '../../assets/Ultra realistic full body photo of a French male m (2).jpg'
import img3 from '../../assets/Ultra realistic full body photo of a French male m.jpg'
import img4 from '../../assets/Photo ultra définition.jpg'
import img5 from '../../assets/blogPage/lastOne.jpg'
import img6 from '../../assets/Ultra realistic full body photo of a French male m (1).jpg'
import img7 from '../../assets/best-deal3-removebg-preview.png'
import img8 from '../../assets/A light blue skirt set with an A-line ankle-length (1).jpg'
import img9 from '../../assets/The indian woman wearing a black dress is posing i.jpg'
import img10 from '../../assets/blogPage/men.jpg'



const Blog = () => {
    //     const [blogs, setBlogs] = useState([]);
    //     // "https://minitgo.com/api/fetch_blog.php"

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await fetch('https://minitgo.com/api/fetch_blog.php');
    //             const result = await response.json();
    //             setBlogs(result.data || []); // Fallback to an empty array if data is not present
    //             console.log('Fetched Blogs:', result.data);
    //         } catch (error) {
    //             console.error('Fetching blogs failed:', error);
    //         }
    //     };

    //     fetchData();
    // }, []);

    useEffect(()=>{
        window.scrollTo(0, 0);
      },[])
    return (
        <div className="mt-3 mt-md-5"> 
            <div className="container shadow bg-body rounded border border-1 mb-3 mt-5 p-0">
                <div className="row after:col-12  m-0 ">
                    <div className="mx-auto p-0 " style={{ position: 'relative', overflow: 'hidden', width: '100%' }}>
                        <img className="img-fluid " src={img1} alt="xd" style={{ width: '100%', height: "90vh", display: 'block', marginTop: '' }} />
                        <div className="text-overlay mb-5" style={{ position: 'absolute', bottom: '0', left: '0', width: '100%', padding: '20px', boxSizing: 'border-box' }}>
                            <h3 className="text-white fw-normal mx-5" style={{ letterSpacing: "5px" }}>MINITGO</h3>
                            <h1 className="text-white fw-normal mx-5" style={{ fontSize: "60px" }}>Supreme Summer Sale</h1>
                            <h3 className="text-white fw-normal mx-5" style={{ fontSize: "60px" }}>Up to 50% off</h3>
                        </div>
                    </div>
                </div>
            </div>


            <div className="container shadow bg-body rounded  border border-1 mb-3" >
                <h1 className="text-black fw-normal text-center mt-5" style={{ letterSpacing: "5px" }}>Spring Sale Per Category</h1>
                <div className="img-block d-flex justify-content-evenly align-items-center my-5 py-5 flex-wrap">
                    <div className="col-sm-4 mt-2 col-md-2 text-center" style={{ overflow: 'hidden', }}>
                        <img src={img6} alt="Image 1" className="img-fluid" style={{ height: '16rem', width: '16rem' }} />
                        <h3 className="mt-4">Outwear</h3>
                    </div>

                    <div className="col-sm-4 mt-2 col-md-2 mx-4 text-center" style={{ overflow: 'hidden', }}>
                        <img src={img8} alt="Image 2" className="img-fluid" style={{ height: '16rem', width: '16rem' }} />
                        <h3 className="mt-4">Trending</h3>
                    </div>

                    <div className="col-sm-4 mt-2 col-md-2 mx-4 text-center" style={{ overflow: 'hidden', }}>
                        <img src={img6} alt="Image 3" className="img-fluid" style={{ height: '16rem', width: '16rem' }} />
                        <h3 className="mt-4">Footwear</h3>
                    </div>
                </div>
            </div>

            <div className="container shadow bg-body rounded  border border-1 mb-3">
                <h1 className="text-black fw-normal text-center mt-5" style={{ letterSpacing: "5px" }}>New Arrivals</h1>
                <div className="row">
                    <div className="col-sm-4 mt-5 position-relative p-0" style={{ paddingLeft: 0, paddingRight: 0 }}>
                        <img src={img4} alt="Image 1" className="img-fluid w-100" style={{ height: "501px" }} />
                        <div className="text-overlay mb-3" style={{ position: 'absolute', bottom: '0', left: '0', width: '100%', padding: '20px', boxSizing: 'border-box' }}>
                            <h1 className="text-center text-white fw-normal">The Pantsuit <br></br> Collection</h1>
                        </div>
                    </div>
                    <div className="col-sm-4 mt-5 position-relative p-0" style={{ paddingLeft: 0, paddingRight: 0 }}>
                        <img src={img2} alt="Image 2" className="img-fluid w-100" style={{ height: "501px" }} />
                        <div className="text-overlay mb-3" style={{ position: 'absolute', bottom: '0', left: '0', width: '100%', padding: '20px', boxSizing: 'border-box' }}>
                            <h1 className="text-center text-white fw-normal" >Sharp and sweet Menswear</h1>
                        </div>
                    </div>
                    <div className="col-sm-4 mt-5 position-relative p-0" style={{ paddingLeft: 0, paddingRight: 0 }}>
                        <img src={img5} alt="Image 3" className="img-fluid  w-100" style={{ height: "501px" }} />
                        <div className="text-overlay mb-3" style={{ position: 'absolute', bottom: '0', left: '0', width: '100%', padding: '20px', boxSizing: 'border-box' }}>
                            <h1 className="text-center text-white fw-normal ">Adventures Await Accessories</h1>
                        </div>
                    </div>
                </div>
            </div>

            
            <div className="container shadow bg-body rounded border border-1 mb-3">
                <h1 className="text-black fw-normal text-center mt-5" style={{ letterSpacing: "5px" }}>Bestsellers by Category</h1>
                <div className="row justify-content-center align-items-center my-5 py-5">
                    <div className="col-12 col-md-3 mt-2 text-center position-relative">
                        <img src={img6} alt="Image 1" className="img-fluid" />
                        <h3 className="image-overlay text-white" style={{ position: 'absolute', bottom: '10%', left: '50%', transform: 'translateX(-50%)', letterSpacing: "3px" }}>Dresses</h3>
                    </div>
                    <div className="col-12 col-md-3 mt-2 mx-4 text-center position-relative">
                        <img src={img3} alt="Image 2" className="img-fluid"  />
                        <h3 className="image-overlay text-white" style={{ position: 'absolute', bottom: '10%', left: '50%', transform: 'translateX(-50%)', letterSpacing: "3px" }}>Knitwear</h3>
                    </div>
                    <div className="col-12 col-md-3 mt-2 mx-4 text-center position-relative">
                    <img src={img6} alt="Image 2" className="img-fluid"  />
                        <h3 className="image-overlay text-white" style={{ position: 'absolute', bottom: '10%', left: '50%', transform: 'translateX(-50%)', letterSpacing: "3px" }}>Crop Top</h3>
                    </div>
                </div>
            </div>




            <div className="container shadow bg-body rounded  border border-1 mb-3 p-0 visit-container" style={{ height: "80vh" }}>
                <div className="" style={{ position: 'relative', height: '450px', overflow: 'hidden' }}>
                    <img src={img10} className="visitImage" alt="Image" style={{ width: '100%', height: '45rem', position: 'absolute', top: '50%', transform: 'translateY(-50%)' }} />
                    <div style={{ position: 'absolute', top: '50%', left: '25%', transform: 'translate(-50%, -50%)', color: 'white' }}>
                        <h1 className="text-white visit-title" style={{ margin: '0', fontSize: '65px', letterSpacing: "5px" }}>Visit Our<br></br>Physical Stores</h1>
                        <button className="btn btn-lg btn-primary px-5 mt-5 visit-button">Visit</button>
                    </div>

                </div>
            </div>

            <div className="container shadow bg-body rounded  border border-1 mb-4 p-0">
                <div className="m-0 p-0" style={{ position: 'relative', overflow: 'hidden' }}>
                    <img src={img5} alt="xd" style={{ width: '100%', display: 'block', height: "100vh" }} />
                    <div className="" style={{ position: 'absolute', top: '0', left: '0', width: '100%', padding: '20px', boxSizing: 'border-box' }}>
                        <h1 className="text-white mt-5 text-center" style={{ margin: '0', letterSpacing: "5px" }}>Need Anything?</h1>
                        <div className="mt-5 pt-5 " >
                            <hr className="hr text-white mt-5 pt-5" style={{ position: 'absolute', borderColor: 'white', width: '100%', margin: '0', opacity: "2.25" }} />
                            <div className="d-flex gap-1 pt-3 mt-5 info-div text-center" style={{ color: 'white', margin: '0' }}>
                                <h3 className="mb-0 w-25 ">FAQs</h3>
                                <h4 className="mb-0 text-white w-25 ">Click here</h4>
                            </div>
                            <hr className="hr text-white mt-1 pt-1" style={{ position: 'absolute', borderColor: 'white', width: '100%', margin: '0', opacity: "2.25" }} />
                            <div className="d-flex gap-1 pt-3 info-div text-center" style={{ color: 'white', margin: '0' }}>
                                <h3 className="mb-0 w-25 ">Track My Parcel</h3>
                                <h4 className="mb-0 text-white w-25 ">Click here</h4>
                            </div>
                            <hr className="hr text-white mt-1 pt-1" style={{ position: 'absolute', borderColor: 'white', width: '100%', margin: '0', opacity: "2.25" }} />
                            <div className="d-flex gap-1 pt-3 info-div text-center" style={{wordWrap: "break-word", margin: '0' }}>
                                <h3 className="mb-0 w-25 text-white" >Email Address</h3>
                                <h4 className="mb-0 text-white w-25 ">hello@gmail.com</h4>
                            </div>
                            <hr className="hr text-white mt-1 pt-1" style={{ position: 'absolute', borderColor: 'white', width: '100vw', margin: '0', opacity: "2.25" }} />
                            <div className="d-flex gap-1 pt-3 info-div text-center" style={{ color: 'white', margin: '0' }}>
                                <h3 className="mb-0 w-25 ">Socials</h3>
                                <h4 className="mb-0 text-white w-25 ">grate</h4>
                            </div>
                        </div>
                    </div>
                </div>


            </div>


        </div>

    );
};

export default Blog;

