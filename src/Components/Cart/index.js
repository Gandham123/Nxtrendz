import './index.css';
import HeaderEl from "../Header";
import CartListView from '../CartList';
import EmptyCartView from '../EmptyCart' 
import CartContest from '../../Context';
const CartEl=()=>{
    return(
    <CartContest.Consumer>
      {
        (value)=>{
          const{cartListEl}=value;
          const cartIsEmptyOrNot=cartListEl.length
          return(
            <>
            <h1 className="cart-heading">Cart</h1>
            <HeaderEl/>
          <div className="bg-container-cart">
             {cartIsEmptyOrNot!==0?
             <div>
              <h1 className='my-cart-heading'>My Cart</h1>
              <CartListView/>
             </div>
             :
             <EmptyCartView/>}
          </div>
          </>
        )
        }
      }
    </CartContest.Consumer>
    )
}
export default CartEl