
 function Filter({brand}){
    return(

        <>
          <div class="col-md-2 filter-s ">
              <div className='shadow filter-bg'>
                <form>
                    <div class="form-group ">
                        <h6 for="distanceFilter">Filter</h6>
                        <label for="priceFilter">Set Distance</label>

                        <select class="form-control rounded-pill" id="distanceFilter">
                            <option value="">All</option>
                            <option value="5 miles">5 miles</option>
                            <option value="10 miles">10 miles</option>
                            
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="priceFilter">{brand} Set Price</label>
                        <select class="form-control rounded-pill" id="priceFilter">
                            <option value="">All</option>
                            <option value="$10.99">$10.99</option>
                            <option value="$19.99">$19.99</option>
                       
                        </select>
                    </div>
                </form>
                </div>
            </div>
        </>
    )
        
     
 }

 export default Filter;