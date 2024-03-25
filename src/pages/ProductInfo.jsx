import React, { useEffect } from 'react'
import LeftSection from '../components/ProductInfo/LeftSection'
import RightSection from '../components/ProductInfo/RightSection'
import { useParams } from 'react-router-dom'
import Slider from '../components/ProductInfo/BestSeller';
import BestSeller from '../components/ProductInfo/BestSeller';
import Recommendations from '../components/ProductInfo/Recommendations';


function ProductInfo() {
    const {id}=useParams();

    useEffect(()=>{
      window.scrollTo(0, 0);
    },[id])
    // console.log('Product Id:',id)
  return (
    <main className="min-vh-100 py-4  px-md-5 " style={{marginTop:'125px'}}>
        <div className="container-fluid  px-md-5  d-flex flex-column gap-4">
          <div className="row  gap-2 px-md-5 ">
            <div className="col ">
              <LeftSection  productId={id}/>
            </div>
            <div className="col my-2 my-md-0">
              <RightSection productId={id}/>
            </div>
          </div>


          <div className='container w-100 px-md-4'>
          <div className="row py-2 px-md-4">
              <div className="py-4 d-flex flex-column gap-2 ">
                <h2 className=" fs-5 text-center text-md-start">Best Sellers</h2>
                <BestSeller />
              </div>
              <div className="py-4 d-flex flex-column gap-2 ">
                <h2 className=" fs-5 text-center text-md-start">Recommendations</h2>
                <Recommendations />
              </div>
            </div>

            
          </div>
  
        </div>
      </main>
  )
}

export default ProductInfo
