import './index.css'
import HeaderEl from '../Header'
import PrimeEl from "../PrimeDeals"
import AllProductEl from '../AllProductsSection'
const ProductEl=()=>{
    return(
        <>
        <h1 className="Products-heading">Products</h1>
        <HeaderEl/>
        <PrimeEl/>
        <AllProductEl/>
        </>
    )
}
export default ProductEl