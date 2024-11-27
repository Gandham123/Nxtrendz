import "./index.css"
import ProductCard from "../ProductsCards"
import ProductsHeaderEl from "../ProductsHeader"
import CategoryItemsEl from "../CategoryItems"
import RatingItemEl from "../RatingItems"
import { Component } from "react"
import Cookies from "js-cookie"
import {ThreeDots} from "react-loader-spinner"
const sortByOptins=[
    {
      optionId:'PRICE_HIGH',
      displayText:'Price(High-Low)'
    },
    {
      optionId:'PRICE_LOW',
      displayText:'Price(Low-High)'
    }
]
const categoryList=[
    {
      id:'1',
      categoryName:'Clothing',
    },
    {
      id:'2',
      categoryName:'Electronics',
    },
    {
      id:'3',
      categoryName:'Appliances',
    },
    {
      id:'4',
      categoryName:'Grocery',
    },
    {
      id:'5',
      categoryName:'Toys',
    }
]
const ratingsList = [
    {
      ratingId: '4',
      imageUrl:
        'https://assets.ccbp.in/frontend/react-js/rating-four-stars-img.png',
    },
    {
      ratingId: '3',
      imageUrl:
        'https://assets.ccbp.in/frontend/react-js/rating-three-stars-img.png',
    },
    {
      ratingId: '2',
      imageUrl:
        'https://assets.ccbp.in/frontend/react-js/rating-two-stars-img.png',
    },
    {
      ratingId: '1',
      imageUrl:
        'https://assets.ccbp.in/frontend/react-js/rating-one-star-img.png',
    },
]
const apiStatusList={
  sucess:'SUCCESS',
  failure:'FAILURE',
  inProgress:'INPROGRESS'
}
class AllProductEl extends Component{
    state={
      productsList:[],
      activeOptionId:sortByOptins[0].optionId,
      inputValue:'',
      categoryItem:'',
      ratingItem:'',
      apiStaus:'',
    }
    componentDidMount(){
        this.getData()
      }
    getData=async()=>{
        this.setState({apiStaus:apiStatusList.inProgress})
        const{activeOptionId,inputValue,categoryItem,ratingItem}=this.state;
        const jwtToken = Cookies.get("AccessToken");
        const options={
          method:"GET",
          headers:{
            Authorization:`Bearer ${jwtToken}`
         },
        }
        const apiUrl=`https://apis.ccbp.in/products?sort_by=${activeOptionId}&category=${categoryItem}&title_search=${inputValue}&rating=${ratingItem}`
        const response= await fetch(apiUrl,options)
        if(response.ok===true){
          const data=await response.json()
          const ConvertingTocamelCase=data.products.map((eachItem)=>({
          id:eachItem.id,
          title:eachItem.title,
          imageUrl:eachItem.image_url,
          price:eachItem.price,
          rating:eachItem.rating,
          brand:eachItem.brand
        }));
        this.setState({productsList:ConvertingTocamelCase,apiStaus:apiStatusList.sucess})
        }
        else if(response.status===400){
          this.setState({apiStaus:apiStatusList.failure})
        }
    }
    updateActiveOptionId=activeOptionId=>{
        this.setState({activeOptionId},this.getData)
    }
    handlingChange=(event)=>{
        this.setState({inputValue:event.target.value})
    }
    keydownHandling=(event)=>{
        if(event.key==='Enter'){
            this.getData()
        }
    }
    updatingCategory=selecetdCategoryItem=>{
        this.setState({categoryItem:selecetdCategoryItem},this.getData)
    }
    updatingRating=selectedRatingItem=>{
       this.setState({ratingItem:selectedRatingItem},this.getData)
    }
    clearingFilters=()=>{
      this.setState({categoryItem:'',inputValue:'',ratingItem:'', activeOptionId:sortByOptins[0].optionId},this.getData)
    }
    render(){
        const{inputValue,activeOptionId,productsList,categoryItem,ratingItem,apiStaus}=this.state;
        let renderingBasedOnApiStatus=null
        if(apiStaus===apiStatusList.inProgress){
          renderingBasedOnApiStatus=<div>
          <div className="laoding-container-all-products">
            <ThreeDots color="#0b69ff" height="50" width="50" />
         </div>
        </div>
        }
        else if(apiStaus===apiStatusList.sucess){
          if(productsList.length!==0){
            renderingBasedOnApiStatus=<div>
            <div className="product-cards-container">
               {productsList.map((eachItem)=>(<ProductCard key={eachItem.id} productData={eachItem}/>))}
            </div> 
             </div>
           }
           else{
            renderingBasedOnApiStatus=<div className="product-not-found-container">
            <img src='https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-no-products-view.png' className="product-not-found-styling" alt="product-not-found"/>
            <h1 className="product-not-found-heading">No Products Found</h1>
            <p className="products-not-found-para">We could not find any products.Try Other Filters </p>
           </div>
           }
        }
        else if(apiStaus===apiStatusList.failure){
          renderingBasedOnApiStatus=<div className="failure-container">
          <img src='https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png' className="failure-image-styling" alt="failure-logo"/>
          <h1 className="failure-heading">Oops! Something Went Wrong</h1>
          <p className="failure-para">We are having some trouble processing your request.Please try again</p>
        </div>
        }
     return(
        <>
        <div className="products-header-main-bg-container">
        <div className="search-bar-container">
          <div className="search-input-container">
                <input type="search" placeholder="search" className="input-field-styling" onChange={this.handlingChange} onKeyDown={this.keydownHandling} value={inputValue}/>
                <img src="https://assets.ccbp.in/frontend/react-js/destinations-search-icon-img.png" alt="Search Icon" className="search-icon"/>
          </div>
           <h1 className="products-main-heading products-main-heading-hide-small-view">All Products</h1>
        </div>
          <div className="products-header-hide-small-view">
           <ProductsHeaderEl sortByOptins={sortByOptins} activeOptionId={activeOptionId} updateOption={this.updateActiveOptionId}/>
          </div>
        </div>
        <div className="filters-main-container">
            <div className="category-main-container">
              <h1 className="category-main-heading">Catrgory</h1>
               {categoryList.map((eachItem)=>(<CategoryItemsEl 
               key={eachItem.id} 
               categoryData={eachItem} 
               updatecategory={this.updatingCategory}
               isActive={categoryItem===eachItem.id}
               />))}
              <div className="rating-main-container">
                <h1 className="rating-main-heading">Rating</h1>
                {ratingsList.map((eachItem)=>(<RatingItemEl key={eachItem.ratingId} ratingData={eachItem} updaterating={this.updatingRating} ratingIsActive={eachItem.ratingId===ratingItem}/>))}
               </div>
               <button type="button" onClick={this.clearingFilters} className="button-clear-styling">Clear Filter</button>
            </div>
            <div className="products-header-container-larger-view-hide">
            <h1 className="products-main-heading">All Products</h1>
            <ProductsHeaderEl sortByOptins={sortByOptins} activeOptionId={activeOptionId} updateOption={this.updateActiveOptionId}/>
            </div>
            {renderingBasedOnApiStatus}
        </div>
        </>
     )
    }
}
export default AllProductEl
