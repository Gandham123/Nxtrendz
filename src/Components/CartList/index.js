import './index.css'
import { Component } from 'react'
import CartItems from '../CartItems'
import CartContest from '../../Context'
class CartListView extends Component{

    render(){
      return(
        <>
        <CartContest.Consumer>
         {
          (value)=>{
            const{cartListEl}=value
            let totalCostOfTheProducts=0;    
            for(let eachItem of cartListEl){
              totalCostOfTheProducts+=eachItem.counter*eachItem.price
            }
            return (
              <div>
                {cartListEl.map((eachItem)=>(<CartItems key={eachItem.id} cartProducatData={eachItem}/>))}
                <div className='cart-item-total-bill-container'>
                  <div>
                    <p className='cart-item-total-amount'>Order Total:<span className='cart-item-total-num'> Rs {totalCostOfTheProducts}</span></p>
                    <p className='cart-item-total-number-products'>{cartListEl.length} Items in cart</p>
                    <button className='cart-item-order-button'>Checkout</button>
                  </div>
                </div>
              </div>
            )
          }
         }
        </CartContest.Consumer>
        </>
      )
    }
}

export default CartListView;