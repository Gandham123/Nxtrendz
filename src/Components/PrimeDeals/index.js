import "./index.css";
import ProductCard from "../ProductsCards";
import { Component } from "react";
import Cookies from 'js-cookie'
import {ThreeDots} from 'react-loader-spinner'
const apisStatusView={
    success:'SUCCESS',
    failure:'FAILURE',
    inProgress:'INPROGRESS'
}

class PrimeEl extends Component{
    state={primeList:[],apiStatus:''}
    componentDidMount(){
        this.getPrimeData()
    }
    getPrimeData=async()=>{
        this.setState({apiStatus:apisStatusView.inProgress})
        const jwt= Cookies.get('AccessToken')
        const options={
            method:'GET',
            headers:{
                Authorization:`Bearer ${jwt}`
            }
        }
        const apiUrlPrime='https://apis.ccbp.in/prime-deals'
        const response=await fetch(apiUrlPrime,options)
        if(response.ok===true){
            const dataPrime= await response.json()
            const convertingToCamelCase= dataPrime.prime_deals.map((eachItem)=>({
                id:eachItem.id,
                title:eachItem.title,
                imageUrl:eachItem.image_url,
                price:eachItem.price,
                rating:eachItem.rating,
                brand:eachItem.brand
            }))
            this.setState({primeList:convertingToCamelCase,apiStatus:apisStatusView.success})
        }
        else if(response.status===401){
            this.setState({apiStatus:apisStatusView.failure})
        }
    }
    succefullView=()=>{
        const {primeList}=this.state
        return(
         <div className="prime-bg-container">
         <h1 className="prime-main-heading">Exclusive Prime Deals</h1>
         <div className="prime-deals-main-container">
           {primeList.map((eachProduct)=>(<ProductCard key={eachProduct.id} productData={eachProduct}/>))}
         </div>
         </div>
        )
    }
    failureView=()=>{
        return(
            <img
            src="https://assets.ccbp.in/frontend/react-js/exclusive-deals-banner-img.png"
            alt="Register Prime"
            className="register-prime-image"
          />
        )
    }
    loadingView=()=>{
        return(
            <div className="prime-bg-container">
            <h1 className="prime-main-heading">Exclusive Prime Deals</h1>
            <div className="Prime-loading-main-container">
            <ThreeDots color="#0b69ff" height="50" width="50" />
           </div>
           </div>
        )
    }
    render(){
        const {apiStatus}=this.state;
        switch (apiStatus) {
            case apisStatusView.success:
                return this.succefullView()
                break;
            case apisStatusView.inProgress:
                return this.loadingView();
                break;
            case apisStatusView.failure:
                return this.failureView()
                break;
            default:
                break;
        }
    }
}
export default PrimeEl