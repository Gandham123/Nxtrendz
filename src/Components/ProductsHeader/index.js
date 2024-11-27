import "./index.css"
import { BsFilterLeft } from "react-icons/bs";
const ProductsHeaderEl=(props)=>{
    const{sortByOptins,activeOptionId,updateOption}=props
    const optionStatusChange=(event)=>{
        updateOption(event.target.value)
    }
    return(
        <div className="Products-headers-main-container">
            <div className="product-header-sort-container">
              <BsFilterLeft className="product-header-icon-styling"/>
              <p className="product-header-para">Sort by</p>
              <select className="select-styling" value={activeOptionId} onChange={optionStatusChange}>
               {sortByOptins.map((eachOption) => (
                 <option key={eachOption.optionId} value={eachOption.optionId} className="option-styling">{eachOption.displayText}</option>
               ))}
              </select>
            </div>
        </div>
    )
}
export default ProductsHeaderEl