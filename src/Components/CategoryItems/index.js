import './index.css'
const CategoryItemsEl=(props)=>{
    const{categoryData,updatecategory,isActive}=props
    const highlightingSelectedCategory=isActive?'extra-styling-category-item':''
    const{id,categoryName}=categoryData
    const clickedCategory=()=>{
        updatecategory(id)
    }
    return(
        <div>
            <p className={`category-item-styling ${highlightingSelectedCategory}`} onClick={clickedCategory}>{categoryName}</p>
        </div>
    )
}
export default CategoryItemsEl