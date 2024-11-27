import './index.css'
import { Component } from 'react'
import { BsPlusSquare } from "react-icons/bs";
import { BsDashSquare } from "react-icons/bs";
import { FaCircleXmark } from "react-icons/fa6";
import CartContest from '../../Context';

class CartItems extends Component{
    render(){
        return(
            <CartContest.Consumer>
            {
                value=>{
                    const{cartProducatData}=this.props
                    const{imageUrl,title,brand,price,counter,id}=cartProducatData;
                    const{deleteProducts,decreaseProductsCount,increaseProductsCount}=value
                    const deleteItem=()=>{
                        deleteProducts(id)
                    }
                    const cartProductDecreaseCount=()=>{
                        decreaseProductsCount(id)
                    }
                    const cartProductIncreaseCount=()=>{
                        increaseProductsCount(id)
                    }
                    return(
                        <div>
                            <div className='cart-items-individual-bg-container'>
                                <div className='cart-item-first-container-larger-view'>
                                    <img src={imageUrl} className='cart-item-image-styling' alt='cart'/>
                                    <div className='cart-item-product-name-container'>
                                        <h1 className='cart-item-product-name'>{title}</h1>
                                        <p className='cart-item-brand-name'>{brand}</p>
                                        <div className='cart-item-smaller-view'>
                                        <div className='cart-item-count-container-smaler'>
                                            <BsDashSquare className='cart-item-minus-button' onClick={cartProductDecreaseCount}/>
                                            <h1 className='cart-item-count-value'>{counter}</h1>
                                            <BsPlusSquare className='cart-item-minus-button' onClick={cartProductIncreaseCount}/>
                                        </div>
                                        <div className='cart-item-smaller-last'>
                                            <p className='cart-item-product-cost'>Rs {price}/-</p>
                                            <p className='cart-item-smaller-remove-name'onClick={deleteItem}>Remove</p>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                <div className='cart-item-count-container-larger'>
                                        <BsDashSquare className='cart-item-minus-button' onClick={cartProductDecreaseCount}/>
                                        <h1 className='cart-item-count-value'>{counter}</h1>
                                        <BsPlusSquare className='cart-item-minus-button' onClick={cartProductIncreaseCount}/>
                                </div>
                                <div className='cart-item-price-container'>
                                            <p className='cart-item-product-cost'>Rs {price}/-</p>
                                </div>
                                <div className='cart-item-delete-container'>
                                    <FaCircleXmark className='cart-item-delete-icon' onClick={deleteItem}/>
                                </div>
                            </div>
                        </div>
                    )
                }
            }
        </CartContest.Consumer>
        )
    }
}
export default CartItems