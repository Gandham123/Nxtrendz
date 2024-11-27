import "./index.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";
import CartContest from "../../Context";
import Cookies from 'js-cookie'
const HeaderEl=(props)=>{
    const {history}=props
    const Logout=()=>{
        Cookies.remove("AccessToken");
        history.replace('/login')
        
    }
    const renderOfCartCount=()=>(
         <CartContest.Consumer>
            {
                value=>{
                    const{cartListEl}=value
                    const cartProductsTotalCount=cartListEl.length
                    return(
                        <div>
                            {cartProductsTotalCount!==0?<span className="cart-count-badge">{cartProductsTotalCount}</span>:null}
                        </div>
                    )
                }
            }
         </CartContest.Consumer>
    )
    return(
        <div className="bg-container-header">
            <div className="bg-container-header-navitems">
            <img src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png" className="logo-styling-header" alt="logo"/>
            <div className="text-header">
                <Link to="/" className="home-styling">Home</Link>
                <Link to="/products" className="home-styling">Products</Link>
                <div className="header-cart-container">
                <Link to="/cart" className="home-styling">Cart</Link>
                <div className="header-cart-count-spce">
                {renderOfCartCount()}
                </div>
                </div>
                <button className="button-styling" type="button" onClick={Logout}>Logout</button>
            </div>
            <div className="exit-logo-container">
            <img src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-log-out-img.png" className="logout-image-styling-header" alt="exit" onClick={Logout} />
            </div>
            </div>
            <div className="smaller-view-images">
                <Link to="/"><img src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-home-icon.png" className="home-logo-styling" alt="nav-home"/></Link>
                <Link to="/products"><img src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-products-icon.png" className="home-logo-styling" alt="nav-products"/></Link>
                <div className="header-cart-container">
                <Link to="/cart"><img src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-cart-icon.png" className="home-logo-styling" alt="nav-cart"/></Link>
                <div className="header-cart-count-spce">
                {renderOfCartCount()}
                </div>      
                </div>
                
            </div>
       </div>
    )
}
export default withRouter(HeaderEl);