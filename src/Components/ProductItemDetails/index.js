import './index.css'
import ProductCard from '../ProductsCards';
import { Component } from 'react';
import HeaderEl from '../Header'
import Cookies from 'js-cookie'
import { BsPlusSquare } from "react-icons/bs";
import { BsDashSquare } from "react-icons/bs";
import { ThreeDots } from 'react-loader-spinner';
import CartContest from '../../Context';
const productDetailsApiStatusList={
    success:'SUCCESS',
    failure:'FAILURE',
    inProgress:'INPROGRESS',
    intial:'INTIAL'
}
class ProductItemDetailsEl extends Component{
    state={productDetailsList:[],counter:1,apiStatus:productDetailsApiStatusList.intial}
    componentDidMount(){
        this.getProductDetails()
    }
    getProductDetails=async()=>{
        this.setState({apiStatus:productDetailsApiStatusList.inProgress})
        const { id } = this.props.match.params
        const jwt=Cookies.get('AccessToken')
        const options={
            method:'GET',
            headers:{
                Authorization:`Bearer ${jwt}`
            }
        }
        const productDetailsUrl=`https://apis.ccbp.in/products/${id}`
        const productsResponse=await fetch(productDetailsUrl,options)
        if(productsResponse.ok===true){
            const productData=await productsResponse.json()
           const convertingToCamelCase={
            availability:productData.availability,
            brand:productData.brand,
            id:productData.id,
            description:productData.description,
            price:productData.price,
            rating:productData.rating,
            imageUrl:productData.image_url,
            style:productData.style,
            totalReviews:productData.total_reviews,
            title:productData.title,
            similarProducts:productData.similar_products
        }
        this.setState({productDetailsList:convertingToCamelCase,apiStatus:productDetailsApiStatusList.success})
 
        }
        else if(productsResponse.status===404){
            this.setState({apiStatus:productDetailsApiStatusList.failure})
        }
    }
    decreasingCount=()=>{
        const {counter}=this.state;
        if(counter>1){
            this.setState((prevState)=>({counter:prevState.counter-1}))
        }
    }
    increasingCount=()=>{
        this.setState((prevState)=>({counter:prevState.counter+1}))
    }
    continueShopping=()=>{
        this.props.history.replace('/products')
    }
    sucessViewRender=()=>{
       return(
        <CartContest.Consumer>
        {
            (value)=>{
                const{productDetailsList,counter}=this.state
                const{availability,brand,id,description,price,rating,imageUrl,style,totalReviews,title,similarProducts}=productDetailsList;
                const convertingSimilarProductsToCamlCase=similarProducts.map((eachItem)=>({
                    id:eachItem.id,
                    title:eachItem.title,
                    imageUrl:eachItem.image_url,
                    brand:eachItem.brand,
                    price:eachItem.price,
                    rating:eachItem.rating
                }))
                const{addProducts}=value
                const onAddPoductsCart=()=>{
                    addProducts({...productDetailsList,counter})
                }
                return(
                    <>
                    <HeaderEl/>
                    <div className='product-detail-main-container'>
                        <div className='product-image-conyainer'>
                            <img src={imageUrl} className='product-detail-image-styling' alt={`${id}`}/>
                        </div>
                        <div className='product-details-content-container'>
                            <h1 className='product-details-heading'>{title}</h1>
                            <p className='price-product-deatil'>Rs {price}/-</p>
                            <div className='product-details-reviews-container'>
                               <div className='product-details-rating-container'>
                                <p className='poduct-details-rating'>{rating}</p>
                                <img src='https://assets.ccbp.in/frontend/react-js/star-img.png' className='product-details-star-styling' alt='product-star'/>
                                </div> 
                                <p className='product-details-review-count'>{totalReviews} Reviews</p>
                            </div>
                            <p className='product-details-description'>{description}</p>
                            <p className='product-detail-availabel-style'>Availble: <span className='span-styling'>{availability}</span></p>
                            <p className='product-detail-availabel-style'>Brand: <span className='span-styling'>{brand}</span></p>
                            <hr className='horizental-line-styling'/>
                            <div className='counting-container'>
                                <BsDashSquare className='dash-square' onClick={this.decreasingCount}/>
                               <p className='counter-value'>{counter}</p>
                               <BsPlusSquare className='plussquare-styling' onClick={this.increasingCount}/>
                            </div>
                            <button className='add-to-cart-styling' onClick={onAddPoductsCart}>ADD To CART</button>
                        </div>
                    </div>
                    <div className='similar-products-main-container'>
                       <h1 className='similar-products-heading'>Similar Products</h1>
                       <div className='similar-products-cards-container'>
                        {convertingSimilarProductsToCamlCase.map((eachItem)=>(<ProductCard key={eachItem.id} productData={eachItem}/>))}
                       </div>
                    </div>
                   </>
                )
            }
        }
        </CartContest.Consumer>
       )
    }
    loadingViewRender=()=>{
        return(
         <>
          <HeaderEl/>
        <div className="product-details-loading">
           <ThreeDots color="#0b69ff" height="50" width="50" />
        </div>
         </>
        )
    }
    failureViewRender=()=>{
        return(
            <>
            <HeaderEl/>
            <div className='product-details-failure-image'>
                 <img src='https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png' className='product-not-found-image-styling' alt='productNotFound'/>
                 <h1 className='product-not-found-heading'>Product Not Found</h1>
                 <button className='button-styling-continue' onClick={this.continueShopping}>Continue Shopping</button>
            </div>
            </>
        )
    }
    render(){
      const{apiStatus}=this.state;
      switch (apiStatus) {
        case productDetailsApiStatusList.inProgress:
            return this.loadingViewRender()
            break;
        case productDetailsApiStatusList.success:
            return this.sucessViewRender()
            break;
        case productDetailsApiStatusList.failure:
            return this.failureViewRender()
        default:
            break;
      }
     }
}
export default ProductItemDetailsEl