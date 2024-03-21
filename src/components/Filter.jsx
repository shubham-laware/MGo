
 function Filter({brand}){
    return(

        <>
         <div className="col-md-2 filter-s ">
                <div className='shadow filter-bg'>
                    <form>
                        <div className="form-group mt-1">
                            <h6 htmlFor="distanceFilter">Filter</h6>
                            <label htmlFor="priceFilter">Set Distance</label>

                            <select className="form-control rounded-pill mt-1" id="distanceFilter ">
                                <option value="">All</option>
                                <option value="5 miles">5 miles</option>
                                <option value="10 miles">10 miles</option>

                            </select>
                        </div>
                        <div className="form-group mt-1">
                            <label htmlFor="priceFilter">{brand} Set Price</label>
                            <select className="form-control rounded-pill mt-1" id="priceFilter">
                                <option value="">All</option>
                                <option value="$10.99">$10.99</option>
                                <option value="$19.99">$19.99</option>

                            </select>
                        </div>
                        <div className="form-group mt-1">
                            <label htmlFor="categoryFilter">Category</label>
                            <select className="form-control rounded-pill mt-1" id="categoryFilter">
                                <option value="">All</option>
                                <option value="Womens">Womens</option>
                                <option value="Mens">Mens</option>
                                <option value="Kids">Kids</option>
                                <option value="Kitchen">Kitchen</option>
                                <option value="Music">Music</option>
                            </select>
                        </div>
                        <div className="form-group mt-1">
                            <label htmlFor="accesFilter">Accessories</label>
                            <select className="form-control rounded-pill mt-1" id="accesFilter">
                                <option value="">All</option>
                                <option value="Mens">Mens</option>
                                <option value="Womens">Womens</option>
                                <option value="Kids">Kids</option>
                            </select>
                        </div>
                        <div className="form-group mt-2">
                            Todays deals
                        </div>
                        <div className="form-group mt-1">
                            Offers
                        </div>
                        <div className="form-group mt-1">
                            Trending
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
        
     
 }

 export default Filter;