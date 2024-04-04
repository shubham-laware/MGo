import React,{useEffect,useState} from "react";
import img1 from '../../assets/MicrosoftTeams-image.png'
import img2 from '../../assets/Ultra realistic full body photo of a French male m (2).jpg'
import img3 from '../../assets/Ultra realistic full body photo of a French male m.jpg'
import img4 from '../../assets/Photo ultra définition.jpg'
import img5 from '../../assets/Photo ultra définition (1).jpg'
import img6 from '../../assets/Ultra realistic full body photo of a French male m (1).jpg'
import img7 from '../../assets/best-deal3-removebg-preview.png'
import img8 from '../../assets/A light blue skirt set with an A-line ankle-length (1).jpg'
import img9 from '../../assets/The indian woman wearing a black dress is posing i.jpg'
import img10 from '../../assets/happy alien. 25 year old male.jpg'



const Blog = () => {
    const [blogs, setBlogs] = useState([]);


    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchBlogs = async () => {
            try {
                const response = await axios.get(
                    "https://minitgo.com/api/fetch_blog.php"
                );
                setBlogs(response.data.data);
            } catch (error) {
                console.error(error);
            }
        };


        fetchBlogs();
    }, []);

    return (
        <>
            <div className="d-flex flex-column container">
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <div className="col-12  mt-3"style={{marginTop:''}}>
                    <div className="image-container mx-auto" style={{ position: 'relative', overflow: 'hidden' ,width:'100%'  }}>
                        <img src={img1} alt="xd" style={{ width: '100%', display: 'block', marginTop: '' }} />
                        <div className="text-overlay mb-5" style={{ position: 'absolute', bottom: '0', left: '0', width: '100%', padding: '20px', boxSizing: 'border-box' }}>
                            <h4 style={{ color: 'white', margin: '0' }}>MINITGO</h4>
                            <h1 style={{ color: 'white', margin: '0' }}>Supreme Summer Sale</h1>
                            <p style={{ color: 'white', margin: '0' }}>Up to 50% off</p>
                        </div>
                    </div>


                </div>
                <div className="row  justify-content-center  w-100">
                    <h2 className="mt-5 mb-5">Spring Sale Per Category</h2>

                    <div className="col-sm-4 mt-2 col-md-2 text-center" style={{ overflow: 'hidden',  }}>
                        <img src={img6} alt="Image 1" className="img-fluid" style={{ height: '13rem', width: '15rem' }} />
                        <h4>Outwear</h4>
                    </div>

                    <div className="col-sm-4 mt-2 col-md-2 mx-4 text-center" style={{ overflow: 'hidden',  }}>
                        <img src={img8} alt="Image 2" className="img-fluid" style={{ height: '13rem', width: '15rem' }} />
                        <h4>Trending</h4>
                    </div>

                    <div className="col-sm-4 mt-2 col-md-2 mx-4 text-center" style={{ overflow: 'hidden',  }}>
                        <img src={img7} alt="Image 3" className="img-fluid" style={{ height: '13rem', width: '15rem' }} />
                        <h4>Footwear</h4>
                    </div>
                </div>


                <div className="row mt-5  ">
                    <h2 className="mt-5 text-center w-100">New Arrivals</h2>
                </div>
                <div className="row m-3 ">
                    <div className="col-sm-4 mt-5 position-relative" style={{ paddingRight: 0 }}>
                        <img src={img4} alt="Image 1" className="img-fluid h-100 w-100" />
                        <div className="text-overlay mb-3" style={{ position: 'absolute', bottom: '0', left: '0', width: '100%', padding: '20px', boxSizing: 'border-box' }}>
                            <h3 style={{ color: 'white', margin: '0' }}>The Pantsuit <br></br> Collection</h3>
                        </div>
                    </div>
                    <div className="col-sm-4 mt-5 position-relative" style={{ paddingLeft: 0, paddingRight: 0 }}>
                        <img src={img2} alt="Image 2" className="img-fluid h-100 w-100" />
                        <div className="text-overlay mb-3" style={{ position: 'absolute', bottom: '0', left: '0', width: '100%', padding: '20px', boxSizing: 'border-box' }}>
                            <h3 style={{ color: 'white', margin: '0' }}>Sharp and sweet Menswear</h3>
                        </div>
                    </div>
                    <div className="col-sm-4 mt-5 position-relative" style={{ paddingLeft: 0 }}>
                        <img src={img5} alt="Image 3" className="img-fluid h-100 w-100" />
                        <div className="text-overlay mb-3" style={{ position: 'absolute', bottom: '0', left: '0', width: '100%', padding: '20px', boxSizing: 'border-box' }}>
                            <h3 style={{ color: 'white', margin: '0' }}>Adventures Await Accessories</h3>
                        </div>
                    </div>
                </div>


            




<div className="row justify-content-center w-100">
    <h2 className="mt-5 mb-5">Bestsellers by Category</h2>
    <div className="col-sm-4 mt-2 col-md-2 position-relative text-center" style={{ overflow: 'hidden', height: '13rem', width: '13rem' }}>
        <img src={img6} alt="Image 1" className="img-fluid" style={{ height: '100%', width: '100%' }} />
        <h5 className="image-overlay" style={{ position: 'absolute', top: '80%', left: '50%', transform: 'translate(-50%, -50%)', color: 'white' }}>Dresses</h5>
    </div>
    <div className="col-sm-4 mt-2 col-md-2 mx-4 position-relative text-center" style={{ overflow: 'hidden', height: '13rem', width: '13rem' }}>
        <img src={img3} alt="Image 2" className="img-fluid" style={{ height: '100%', width: '100%' }} />
        <h5 className="image-overlay" style={{ position: 'absolute', top: '80%', left: '50%', transform: 'translate(-50%, -50%)', color: 'white' }}>Knitwear</h5>
    </div>
    <div className="col-sm-4 mt-2 col-md-2 mx-4 position-relative text-center" style={{ overflow: 'hidden', height: '13rem', width: '13rem' }}>
        <img src={img9} alt="Image 3" className="img-fluid" style={{ height: '100%', width: '100%' }} />
        <h5 className="image-overlay" style={{ position: 'absolute', top: '80%', left: '50%', transform: 'translate(-50%, -50%)', color: 'white' }}>CropTops</h5>
    </div>
</div>







                <div className="mt-5" style={{ position: 'relative', height: '250px', overflow: 'hidden' }}>
                    <img src={img10} alt="Image" style={{ width: '100%', height: 'auto', position: 'absolute', top: '50%', transform: 'translateY(-50%)' }} />
                    <div style={{ position: 'absolute', top: '50%', left: '25%', transform: 'translate(-50%, -50%)', color: 'white' }}>
                        <h2 style={{ margin: '0', fontSize: '45px', color: 'white' }}>Visit Our<br></br>Physical Stores</h2>
                    </div>
                </div>





                <div className="mt-5" >
                    {/*  */}

                    <div className="image-container" style={{ position: 'relative', overflow: 'hidden' ,height:'700px' }}>
                        <img src={img5} alt="xd" style={{ width: '100%', display: 'block',  }} />
                        <div className="text-overlay d-flex flex-column justify-content-start align-items-center" style={{ position: 'absolute', top: '0', left: '0', width: '100%', padding: '20px', boxSizing: 'border-box' }}>
                            <hr className="hr" style={{ borderColor: 'white' }} />
                            <h1 style={{ color: 'white', margin: '0' }}>Need Anything?</h1>
                            <hr className="hr" style={{ borderColor: 'white' }} />
                            <div className="d-flex justify-content-between pt-3 mt-5 gap-4" style={{ color: 'white', margin: '0' }}>
                                <p className="mb-0" style={{ marginRight: '' }}>FAQs</p>
                                <p className="text-muted mb-0">
                                    <span className="me-4" style={{ color: 'white', }}>Click here</span>{" "}
                                </p>
                            </div>
                            <hr className="hr" style={{ borderColor: 'white' }} />
                            <div className="d-flex justify-content-between pt-3 gap-4" style={{ color: 'white', margin: '0' }}>
                                <p className="mb-0" style={{ marginRight: '' }}>Track my Parcel</p>
                                <p className="text-muted mb-0">
                                    <span className="me-4" style={{ color: 'white' ,margin:'0' }}>Click here</span>{" "}
                                </p>
                            </div>
                            <hr className="hr" style={{ borderColor: 'white' }} />
                            <div className="d-flex justify-content-between pt-3 gap-4" style={{ color: 'white', margin: '0' }}>
                                <p className="mb-0" style={{ marginRight: '' }}>Email Address</p>
                                <p className="text-muted mb-0">
                                    <span className="me-4" style={{ color: 'white', margin: '0' }}>minitgo@gmail.com</span>{" "}
                                </p>
                            </div>
                            <hr className="hr" style={{ borderColor: 'white' }} />
                            <div className="d-flex justify-content-between pt-3" style={{ color: 'white', margin: '0' }}>
                                <p className="mb-0" style={{ marginRight: '2rem' }}>Socials</p>
                                <p className="text-muted mb-0">
                                    <span className="me-4" style={{ color: 'white', margin: '0' }}>@reallygreatsite</span>{" "}
                                </p>
                            </div>
                        </div>
                    </div>



                </div>
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br /><br />

            </div>
        </>

    );
};

export default Blog;
